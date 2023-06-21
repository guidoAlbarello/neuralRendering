uniform vec3 iResolution;
uniform float iTime;

const int MAX_MARCHING_STEPS = 255;
const float MIN_DIST = 0.0;
const float MAX_DIST = 10000.0;
const float EPSILON = 0.0001;

const int MAX_SPHERES_PER_OCTANT = 20;

const int MAX_AMOUNT_CHILDREN_PER_NODE = 8;
const int TREE_ROOT_INDEX = 0;
// Use textures to build bigger trees.
const int MAX_TREE_DEPTH = 1;
const int MAX_TREE_NODES_PROCESSING = MAX_AMOUNT_CHILDREN_PER_NODE * MAX_TREE_DEPTH;

const int AMOUNT_OF_NODES_IN_TREE = 9;
// TODO: Assume complete for now.
const int AMOUNT_OF_LEAVES_IN_TREE = 8;

struct Node {
    vec3 bbox;
    vec3 center;
    int depth;
};

struct LeafData {
    int start_sdf1;
    int start_sdf2;
    int start_sdf3;
    int start_sdf4;
    int end_sdf;
};

const vec3 SDF1_color = vec3(0.0, 1.0, 239.0/255.0);
const vec3 SDF2_color = vec3(199.0/255.0, 234.0/255.0, 70.0/255.0);
const vec3 SDF3_color = vec3(251.0/255.0, 251.0/255.0, 148.0/255.0);
const vec3 SDF4_color = vec3(159.0/255.0, 129.0/255.0, 112.0/255.0);

// Memory array Distribution
// level 0 :  [0 root]
// level 1 :  [0.{0-7} hijos]
// level2  :  [0.0.{0-7} hijos] [0.1.{0-7} hijos] [0.2.{0-7} hijos] [0.3.{0-7} hijos] [0.4.{0-7} hijos] [0.5.{0-7} hijos] [0.6.{0-7} hijos] [0.7.{{0-7} hijos] 
// level3  :
// [0.0.0.{0-7} hijos] [0.0.1.{0-7} hijos] [0.0.2.{0-7} hijos] [0.0.3.{0-7} hijos] [0.0.4.{0-7} hijos] [0.0.5.{0-7} hijos] [0.0.6.{0-7} hijos] [0.0.7.{0-7} hijos]
// [0.1.0.{0-7} hijos] [0.1.1.{0-7} hijos] [0.1.2.{0-7} hijos] [0.1.3.{0-7} hijos] [0.1.4.{0-7} hijos] [0.1.5.{0-7} hijos] [0.1.6.{0-7} hijos] [0.1.7.{0-7} hijos]
// [0.2.0.{0-7} hijos] [0.2.1.{0-7} hijos] [0.2.2.{0-7} hijos] [0.2.3.{0-7} hijos] [0.2.4.{0-7} hijos] [0.2.5.{0-7} hijos] [0.2.6.{0-7} hijos] [0.2.7.{0-7} hijos]
// [0.3.0.{0-7} hijos] [0.3.1.{0-7} hijos] [0.3.2.{0-7} hijos] [0.3.3.{0-7} hijos] [0.3.4.{0-7} hijos] [0.3.5.{0-7} hijos] [0.3.6.{0-7} hijos] [0.3.7.{0-7} hijos]
// [0.4.0.{0-7} hijos] [0.4.1.{0-7} hijos] [0.4.2.{0-7} hijos] [0.4.3.{0-7} hijos] [0.4.4.{0-7} hijos] [0.4.5.{0-7} hijos] [0.4.6.{0-7} hijos] [0.4.7.{0-7} hijos]
// [0.5.0.{0-7} hijos] [0.5.1.{0-7} hijos] [0.5.2.{0-7} hijos] [0.5.3.{0-7} hijos] [0.5.4.{0-7} hijos] [0.5.5.{0-7} hijos] [0.5.6.{0-7} hijos] [0.5.7.{0-7} hijos]
// [0.6.0.{0-7} hijos] [0.6.1.{0-7} hijos] [0.6.2.{0-7} hijos] [0.6.3.{0-7} hijos] [0.6.4.{0-7} hijos] [0.6.5.{0-7} hijos] [0.6.6.{0-7} hijos] [0.6.7.{0-7} hijos]
// [0.7.0.{0-7} hijos] [0.7.1.{0-7} hijos] [0.7.2.{0-7} hijos] [0.7.3.{0-7} hijos] [0.7.4.{0-7} hijos] [0.7.5.{0-7} hijos] [0.7.6.{0-7} hijos] [0.7.7.{0-7} hijos]

// We need to use the same array name as struct to be compliant with three.js framework. Otherwise we can't pass array of structures.
uniform Node node[AMOUNT_OF_NODES_IN_TREE];
uniform LeafData leafData[AMOUNT_OF_LEAVES_IN_TREE];
uniform vec4 spheres[28];

/**
 * Signed distance function for a sphere centered at the origin with radius 1.0;
 */

float sdBox(vec3 p, vec3 s) {
    vec3 d = abs(p) - s;
    return min(max(d.x,max(d.y,d.z)),0.0) + length(max(d,0.0));
}

float sphereSDF(vec3 p, vec3 pos, float r) {
    return length(p - pos) - r; 
}

float vmax(vec3 v){
     return max(max(v.x, v.y), v.z);
}
        
float sdf_boxcheap(vec3 c, vec3 p, vec3 s){
     return vmax(abs(p-c) - s);
}
float smoothUnion(float a, float b) {
    float k = 10.0;
    float h = max( k-abs(a-b), 0.0 )/k;
    return min( a, b ) - h*h*k*(1.0/4.0); 
}

float opUnion(float a, float b) {
    return min( a, b ); 
}

float sdBoxFrame( vec3 p, vec3 b, float e )
{
    p = abs(p)-b;
    vec3 q = abs(p+e)-e;
    return min(min(
      length(max(vec3(p.x,q.y,q.z),0.0))+min(max(p.x,max(q.y,q.z)),0.0),
      length(max(vec3(q.x,p.y,q.z),0.0))+min(max(q.x,max(p.y,q.z)),0.0)),
      length(max(vec3(q.x,q.y,p.z),0.0))+min(max(q.x,max(q.y,p.z)),0.0));
}

/**
 
* Signed distance function describing the scene.
 
* 
 
* Absolute value of the return value indicates the distance to the surface.
 
* Sign indicates whether the point is inside or outside the surface,
 
* negative indicating inside.
 
*/


float sdfListOfSpheres(vec3 samplePoint, int start, int end) {
    // If no spheres for this sdf then return empty space.
    if (start == end) { return MAX_DIST;}

    // Iterate over spheres sdf.
    float dist = sphereSDF(samplePoint, spheres[start].xyz, spheres[start].w);
    for (int i = 1; i< MAX_SPHERES_PER_OCTANT; i++) {
        int idx = i+start;
        if (idx >= end) {
            // Load spheres in multiple of 32. So that this breaks for the next 32 blocks.
            break;
        }
        dist = smoothUnion(sphereSDF(samplePoint, spheres[idx].xyz, spheres[idx].w), dist);
    }
    
    return dist;
}

float calculateSdfForBlock(vec3 samplePoint, LeafData leaf, inout vec3 color) {
    float dist1 = sdfListOfSpheres(samplePoint, leaf.start_sdf1, leaf.start_sdf2);
    float dist2 = sdfListOfSpheres(samplePoint, leaf.start_sdf2, leaf.start_sdf3);
    float dist3 = sdfListOfSpheres(samplePoint, leaf.start_sdf3, leaf.start_sdf4);
    float dist4 = sdfListOfSpheres(samplePoint, leaf.start_sdf4, leaf.end_sdf);

    float dist = smoothUnion(dist1, dist2);
    dist = smoothUnion(dist3, dist);
    dist = smoothUnion(dist4, dist);

    if (dist == dist1) {
        color = SDF1_color;
    } else if (dist == dist2) {
        color = SDF2_color;
    } else if (dist== dist3) {
        color = SDF3_color;
    } else {
        color = SDF4_color;
    }

    return dist;
}

vec2 intersectAABB(vec3 rayOrigin, vec3 rayDir, vec3 boxMin, vec3 boxMax) {
    vec3 tMin = (boxMin - rayOrigin) / rayDir;
    vec3 tMax = (boxMax - rayOrigin) / rayDir;
    vec3 t1 = min(tMin, tMax);
    vec3 t2 = max(tMin, tMax);
    float tNear = max(max(t1.x, t1.y), t1.z);
    float tFar = min(min(t2.x, t2.y), t2.z);
    return vec2(tNear, tFar);
}


// Se puede agregar una aceleracion. Si la distancia en el mismo bloque en la pasada anterior es menor a la actual
// entonces nos estamos alejando, sabemos que ese bloque no lo vamos a colisionary podemos pasar al proximo. 
// SI no hace falta recorrer el arbol en cada paso del raymarching, recordar en el actual y cual es el que sigue 
// en caso de error.
// HACE FALTA CHEQUEAR QUE AL SUMAR DISTANCIA NO SE VAYA DEL CUADRADO. COMO MUCHO LLEGA A LA FRONTERA.
// Guardamos el stack desde la menor colision de distancias.
float treeSdf(vec3 samplePoint, in float minDist, inout vec3 color, vec3 eye, vec3 dir) {
    int stack[MAX_TREE_NODES_PROCESSING+1];
    int stack_pointer = -1;
    stack[++stack_pointer] = TREE_ROOT_INDEX;
    int level = 0;
    while (stack_pointer >= 0) {
        int currentIndex = stack[stack_pointer--];
        Node currentNode = node[currentIndex];
        if (sdBox(samplePoint - currentNode.center, currentNode.bbox) < minDist) {           
            if (currentNode.depth == MAX_TREE_DEPTH) {
                // Offset all leaves to 0, node indexes to fetch sdfs.
                minDist = calculateSdfForBlock(samplePoint, leafData[currentIndex -  (AMOUNT_OF_NODES_IN_TREE - AMOUNT_OF_LEAVES_IN_TREE)], color);
            } else {
                // Maybe do some dynamic programming here.
                // Or use planes alignment to identify matches.
                vec2 intersectedChildren[MAX_AMOUNT_CHILDREN_PER_NODE];
                int amountIntersectedChildren = 0;
                for (int i = 0; i < MAX_AMOUNT_CHILDREN_PER_NODE; i++) {
                    // Guard clause against conditional branching optimizations. Without this the else branch is executed in parallel and tries to push to the stack. That for some reason slows down everything.
                    if (currentNode.depth != MAX_TREE_DEPTH) {
                        // Use min to ensure that the index never gets OOB. Specially important to avoid a compiler issue where for loops are unrolled for leaf nodes and tries to access OOB.
                        int childIndex = min(int(MAX_AMOUNT_CHILDREN_PER_NODE * currentIndex + 1 + i), AMOUNT_OF_NODES_IN_TREE-1);
                        Node child = node[childIndex];
                        vec2 tNearTFar = intersectAABB(eye, dir, child.center - child.bbox, child.center + child.bbox);
                    
                        // If ray intersects cube add it to traversable children.
                        // When tNear is greater than tFar there's no intersection.
                        if (tNearTFar.x <= tNearTFar.y) {
                            intersectedChildren[amountIntersectedChildren++] = vec2(tNearTFar.x, float(childIndex));
                        }
                    }
                }

                // Add null terminated vector.
                if (amountIntersectedChildren < MAX_AMOUNT_CHILDREN_PER_NODE) {
                    intersectedChildren[amountIntersectedChildren] = vec2(0.0, -1.0);
                }

                // Totally unproductive bubble sorte. It's french.
                // Order children in descending order based on tNear distance.
                for (int i = 0; i < MAX_AMOUNT_CHILDREN_PER_NODE; i++) {
                    if (intersectedChildren[i].y == -1.0) {
                        break;
                    }
                    vec2 aux;                   
                    for (int j = i; j < MAX_AMOUNT_CHILDREN_PER_NODE; j++) {
                        if (intersectedChildren[j].y == -1.0) {
                            break;
                        }
                        if (intersectedChildren[i].x < intersectedChildren[j].x) {
                            aux = intersectedChildren[i];
                            intersectedChildren[i] = intersectedChildren[j];
                            intersectedChildren[j] = aux;
                        }
                    }
                }
                
                // Push neighbors to stack.
                for (int i = 0; i < MAX_AMOUNT_CHILDREN_PER_NODE; i++) {
                    if (intersectedChildren[i].y == -1.0) {
                        break;
                    }
                    stack[++stack_pointer] = int(intersectedChildren[i].y);
                }
            }
        }
    }

    return minDist;
}

float sceneSDF(vec3 samplePoint, inout vec3 color, vec3 eye, vec3 dir) {
    float minDist = MAX_DIST;

    // Draw Octree Wireframe
    float treeWireframe = sdBoxFrame(samplePoint - node[0].center, node[0].bbox, 0.3);
    for (int i = 1; i < AMOUNT_OF_NODES_IN_TREE;i++) {
        Node currentNode = node[i];
        treeWireframe = opUnion(sdBoxFrame(samplePoint - node[i].center, node[i].bbox, 0.3), treeWireframe);
    }
    
    float model = treeSdf(samplePoint, minDist, color, eye, dir);
    float u = opUnion(treeWireframe, model);

    color = u == treeWireframe ? vec3(0.7, 0.7, 0.7) : color;

    return u;
}

/**
 * Return the shortest distance from the eyepoint to the scene surface along
 * the marching direction. If no part of the surface is found between start and end,
 * return end.
 * 
 * eye: the eye point, acting as the origin of the ray
 * marchingDirection: the normalized direction to march in
 * start: the starting distance away from the eye
 * end: the max distance away from the ey to march before giving up
 */
float shortestDistanceToSurface(vec3 eye, vec3 marchingDirection, float start, float end, inout vec3 color_diffuse) {
    float depth = start;
    for (int i = 0; i < MAX_MARCHING_STEPS; i++) {
        float dist = sceneSDF((eye + depth * marchingDirection), color_diffuse, eye, marchingDirection);
        if (dist < EPSILON) {
			return depth;
        }
        depth += dist;
        if (depth >= end) {
            return end;
        }
    }
    return end;
}
            

/**
 * Return the normalized direction to march in from the eye point for a single pixel.
 * 
 * fieldOfView: vertical field of view in degrees
 * size: resolution of the output image
 * fragCoord: the x,y coordinate of the pixel in the output image
 */
vec3 rayDirection(float fieldOfView, vec2 size, vec2 fragCoord) {
    vec2 xy = fragCoord - size / 2.0;
    float z = size.y / tan(radians(fieldOfView) / 2.0);
    return normalize(vec3(xy, -z));
}

/**
 * Using the gradient of the SDF, estimate the normal on the surface at point p.
 */
vec3 estimateNormal(vec3 p, vec3 eye, vec3 dir) {
    vec3 color = vec3(0.0, 0.0, 0.0);
    return normalize(vec3(
        sceneSDF(vec3(p.x + EPSILON, p.y, p.z), color, eye, dir) - sceneSDF(vec3(p.x - EPSILON, p.y, p.z), color, eye, dir),
        sceneSDF(vec3(p.x, p.y + EPSILON, p.z), color, eye, dir) - sceneSDF(vec3(p.x, p.y - EPSILON, p.z), color, eye, dir),
        sceneSDF(vec3(p.x, p.y, p.z  + EPSILON), color, eye, dir) - sceneSDF(vec3(p.x, p.y, p.z - EPSILON), color, eye, dir)
    ));
}

/**
 * Lighting contribution of a single point light source via Phong illumination.
 * 
 * The vec3 returned is the RGB color of the light's contribution.
 *
 * k_a: Ambient color
 * k_d: Diffuse color
 * k_s: Specular color
 * alpha: Shininess coefficient
 * p: position of point being lit
 * eye: the position of the camera
 * lightPos: the position of the light
 * lightIntensity: color/intensity of the light
 *
 * See https://en.wikipedia.org/wiki/Phong_reflection_model#Description
 */
vec3 phongContribForLight(vec3 k_d, vec3 k_s, float alpha, vec3 p, vec3 eye, vec3 dir, 
                          vec3 lightPos, vec3 lightIntensity) {
    vec3 L = normalize(lightPos - p);
    vec3 N = estimateNormal(p, eye, L);
    vec3 V = normalize(eye - p);
    vec3 R = normalize(reflect(-L, N));
    
    float dotLN = dot(L, N);
    float dotRV = dot(R, V);
    
    if (dotLN < 0.0) {
        // Light not visible from this point on the surface
        return vec3(0.0, 0.0, 0.0);
    } 
    
    if (dotRV < 0.0) {
        // Light reflection in opposite direction as viewer, apply only diffuse
        // component
        return lightIntensity * (k_d * dotLN);
    }
    return lightIntensity * (k_d * dotLN + k_s * pow(dotRV, alpha));
}

/**
 * Lighting via Phong illumination.
 * 
 * The vec3 returned is the RGB color of that point after lighting is applied.
 * k_a: Ambient color
 * k_d: Diffuse color
 * k_s: Specular color
 * alpha: Shininess coefficient
 * p: position of point being lit
 * eye: the position of the camera
 *
 * See https://en.wikipedia.org/wiki/Phong_reflection_model#Description
 */
vec3 phongIllumination(vec3 k_a, vec3 k_d, vec3 k_s, float alpha, vec3 p, vec3 eye, vec3 dir) {
    const vec3 ambientLight = 0.5 * vec3(1.0, 1.0, 1.0);
    vec3 color = ambientLight * k_a;
    
    vec3 light1Pos = eye;
    vec3 light1Intensity = vec3(1.0, 1.0, 1.0);
    
    color += phongContribForLight(k_d, k_s, alpha, p, eye, dir,
                                  light1Pos,
                                  light1Intensity);
    
    return color;
}

mat4 viewMatrixs(vec3 eye, vec3 center, vec3 up) {
    // Based on gluLookAt man page
    vec3 f = normalize(center - eye);
    vec3 s = normalize(cross(f, up));
    vec3 u = cross(s, f);
    return mat4(
        vec4(s, 0.0),
        vec4(u, 0.0),
        vec4(-f, 0.0),
        vec4(0.0, 0.0, 0.0, 1)
    );
}


void mainImage( out vec4 fragColor, in vec2 fragCoord )

{
    float angle = iTime*0.5;

    mat3 rotation = mat3(

            vec3(cos(angle), 0.0, -sin(angle)),

            vec3(0.0, 1.0, 0.0),

            vec3(sin(angle), 0.0, cos(angle))

        );

    vec3 dir = normalize(rotation*rayDirection(45.0, iResolution.xy, fragCoord));

    vec3 eye = rotation*vec3(0.0,0.0,1000.0);

    vec3 K_d = vec3(0.7, 0.7, 0.7);
    float dist = shortestDistanceToSurface(eye, dir, MIN_DIST, MAX_DIST, K_d);

    if (dist > MAX_DIST - EPSILON) {

        // Didn't hit anything

        fragColor = vec4(0.0, 0.0, 0.0, 0.0);

		return;

    }

    // The closest point on the surface to the eyepoint along the view ray

    vec3 p = eye + dir * dist;

    vec3 K_a = vec3(0.5, 0.5, 0.5);

    vec3 K_s = vec3(0.0, 0.0, 0.0);

    float shininess = 0.1;


    vec3 color = phongIllumination(K_a, K_d, K_s, shininess, p, eye, dir);
    fragColor = vec4(color  , 1.0);
}



void main() {
   mainImage(gl_FragColor, gl_FragCoord.xy);
}
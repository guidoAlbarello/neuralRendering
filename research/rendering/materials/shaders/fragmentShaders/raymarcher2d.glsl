uniform vec3 iResolution;
uniform float iTime;
uniform float eyeOrientation;
uniform float pos;

const int MAX_MARCHING_STEPS = 255;
const float MIN_DIST = 0.0;
const float MAX_DIST = 100.0;
const float EPSILON = 0.0001;

/**
 * Signed distance function for a sphere centered at the origin with radius 1.0;
 */
float sphereSDF(vec2 samplePoint) {
    return length(samplePoint) - 20.0;
}

/**
 * Signed distance function describing the scene.
 * 
 * Absolute value of the return value indicates the distance to the surface.
 * Sign indicates whether the point is inside or outside the surface,
 * negative indicating inside.
 */
float sceneSDF(vec2 samplePoint) {
    return sphereSDF(samplePoint - vec2(iResolution.x/2.0+150.0, iResolution.y/2.0));
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
float shortestDistanceToSurface(vec2 eye, vec2 marchingDirection, float start, float end) {
    float depth = start;
    for (int i = 0; i < MAX_MARCHING_STEPS; i++) {
        float dist = sceneSDF(eye + depth * marchingDirection);
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

vec2 rayDirection(vec2 fragCoord, vec2 eye) {
   // vec2 xy = fragCoord - size / 2.0;
  //  float z = size.y / tan(radians(fieldOfView) / 2.0);
   // return normalize(xy);
   return normalize(fragCoord - eye);
}

/**
 * Using the gradient of the SDF, estimate the normal on the surface at point p.
 *//*
vec3 estimateNormal(vec3 p) {
    return normalize(vec3(
        sceneSDF(vec3(p.x + EPSILON, p.y, p.z)) - sceneSDF(vec3(p.x - EPSILON, p.y, p.z)),
        sceneSDF(vec3(p.x, p.y + EPSILON, p.z)) - sceneSDF(vec3(p.x, p.y - EPSILON, p.z)),
        sceneSDF(vec3(p.x, p.y, p.z  + EPSILON)) - sceneSDF(vec3(p.x, p.y, p.z - EPSILON))
    ));
}*/

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec2 eye = vec2(iResolution.x/2.0, iResolution.y/2.0);
    // Paint the eye with color red. 
    if (length(fragCoord - eye) < 4.0) {
        fragColor = vec4(1.0, 0.0, 0.0, 1.0);
        return;
    }
    mat2 orientation;
    orientation[0] = vec2(cos(iTime), -sin(iTime));
    orientation[1] = vec2(sin(iTime), cos(iTime));
    vec2 viewDir = vec2(1.0, 0.0);
    float fov = 45.0;
	vec2 rayDir  = rayDirection(fragCoord, eye);
    float raySimilarity = dot(rayDir, viewDir);
    float nearPlane = 10.0;
    if (raySimilarity < cos(radians(fov)/2.0)) {
        fragColor = vec4(0.01, 0.95, 0.95, 0.0);
        return;
    }

    //float dist = shortestDistanceToSurface(eye, rayDir, MIN_DIST, MAX_DIST);
    float dist = sceneSDF(fragCoord);
    if (abs(dist) < 1.0) {
        fragColor = vec4(0.0,0.0,0.0, 1.0);
        return;
    }

    if (dist > MAX_DIST - EPSILON) {
        // Didn't hit anything
        fragColor = vec4(viewDir, 0.7, 0.0);
		return;
    }
    //n
    fragColor = vec4(1.0, 0.0, 0.0, 1.0);
}


void sampleRaymarcher(out vec4 fragColor, in vec2 fragCoord) {
    float dist = sceneSDF(fragCoord);
    fragColor = vec4(- dist/10.0, dist*exp(-5.5), 0.0, 1.0);
}

void main() {
   mainImage(gl_FragColor, gl_FragCoord.xy);
    //sampleRaymarcher(gl_FragColor, gl_FragCoord.xy);
}
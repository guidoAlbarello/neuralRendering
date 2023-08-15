	import React, { useState, useRef, useEffect } from "react";
import * as THREE from "three";
import axios from "axios";
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Stats, OrthographicCamera } from "@react-three/drei";
import { useControls } from 'leva'
import { useMemo } from 'react'

let mouse = { x: 0.0, y: 0.0 };
let lastMouse = { x: 0.0, y: 0.0 };
let mouseDown = false;
let position = {x: 0.0, y: 0.0, z: 400.0}
const PI = 3.1416;
const CAMERA_SENSITIVITY = 1.0;

function cross(u,v) {
	return [
        u[1]*v[2] - u[2]*v[1],
        u[2]*v[0] - u[0]*v[2],
        u[0]*v[1] - u[1]*v[0]
    ];
}


function normalize(v) {
	if (v.length == 3) {
		let len = Math.sqrt( v[0] * v[0] + v[1] * v[1] + v[2] * v[2] );
		return [v[0]/len, v[1]/len, v[2]/len];
	} else {
		let len = Math.sqrt( v[0] * v[0] + v[1] * v[1] + v[2] * v[2] + v[3] * v[3] );
		return [v[0]/len, v[1]/len, v[2]/len, v[3]/len];
	}
}


function Quaternion(vector){
	var normalized = normalize(vector);

	this.x = normalized[0];
	this.y = normalized[1];
	this.z = normalized[2];
	this.w = normalized[3];

	this.quaternion = true;
  }

  Quaternion.prototype.inverse = function(){
	return new Quaternion([-this.x, -this.y, -this.z, this.w]);
  }

  Quaternion.prototype.mult = function(other){
	var x,y,z,w;

	if (other.quaternion){
	  w = (this.w * other.w) - (this.x * other.x) - (this.y * other.y) - (this.z * other.z);
	  x = (this.x * other.w) + (this.w * other.x) + (this.y * other.z) - (this.z * other.y);
	  y = (this.y * other.w) + (this.w * other.y) + (this.z * other.x) - (this.x * other.z);
	  z = (this.z * other.w) + (this.w * other.z) + (this.x * other.y) - (this.y * other.x);
	} else {
	  if ( other.length !== 3 ) {
		throw "mult(): quaternion can be multiplied only with other quaternion or vec3";
	  }

	  w = - (this.x * other[0]) - (this.y * other[1]) - (this.z * other[2]);
	  x =   (this.w * other[0]) + (this.y * other[2]) - (this.z * other[1]);
	  y =   (this.w * other[1]) + (this.z * other[0]) - (this.x * other[2]);
	  z =   (this.w * other[2]) + (this.x * other[1]) - (this.y * other[0]);
	}

	return new Quaternion([x, y, z, w]);
  }


function rotateVec(vec, axis, angle) {
    var sinHalfAngle = Math.sin(angle/2);
    var cosHalfAngle = Math.cos(angle/2);

    var Qx = axis[0] * sinHalfAngle;
    var Qy = axis[1]* sinHalfAngle;
    var Qz = axis[2] * sinHalfAngle;
    var Qw = cosHalfAngle;

    var rotation = new Quaternion([Qx, Qy, Qz, Qw]);
    var inverse = rotation.inverse();

    var result = rotation.mult(vec).mult(inverse);
    return [result.x, result.y, result.z];
}

function Terrain(props) {
	const state = useThree();
	const mesh = useRef();
	let pressedKeys = {};

	useFrame(({ clock }) => {
		// --> Workaround camera changing values when updating controls.
		state.camera.far = 1;
		state.camera.near = -1;
		state.camera.left = -1;
		state.camera.right = 1;
		state.camera.top = 1;
		state.camera.bottom = -1;
		state.camera.updateProjectionMatrix();
		// --> End workaround

        mesh.current.material.uniforms.iTime.value = clock.oldTime * 0.00005;
        mesh.current.material.uniforms.iResolution.value.set(state.size.width, state.size.height, 1);

        ${SDF_ENABLEMENT_UPDATE_STATEMENT}

        mesh.current.material.uniforms.iMouse.value.set(state.mouse.x, -state.mouse.y, 0.0, 0.0);

		if (mouseDown) {
			let deltaX = state.mouse.x - lastMouse.x;
			let deltaY = state.mouse.y - lastMouse.y;
			mouse.x += PI * deltaX * CAMERA_SENSITIVITY; mouse.y += PI * deltaY * CAMERA_SENSITIVITY;
			lastMouse.x = state.mouse.x; lastMouse.y = state.mouse.y;
			console.log(deltaX); console.log(deltaY);
		}

        let movement = { forward: 0.0, right: 0.0 };
		// Movement
		// Forward
		if (pressedKeys.w) {
			movement.forward -= 10.0;
		}
		// Back
		if (pressedKeys.s) {
			movement.forward += 10.0;
		}
		// Left
		if (pressedKeys.a) {
			movement.right -= 5.0;
		}
		// Right
		if (pressedKeys.d) {
			movement.right += 5.0;
		}

		var axisV = [0.0, 1.0, 0.0];

        var newTarget = [0.0, 0.0, -1.0];
        newTarget = normalize(rotateVec(newTarget, axisV, mouse.x));

        var axisH = normalize(cross(newTarget, axisV));
        newTarget = rotateVec(newTarget, axisH, mouse.y);

        let n=  normalize(newTarget);
        let v = normalize(cross(axisH, n));
        let u = normalize(cross(n, v));

        position.z += movement.forward;
        position.x += movement.right;
        mesh.current.material.uniforms.uCamera.value.set(position.x, position.y, position.z);
        mesh.current.material.uniforms.uViewMatrix.value.set(u[0], u[1], u[2],
                                                             v[0], v[1], v[2],
                                                             n[0], n[1], n[2]);
    });

    useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.code == 'KeyW') {
				pressedKeys['w'] = true
			} else if (e.code == 'KeyS') {
				pressedKeys['s'] = true
			} else if (e.code == 'KeyA') {
				pressedKeys['a'] = true
			} else if (e.code == 'KeyD') {
				pressedKeys['d'] = true
			}
		}
		const handleKeyUp = (e) => {
			if (e.code == 'KeyW') {
				pressedKeys['w'] = false
			} else if (e.code == 'KeyS') {
				pressedKeys['s'] = false
			} else if (e.code == 'KeyA') {
				pressedKeys['a'] = false
			} else if (e.code == 'KeyD') {
				pressedKeys['d'] = false
			}
		}
		document.addEventListener('keydown', handleKeyDown)
		document.addEventListener('keyup', handleKeyUp)
	});

    return (
		<mesh
			onPointerDown={(e) => { mouseDown=true; lastMouse.x = state.mouse.x; lastMouse.y = state.mouse.y;}}
			onPointerUp={(e) => { mouseDown=false;}}
			{...props}
			ref={mesh}
			material={new THREE.ShaderMaterial({
				fragmentShader: props.material.fragmentShader,
				uniforms: props.material.uniforms
			})}>
			<planeBufferGeometry args={[2, 2]} />
		</mesh>
	)
}


// Shader
const Model = () => {
	const f = `
  uniform vec3 iResolution;
  uniform float iTime;
  uniform vec4 iMouse;
  uniform mat3 uViewMatrix;
  uniform vec3 uCamera;
  uniform bool uEnableWireframe;

    const int MAX_MARCHING_STEPS = 255;
      const float MIN_DIST = 0.0;
      const float MAX_DIST = 10000.0;
      const float EPSILON = 0.0001;

  const int MAX_SPHERES_PER_OCTANT = ${MAX_SPHERES_PER_OCTANT};

 const int MAX_AMOUNT_CHILDREN_PER_NODE = 8;
  const int TREE_ROOT_INDEX = 0;
  // Use textures to build bigger trees.
  const int MAX_TREE_DEPTH = ${MAX_TREE_DEPTH};
  const int MAX_TREE_NODES_PROCESSING = MAX_AMOUNT_CHILDREN_PER_NODE * MAX_TREE_DEPTH;

  const int AMOUNT_OF_NODES_IN_TREE = ${AMOUNT_OF_NODES_IN_TREE};
  // TODO: Assume complete for now.
  const int AMOUNT_OF_LEAVES_IN_TREE = ${AMOUNT_OF_LEAVES_IN_TREE};

  const int TOTAL_SPHERES = ${TOTAL_SPHERES};

  struct Node {
      vec3 bbox;
      vec3 center;
      int depth;
  };

${LEAF_DATA_STRUCT}

${SDFS_COLORS}

// We need to use the same array name as struct to be compliant with three.js framework. Otherwise we can't pass array of structures.
uniform Node node[AMOUNT_OF_NODES_IN_TREE];
uniform LeafData leafData[AMOUNT_OF_LEAVES_IN_TREE];
uniform vec4 spheres[TOTAL_SPHERES];

// Uniforms to enable and disable sdfs on the fly.
${SDF_ENABLEMENT}

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
    float k = ${SMOOTH_UNION_K};
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

// Function to create a quaternion from an axis and an angle (in radians)
vec4 quatFromAxisAngle(vec3 axis, float angle) {
    float halfAngle = angle * 0.5;
    float s = sin(halfAngle);
    return vec4(axis * s, cos(halfAngle));
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
      float dist = MAX_DIST;
      for (int i = 0; i< MAX_SPHERES_PER_OCTANT; i++) {
          if (i+start >= end) {
              // Load spheres in multiple of 32. So that this breaks for the next 32 blocks.
              break;
          }
          vec4 sphere = texture2D(spheres, vec2(float(i+start)/float(TOTAL_SPHERES), 0.5));
          dist = smoothUnion(sphereSDF(samplePoint, sphere.xyz, sphere.w), dist);
      }

      return dist;
  }
float calculateSdfForBlock(vec3 samplePoint, LeafData leaf, inout vec3 color) {
${CALCULATE_SDF_FOR_BLOCK_FUNCTION}
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

        float model = treeSdf(samplePoint, minDist, color, eye, dir);
        if (uEnableWireframe) {
            // Draw Octree Wireframe
            float treeWireframe = sdBoxFrame(samplePoint - node[0].center, node[0].bbox, 0.3);
            for (int i = 1; i < AMOUNT_OF_NODES_IN_TREE;i++) {
                Node currentNode = node[i];
                treeWireframe = opUnion(sdBoxFrame(samplePoint - node[i].center, node[i].bbox, 0.3), treeWireframe);
            }

            model = opUnion(treeWireframe, model);
        }


        color = model == treeWireframe ? vec3(0.7, 0.7, 0.7) : color;

        return model;
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
        vec3 dir = normalize(uViewMatrix * rayDirection(45.0, iResolution.xy, fragCoord));

        vec3 camera = uViewMatrix *uCamera;


          vec3 K_d = vec3(0.7, 0.7, 0.7);
          float dist = shortestDistanceToSurface(camera, dir, MIN_DIST, MAX_DIST, K_d);

          if (dist > MAX_DIST - EPSILON) {

              // Didn't hit anything

              fragColor = vec4(0.0, 0.0, 0.0, 0.0);

          return;

          }

            // The closest point on the surface to the eyepoint along the view ray

            vec3 p = camera + dir * dist;

            vec3 K_a = vec3(0.5, 0.5, 0.5);

            vec3 K_s = vec3(0.0, 0.0, 0.0);

            float shininess = 0.1;


            vec3 color = phongIllumination(K_a, K_d, K_s, shininess, p, camera, dir);
            fragColor = vec4(color, 1.0);
        }

    void main() {
         mainImage(gl_FragColor, gl_FragCoord.xy);
      }
    `;
    const options = useMemo(() => {
    		return {
    			${SDF_ENABLEMENT_UI_STATEMENT}
    			uEnableWireframe: false,
    		}
    	}, [])

    	const terrainControls = useControls('Terrain', options)

    	if (loading) {
    		return <div>Loading...</div>;
    	}

    	return (
    		<Canvas style={{ height: "768px", width: "1360px" }}>
    			<Terrain controls={terrainControls} position={[0, 0, 0]} material={materialProps} />
    			<OrthographicCamera
    				position={[0, 0, 0]}
    				makeDefault={true}
    				zoom={1}
    				top={1}
    				bottom={-1}
    				left={-1}
    				right={1}
    				near={-1}
    				far={1}
    			/>
    			<Stats />

    		</Canvas>
    	);
    };

    export default Model;
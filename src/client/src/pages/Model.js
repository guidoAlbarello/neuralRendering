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
		mesh.current.material.uniforms.enableSDF1.value = props.controls.enableSDF1;
		mesh.current.material.uniforms.enableSDF2.value = props.controls.enableSDF2;
		mesh.current.material.uniforms.enableSDF3.value = props.controls.enableSDF3;
		mesh.current.material.uniforms.enableSDF4.value = props.controls.enableSDF4;

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

const Model = () => {
	const f = `
  uniform vec3 iResolution;
  uniform float iTime;
  uniform vec4 iMouse;
  uniform mat3 uViewMatrix;
  uniform vec3 uCamera;

  const int MAX_MARCHING_STEPS = 255;
  const float MIN_DIST = 0.0;
  const float MAX_DIST = 10000.0;
  const float EPSILON = 0.0001;
  
  const int MAX_SPHERES_PER_OCTANT = 100;
  
  const int MAX_AMOUNT_CHILDREN_PER_NODE = 8;
  const int TREE_ROOT_INDEX = 0;
  // Use textures to build bigger trees.
  const int MAX_TREE_DEPTH = 0;
  const int MAX_TREE_NODES_PROCESSING = MAX_AMOUNT_CHILDREN_PER_NODE * MAX_TREE_DEPTH;

  const int AMOUNT_OF_NODES_IN_TREE = 1;
  // TODO: Assume complete for now. 
  const int AMOUNT_OF_LEAVES_IN_TREE = 1;

  const int TOTAL_SPHERES = 400;
  
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
  uniform sampler2D spheres;
  
  // Uniforms to enable and disable sdfs on the fly.
  uniform bool enableSDF1;
  uniform bool enableSDF2;
  uniform bool enableSDF3;
  uniform bool enableSDF4;
  
  // Controls
  uniform float movement;

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
      float dist1 = sdfListOfSpheres(samplePoint, leaf.start_sdf1, leaf.start_sdf2);
      float dist2 = sdfListOfSpheres(samplePoint, leaf.start_sdf2, leaf.start_sdf3);
      float dist3 = sdfListOfSpheres(samplePoint, leaf.start_sdf3, leaf.start_sdf4);
      float dist4 = sdfListOfSpheres(samplePoint, leaf.start_sdf4, leaf.end_sdf);
  
      float dist = MAX_DIST;
      float minDist = MAX_DIST;
  
      if (enableSDF1) {
          minDist = min(minDist, dist1);
          dist = smoothUnion(dist1, dist);
      }
      if (enableSDF2) {
          minDist = min(minDist, dist2);
          dist = smoothUnion(dist2, dist);
      }
      if (enableSDF3) {
          minDist = min(minDist, dist3);
          dist = smoothUnion(dist3, dist);
      }
      if (enableSDF4) {
          minDist = min(minDist, dist4);
          dist = smoothUnion(dist4, dist);
      }
  
      if (minDist == dist1) {
          color = SDF1_color;
      } else if (minDist == dist2) {
          color = SDF2_color;
      } else if (minDist == dist3) {
          color = SDF3_color;
      } else if (minDist == dist4) {
          color = SDF4_color;
      } else {
          color = vec3(1.0,0.0,0.0);
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
  
      
      float model = treeSdf(samplePoint, minDist, color, eye, dir);
    
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
	const [loading, setLoading] = useState(true);
	const [materialProps, setMaterialProps] = useState(undefined)
	useEffect(() => {
		let nodes = [{
			bbox: new THREE.Vector3(32.0, 32.0, 32.0),
			center: new THREE.Vector3(32.0, 32.0, 32.0),
			depth: 0
		}];
		let leaf_data = [{
			start_sdf1: 0,
			start_sdf2: 100,
			start_sdf3: 200,
			start_sdf4: 300,
			end_sdf: 400
		}]

		const data = new Float32Array(4 * 400);
		data[0] = 37.0; data[1] = 0.0; data[2] = 42.0; data[3] = 20.0;
		data[4] = 37.0; data[5] = 63.0; data[6] = 44.0; data[7] = 20.0;
		data[8] = 17.0; data[9] = 62.0; data[10] = 42.0; data[11] = 18.0;
		data[12] = 18.0; data[13] = 5.0; data[14] = 46.0; data[15] = 18.0;
		data[16] = 42.0; data[17] = 32.0; data[18] = 48.0; data[19] = 16.0;
		data[20] = 25.0; data[21] = 47.0; data[22] = 48.0; data[23] = 16.0;
		data[24] = 27.0; data[25] = 26.0; data[26] = 48.0; data[27] = 16.0;
		data[28] = 48.0; data[29] = 16.0; data[30] = 48.0; data[31] = 16.0;
		data[32] = 49.0; data[33] = 47.0; data[34] = 48.0; data[35] = 15.0;
		data[36] = 14.0; data[37] = 0.0; data[38] = 29.0; data[39] = 14.0;
		data[40] = 13.0; data[41] = 34.0; data[42] = 49.0; data[43] = 14.0;
		data[44] = 50.0; data[45] = 60.0; data[46] = 28.0; data[47] = 13.0;
		data[48] = 51.0; data[49] = 5.0; data[50] = 28.0; data[51] = 13.0;
		data[52] = 11.0; data[53] = 45.0; data[54] = 40.0; data[55] = 12.0;
		data[56] = 11.0; data[57] = 23.0; data[58] = 40.0; data[59] = 12.0;
		data[60] = 10.0; data[61] = 51.0; data[62] = 29.0; data[63] = 11.0;
		data[64] = 53.0; data[65] = 37.0; data[66] = 37.0; data[67] = 11.0;
		data[68] = 25.0; data[69] = 59.0; data[70] = 26.0; data[71] = 11.0;
		data[72] = 10.0; data[73] = 20.0; data[74] = 52.0; data[75] = 11.0;
		data[76] = 10.0; data[77] = 15.0; data[78] = 31.0; data[79] = 11.0;
		data[80] = 10.0; data[81] = 34.0; data[82] = 35.0; data[83] = 11.0;
		data[84] = 54.0; data[85] = 1.0; data[86] = 53.0; data[87] = 10.0;
		data[88] = 54.0; data[89] = 23.0; data[90] = 32.0; data[91] = 10.0;
		data[92] = 9.0; data[93] = 49.0; data[94] = 52.0; data[95] = 10.0;
		data[96] = 53.0; data[97] = 47.0; data[98] = 31.0; data[99] = 10.0;
		data[100] = 27.0; data[101] = 7.0; data[102] = 26.0; data[103] = 10.0;
		data[104] = 11.0; data[105] = 63.0; data[106] = 25.0; data[107] = 10.0;
		data[108] = 8.0; data[109] = 40.0; data[110] = 26.0; data[111] = 9.0;
		data[112] = 54.0; data[113] = 62.0; data[114] = 55.0; data[115] = 9.0;
		data[116] = 55.0; data[117] = 32.0; data[118] = 27.0; data[119] = 9.0;
		data[120] = 55.0; data[121] = 17.0; data[122] = 24.0; data[123] = 9.0;
		data[124] = 8.0; data[125] = 25.0; data[126] = 26.0; data[127] = 9.0;
		data[128] = 37.0; data[129] = 58.0; data[130] = 24.0; data[131] = 9.0;
		data[132] = 34.0; data[133] = 14.0; data[134] = 56.0; data[135] = 8.0;
		data[136] = 37.0; data[137] = 7.0; data[138] = 23.0; data[139] = 8.0;
		data[140] = 56.0; data[141] = 40.0; data[142] = 23.0; data[143] = 8.0;
		data[144] = 56.0; data[145] = 30.0; data[146] = 56.0; data[147] = 8.0;
		data[148] = 21.0; data[149] = 14.0; data[150] = 30.0; data[151] = 7.0;
		data[152] = 6.0; data[153] = 10.0; data[154] = 22.0; data[155] = 7.0;
		data[156] = 16.0; data[157] = 13.0; data[158] = 22.0; data[159] = 7.0;
		data[160] = 57.0; data[161] = 28.0; data[162] = 42.0; data[163] = 7.0;
		data[164] = 33.0; data[165] = 0.0; data[166] = 22.0; data[167] = 7.0;
		data[168] = 56.0; data[169] = 58.0; data[170] = 40.0; data[171] = 7.0;
		data[172] = 44.0; data[173] = 16.0; data[174] = 32.0; data[175] = 7.0;
		data[176] = 43.0; data[177] = 49.0; data[178] = 31.0; data[179] = 7.0;
		data[180] = 57.0; data[181] = 3.0; data[182] = 43.0; data[183] = 7.0;
		data[184] = 6.0; data[185] = 62.0; data[186] = 57.0; data[187] = 7.0;
		data[188] = 27.0; data[189] = 50.0; data[190] = 32.0; data[191] = 7.0;
		data[192] = 57.0; data[193] = 38.0; data[194] = 57.0; data[195] = 7.0;
		data[196] = 57.0; data[197] = 50.0; data[198] = 22.0; data[199] = 7.0;
		data[200] = 29.0; data[201] = 17.0; data[202] = 34.0; data[203] = 6.0;
		data[204] = 58.0; data[205] = 26.0; data[206] = 21.0; data[207] = 6.0;
		data[208] = 57.0; data[209] = 63.0; data[210] = 45.0; data[211] = 6.0;
		data[212] = 36.0; data[213] = 50.0; data[214] = 28.0; data[215] = 6.0;
		data[216] = 20.0; data[217] = 47.0; data[218] = 32.0; data[219] = 6.0;
		data[220] = 18.0; data[221] = 51.0; data[222] = 21.0; data[223] = 6.0;
		data[224] = 41.0; data[225] = 0.0; data[226] = 21.0; data[227] = 6.0;
		data[228] = 58.0; data[229] = 35.0; data[230] = 47.0; data[231] = 6.0;
		data[232] = 38.0; data[233] = 44.0; data[234] = 58.0; data[235] = 6.0;
		data[236] = 5.0; data[237] = 33.0; data[238] = 21.0; data[239] = 6.0;
		data[240] = 51.0; data[241] = 46.0; data[242] = 21.0; data[243] = 6.0;
		data[244] = 34.0; data[245] = 14.0; data[246] = 28.0; data[247] = 6.0;
		data[248] = 58.0; data[249] = 14.0; data[250] = 35.0; data[251] = 6.0;
		data[252] = 5.0; data[253] = 42.0; data[254] = 58.0; data[255] = 6.0;
		data[256] = 58.0; data[257] = 54.0; data[258] = 58.0; data[259] = 6.0;
		data[260] = 5.0; data[261] = 10.0; data[262] = 58.0; data[263] = 6.0;
		data[264] = 5.0; data[265] = 18.0; data[266] = 21.0; data[267] = 6.0;
		data[268] = 59.0; data[269] = 11.0; data[270] = 59.0; data[271] = 5.0;
		data[272] = 42.0; data[273] = 15.0; data[274] = 25.0; data[275] = 5.0;
		data[276] = 51.0; data[277] = 25.0; data[278] = 22.0; data[279] = 5.0;
		data[280] = 42.0; data[281] = 49.0; data[282] = 24.0; data[283] = 5.0;
		data[284] = 59.0; data[285] = 8.0; data[286] = 38.0; data[287] = 5.0;
		data[288] = 42.0; data[289] = 43.0; data[290] = 35.0; data[291] = 5.0;
		data[292] = 46.0; data[293] = 15.0; data[294] = 20.0; data[295] = 5.0;
		data[296] = 46.0; data[297] = 19.0; data[298] = 26.0; data[299] = 5.0;
		data[300] = 59.0; data[301] = 23.0; data[302] = 59.0; data[303] = 5.0;
		data[304] = 59.0; data[305] = 45.0; data[306] = 59.0; data[307] = 5.0;
		data[308] = 45.0; data[309] = 51.0; data[310] = 20.0; data[311] = 5.0;
		data[312] = 59.0; data[313] = 0.0; data[314] = 37.0; data[315] = 5.0;
		data[316] = 59.0; data[317] = 52.0; data[318] = 38.0; data[319] = 5.0;
		data[320] = 44.0; data[321] = 23.0; data[322] = 34.0; data[323] = 5.0;
		data[324] = 31.0; data[325] = 37.0; data[326] = 37.0; data[327] = 5.0;
		data[328] = 31.0; data[329] = 37.0; data[330] = 59.0; data[331] = 5.0;
		data[332] = 38.0; data[333] = 19.0; data[334] = 35.0; data[335] = 5.0;
		data[336] = 23.0; data[337] = 59.0; data[338] = 59.0; data[339] = 5.0;
		data[340] = 22.0; data[341] = 20.0; data[342] = 34.0; data[343] = 5.0;
		data[344] = 22.0; data[345] = 48.0; data[346] = 26.0; data[347] = 5.0;
		data[348] = 4.0; data[349] = 4.0; data[350] = 58.0; data[351] = 5.0;
		data[352] = 35.0; data[353] = 46.0; data[354] = 33.0; data[355] = 5.0;
		data[356] = 4.0; data[357] = 46.0; data[358] = 20.0; data[359] = 5.0;
		data[360] = 36.0; data[361] = 42.0; data[362] = 37.0; data[363] = 5.0;
		data[364] = 4.0; data[365] = 55.0; data[366] = 59.0; data[367] = 5.0;
		data[368] = 4.0; data[369] = 56.0; data[370] = 21.0; data[371] = 5.0;
		data[372] = 4.0; data[373] = 27.0; data[374] = 59.0; data[375] = 5.0;
		data[376] = 13.0; data[377] = 55.0; data[378] = 59.0; data[379] = 5.0;
		data[380] = 11.0; data[381] = 19.0; data[382] = 20.0; data[383] = 5.0;
		data[384] = 13.0; data[385] = 45.0; data[386] = 20.0; data[387] = 5.0;
		data[388] = 17.0; data[389] = 41.0; data[390] = 29.0; data[391] = 5.0;
		data[392] = 13.0; data[393] = 33.0; data[394] = 23.0; data[395] = 5.0;
		data[396] = 21.0; data[397] = 36.0; data[398] = 37.0; data[399] = 5.0;
		data[400] = 32.0; data[401] = 31.0; data[402] = 24.0; data[403] = 5.0;
		data[404] = 33.0; data[405] = 34.0; data[406] = 29.0; data[407] = 4.0;
		data[408] = 31.0; data[409] = 33.0; data[410] = 19.0; data[411] = 4.0;
		data[412] = 30.0; data[413] = 31.0; data[414] = 29.0; data[415] = 4.0;
		data[416] = 35.0; data[417] = 32.0; data[418] = 20.0; data[419] = 4.0;
		data[420] = 32.0; data[421] = 29.0; data[422] = 19.0; data[423] = 4.0;
		data[424] = 36.0; data[425] = 32.0; data[426] = 27.0; data[427] = 3.0;
		data[428] = 35.0; data[429] = 30.0; data[430] = 29.0; data[431] = 3.0;
		data[432] = 33.0; data[433] = 36.0; data[434] = 21.0; data[435] = 3.0;
		data[436] = 33.0; data[437] = 36.0; data[438] = 25.0; data[439] = 3.0;
		data[440] = 28.0; data[441] = 31.0; data[442] = 21.0; data[443] = 3.0;
		data[444] = 33.0; data[445] = 28.0; data[446] = 30.0; data[447] = 3.0;
		data[448] = 37.0; data[449] = 34.0; data[450] = 30.0; data[451] = 2.0;
		data[452] = 27.0; data[453] = 30.0; data[454] = 18.0; data[455] = 2.0;
		data[456] = 37.0; data[457] = 34.0; data[458] = 17.0; data[459] = 2.0;
		data[460] = 37.0; data[461] = 34.0; data[462] = 25.0; data[463] = 2.0;
		data[464] = 37.0; data[465] = 34.0; data[466] = 23.0; data[467] = 2.0;
		data[468] = 27.0; data[469] = 31.0; data[470] = 25.0; data[471] = 2.0;
		data[472] = 34.0; data[473] = 37.0; data[474] = 17.0; data[475] = 2.0;
		data[476] = 33.0; data[477] = 27.0; data[478] = 27.0; data[479] = 2.0;
		data[480] = 31.0; data[481] = 37.0; data[482] = 27.0; data[483] = 2.0;
		data[484] = 31.0; data[485] = 37.0; data[486] = 31.0; data[487] = 2.0;
		data[488] = 31.0; data[489] = 37.0; data[490] = 23.0; data[491] = 2.0;
		data[492] = 31.0; data[493] = 37.0; data[494] = 19.0; data[495] = 2.0;
		data[496] = 31.0; data[497] = 37.0; data[498] = 17.0; data[499] = 2.0;
		data[500] = 35.0; data[501] = 35.0; data[502] = 23.0; data[503] = 2.0;
		data[504] = 35.0; data[505] = 35.0; data[506] = 17.0; data[507] = 2.0;
		data[508] = 27.0; data[509] = 34.0; data[510] = 20.0; data[511] = 2.0;
		data[512] = 28.0; data[513] = 34.0; data[514] = 25.0; data[515] = 2.0;
		data[516] = 28.0; data[517] = 34.0; data[518] = 27.0; data[519] = 2.0;
		data[520] = 28.0; data[521] = 34.0; data[522] = 31.0; data[523] = 2.0;
		data[524] = 28.0; data[525] = 35.0; data[526] = 17.0; data[527] = 2.0;
		data[528] = 28.0; data[529] = 35.0; data[530] = 22.0; data[531] = 2.0;
		data[532] = 28.0; data[533] = 35.0; data[534] = 29.0; data[535] = 2.0;
		data[536] = 37.0; data[537] = 31.0; data[538] = 31.0; data[539] = 2.0;
		data[540] = 37.0; data[541] = 31.0; data[542] = 24.0; data[543] = 2.0;
		data[544] = 37.0; data[545] = 30.0; data[546] = 17.0; data[547] = 2.0;
		data[548] = 27.0; data[549] = 32.0; data[550] = 18.0; data[551] = 2.0;
		data[552] = 27.0; data[553] = 33.0; data[554] = 23.0; data[555] = 2.0;
		data[556] = 31.0; data[557] = 27.0; data[558] = 27.0; data[559] = 2.0;
		data[560] = 30.0; data[561] = 36.0; data[562] = 25.0; data[563] = 2.0;
		data[564] = 30.0; data[565] = 37.0; data[566] = 21.0; data[567] = 2.0;
		data[568] = 30.0; data[569] = 37.0; data[570] = 29.0; data[571] = 2.0;
		data[572] = 29.0; data[573] = 36.0; data[574] = 27.0; data[575] = 2.0;
		data[576] = 29.0; data[577] = 36.0; data[578] = 31.0; data[579] = 2.0;
		data[580] = 30.0; data[581] = 27.0; data[582] = 31.0; data[583] = 2.0;
		data[584] = 30.0; data[585] = 27.0; data[586] = 29.0; data[587] = 2.0;
		data[588] = 35.0; data[589] = 26.0; data[590] = 23.0; data[591] = 1.0;
		data[592] = 35.0; data[593] = 26.0; data[594] = 21.0; data[595] = 1.0;
		data[596] = 35.0; data[597] = 26.0; data[598] = 29.0; data[599] = 1.0;
		data[600] = 35.0; data[601] = 26.0; data[602] = 18.0; data[603] = 1.0;
		data[604] = 35.0; data[605] = 26.0; data[606] = 19.0; data[607] = 1.0;
		data[608] = 35.0; data[609] = 26.0; data[610] = 20.0; data[611] = 1.0;
		data[612] = 35.0; data[613] = 26.0; data[614] = 27.0; data[615] = 1.0;
		data[616] = 35.0; data[617] = 27.0; data[618] = 28.0; data[619] = 1.0;
		data[620] = 35.0; data[621] = 26.0; data[622] = 26.0; data[623] = 1.0;
		data[624] = 35.0; data[625] = 26.0; data[626] = 28.0; data[627] = 1.0;
		data[628] = 35.0; data[629] = 26.0; data[630] = 22.0; data[631] = 1.0;
		data[632] = 35.0; data[633] = 26.0; data[634] = 25.0; data[635] = 1.0;
		data[636] = 35.0; data[637] = 26.0; data[638] = 31.0; data[639] = 1.0;
		data[640] = 35.0; data[641] = 26.0; data[642] = 24.0; data[643] = 1.0;
		data[644] = 35.0; data[645] = 27.0; data[646] = 23.0; data[647] = 1.0;
		data[648] = 35.0; data[649] = 26.0; data[650] = 32.0; data[651] = 1.0;
		data[652] = 35.0; data[653] = 29.0; data[654] = 16.0; data[655] = 1.0;
		data[656] = 35.0; data[657] = 28.0; data[658] = 16.0; data[659] = 1.0;
		data[660] = 35.0; data[661] = 27.0; data[662] = 22.0; data[663] = 1.0;
		data[664] = 35.0; data[665] = 27.0; data[666] = 32.0; data[667] = 1.0;
		data[668] = 35.0; data[669] = 30.0; data[670] = 32.0; data[671] = 1.0;
		data[672] = 35.0; data[673] = 27.0; data[674] = 24.0; data[675] = 1.0;
		data[676] = 35.0; data[677] = 27.0; data[678] = 25.0; data[679] = 1.0;
		data[680] = 35.0; data[681] = 27.0; data[682] = 16.0; data[683] = 1.0;
		data[684] = 35.0; data[685] = 30.0; data[686] = 16.0; data[687] = 1.0;
		data[688] = 35.0; data[689] = 27.0; data[690] = 21.0; data[691] = 1.0;
		data[692] = 35.0; data[693] = 27.0; data[694] = 26.0; data[695] = 1.0;
		data[696] = 35.0; data[697] = 27.0; data[698] = 27.0; data[699] = 1.0;
		data[700] = 35.0; data[701] = 27.0; data[702] = 17.0; data[703] = 1.0;
		data[704] = 35.0; data[705] = 29.0; data[706] = 32.0; data[707] = 1.0;
		data[708] = 35.0; data[709] = 31.0; data[710] = 16.0; data[711] = 1.0;
		data[712] = 37.0; data[713] = 36.0; data[714] = 31.0; data[715] = 1.0;
		data[716] = 38.0; data[717] = 29.0; data[718] = 32.0; data[719] = 1.0;
		data[720] = 38.0; data[721] = 29.0; data[722] = 31.0; data[723] = 1.0;
		data[724] = 38.0; data[725] = 29.0; data[726] = 30.0; data[727] = 1.0;
		data[728] = 38.0; data[729] = 29.0; data[730] = 29.0; data[731] = 1.0;
		data[732] = 38.0; data[733] = 29.0; data[734] = 28.0; data[735] = 1.0;
		data[736] = 38.0; data[737] = 29.0; data[738] = 27.0; data[739] = 1.0;
		data[740] = 38.0; data[741] = 29.0; data[742] = 26.0; data[743] = 1.0;
		data[744] = 38.0; data[745] = 29.0; data[746] = 25.0; data[747] = 1.0;
		data[748] = 38.0; data[749] = 29.0; data[750] = 24.0; data[751] = 1.0;
		data[752] = 38.0; data[753] = 29.0; data[754] = 23.0; data[755] = 1.0;
		data[756] = 38.0; data[757] = 29.0; data[758] = 22.0; data[759] = 1.0;
		data[760] = 38.0; data[761] = 29.0; data[762] = 21.0; data[763] = 1.0;
		data[764] = 38.0; data[765] = 29.0; data[766] = 20.0; data[767] = 1.0;
		data[768] = 38.0; data[769] = 29.0; data[770] = 19.0; data[771] = 1.0;
		data[772] = 38.0; data[773] = 30.0; data[774] = 28.0; data[775] = 1.0;
		data[776] = 38.0; data[777] = 30.0; data[778] = 29.0; data[779] = 1.0;
		data[780] = 38.0; data[781] = 30.0; data[782] = 26.0; data[783] = 1.0;
		data[784] = 38.0; data[785] = 30.0; data[786] = 22.0; data[787] = 1.0;
		data[788] = 37.0; data[789] = 36.0; data[790] = 32.0; data[791] = 1.0;
		data[792] = 37.0; data[793] = 36.0; data[794] = 30.0; data[795] = 1.0;
		data[796] = 37.0; data[797] = 36.0; data[798] = 29.0; data[799] = 1.0;
		data[800] = 38.0; data[801] = 41.0; data[802] = 18.0; data[803] = 3.0;
		data[804] = 22.0; data[805] = 37.0; data[806] = 18.0; data[807] = 3.0;
		data[808] = 43.0; data[809] = 31.0; data[810] = 19.0; data[811] = 3.0;
		data[812] = 32.0; data[813] = 44.0; data[814] = 18.0; data[815] = 3.0;
		data[816] = 22.0; data[817] = 32.0; data[818] = 20.0; data[819] = 3.0;
		data[820] = 38.0; data[821] = 24.0; data[822] = 20.0; data[823] = 3.0;
		data[824] = 28.0; data[825] = 22.0; data[826] = 18.0; data[827] = 3.0;
		data[828] = 28.0; data[829] = 23.0; data[830] = 21.0; data[831] = 3.0;
		data[832] = 27.0; data[833] = 42.0; data[834] = 18.0; data[835] = 3.0;
		data[836] = 34.0; data[837] = 42.0; data[838] = 21.0; data[839] = 3.0;
		data[840] = 40.0; data[841] = 25.0; data[842] = 18.0; data[843] = 3.0;
		data[844] = 23.0; data[845] = 27.0; data[846] = 19.0; data[847] = 3.0;
		data[848] = 23.0; data[849] = 29.0; data[850] = 22.0; data[851] = 3.0;
		data[852] = 33.0; data[853] = 21.0; data[854] = 18.0; data[855] = 3.0;
		data[856] = 34.0; data[857] = 41.0; data[858] = 18.0; data[859] = 3.0;
		data[860] = 23.0; data[861] = 35.0; data[862] = 21.0; data[863] = 3.0;
		data[864] = 35.0; data[865] = 22.0; data[866] = 20.0; data[867] = 3.0;
		data[868] = 21.0; data[869] = 34.0; data[870] = 18.0; data[871] = 3.0;
		data[872] = 28.0; data[873] = 41.0; data[874] = 21.0; data[875] = 3.0;
		data[876] = 32.0; data[877] = 22.0; data[878] = 21.0; data[879] = 3.0;
		data[880] = 21.0; data[881] = 29.0; data[882] = 18.0; data[883] = 3.0;
		data[884] = 43.0; data[885] = 34.0; data[886] = 18.0; data[887] = 3.0;
		data[888] = 32.0; data[889] = 41.0; data[890] = 23.0; data[891] = 3.0;
		data[892] = 39.0; data[893] = 39.0; data[894] = 20.0; data[895] = 3.0;
		data[896] = 41.0; data[897] = 29.0; data[898] = 22.0; data[899] = 3.0;
		data[900] = 25.0; data[901] = 24.0; data[902] = 18.0; data[903] = 3.0;
		data[904] = 25.0; data[905] = 39.0; data[906] = 20.0; data[907] = 3.0;
		data[908] = 41.0; data[909] = 38.0; data[910] = 18.0; data[911] = 3.0;
		data[912] = 25.0; data[913] = 25.0; data[914] = 21.0; data[915] = 3.0;
		data[916] = 41.0; data[917] = 29.0; data[918] = 18.0; data[919] = 3.0;
		data[920] = 41.0; data[921] = 33.0; data[922] = 21.0; data[923] = 3.0;
		data[924] = 41.0; data[925] = 36.0; data[926] = 21.0; data[927] = 3.0;
		data[928] = 41.0; data[929] = 32.0; data[930] = 24.0; data[931] = 3.0;
		data[932] = 31.0; data[933] = 41.0; data[934] = 20.0; data[935] = 3.0;
		data[936] = 40.0; data[937] = 36.0; data[938] = 24.0; data[939] = 2.0;
		data[940] = 33.0; data[941] = 23.0; data[942] = 25.0; data[943] = 2.0;
		data[944] = 40.0; data[945] = 36.0; data[946] = 26.0; data[947] = 2.0;
		data[948] = 26.0; data[949] = 25.0; data[950] = 26.0; data[951] = 2.0;
		data[952] = 26.0; data[953] = 38.0; data[954] = 17.0; data[955] = 2.0;
		data[956] = 26.0; data[957] = 38.0; data[958] = 24.0; data[959] = 2.0;
		data[960] = 26.0; data[961] = 25.0; data[962] = 24.0; data[963] = 2.0;
		data[964] = 33.0; data[965] = 23.0; data[966] = 27.0; data[967] = 2.0;
		data[968] = 38.0; data[969] = 21.0; data[970] = 19.0; data[971] = 2.0;
		data[972] = 40.0; data[973] = 38.0; data[974] = 23.0; data[975] = 2.0;
		data[976] = 38.0; data[977] = 20.0; data[978] = 17.0; data[979] = 2.0;
		data[980] = 38.0; data[981] = 38.0; data[982] = 26.0; data[983] = 2.0;
		data[984] = 30.0; data[985] = 43.0; data[986] = 22.0; data[987] = 2.0;
		data[988] = 31.0; data[989] = 41.0; data[990] = 17.0; data[991] = 2.0;
		data[992] = 40.0; data[993] = 33.0; data[994] = 17.0; data[995] = 2.0;
		data[996] = 40.0; data[997] = 33.0; data[998] = 27.0; data[999] = 2.0;
		data[1000] = 40.0; data[1001] = 33.0; data[1002] = 29.0; data[1003] = 2.0;
		data[1004] = 30.0; data[1005] = 40.0; data[1006] = 25.0; data[1007] = 2.0;
		data[1008] = 38.0; data[1009] = 22.0; data[1010] = 17.0; data[1011] = 2.0;
		data[1012] = 40.0; data[1013] = 35.0; data[1014] = 17.0; data[1015] = 2.0;
		data[1016] = 26.0; data[1017] = 39.0; data[1018] = 26.0; data[1019] = 2.0;
		data[1020] = 26.0; data[1021] = 40.0; data[1022] = 23.0; data[1023] = 2.0;
		data[1024] = 30.0; data[1025] = 40.0; data[1026] = 27.0; data[1027] = 2.0;
		data[1028] = 39.0; data[1029] = 24.0; data[1030] = 23.0; data[1031] = 2.0;
		data[1032] = 41.0; data[1033] = 28.0; data[1034] = 25.0; data[1035] = 2.0;
		data[1036] = 33.0; data[1037] = 41.0; data[1038] = 26.0; data[1039] = 2.0;
		data[1040] = 38.0; data[1041] = 39.0; data[1042] = 23.0; data[1043] = 2.0;
		data[1044] = 37.0; data[1045] = 41.0; data[1046] = 22.0; data[1047] = 2.0;
		data[1048] = 31.0; data[1049] = 19.0; data[1050] = 19.0; data[1051] = 2.0;
		data[1052] = 25.0; data[1053] = 37.0; data[1054] = 27.0; data[1055] = 2.0;
		data[1056] = 31.0; data[1057] = 18.0; data[1058] = 17.0; data[1059] = 2.0;
		data[1060] = 31.0; data[1061] = 23.0; data[1062] = 24.0; data[1063] = 2.0;
		data[1064] = 31.0; data[1065] = 23.0; data[1066] = 26.0; data[1067] = 2.0;
		data[1068] = 38.0; data[1069] = 44.0; data[1070] = 17.0; data[1071] = 2.0;
		data[1072] = 41.0; data[1073] = 31.0; data[1074] = 27.0; data[1075] = 2.0;
		data[1076] = 31.0; data[1077] = 23.0; data[1078] = 17.0; data[1079] = 2.0;
		data[1080] = 41.0; data[1081] = 26.0; data[1082] = 23.0; data[1083] = 2.0;
		data[1084] = 31.0; data[1085] = 40.0; data[1086] = 29.0; data[1087] = 2.0;
		data[1088] = 37.0; data[1089] = 43.0; data[1090] = 20.0; data[1091] = 2.0;
		data[1092] = 26.0; data[1093] = 20.0; data[1094] = 17.0; data[1095] = 2.0;
		data[1096] = 41.0; data[1097] = 22.0; data[1098] = 17.0; data[1099] = 2.0;
		data[1100] = 40.0; data[1101] = 43.0; data[1102] = 17.0; data[1103] = 2.0;
		data[1104] = 25.0; data[1105] = 40.0; data[1106] = 17.0; data[1107] = 2.0;
		data[1108] = 33.0; data[1109] = 40.0; data[1110] = 29.0; data[1111] = 2.0;
		data[1112] = 37.0; data[1113] = 41.0; data[1114] = 24.0; data[1115] = 2.0;
		data[1116] = 41.0; data[1117] = 26.0; data[1118] = 21.0; data[1119] = 2.0;
		data[1120] = 27.0; data[1121] = 23.0; data[1122] = 24.0; data[1123] = 2.0;
		data[1124] = 29.0; data[1125] = 44.0; data[1126] = 17.0; data[1127] = 2.0;
		data[1128] = 29.0; data[1129] = 44.0; data[1130] = 19.0; data[1131] = 2.0;
		data[1132] = 28.0; data[1133] = 24.0; data[1134] = 26.0; data[1135] = 2.0;
		data[1136] = 38.0; data[1137] = 38.0; data[1138] = 17.0; data[1139] = 2.0;
		data[1140] = 30.0; data[1141] = 20.0; data[1142] = 17.0; data[1143] = 2.0;
		data[1144] = 38.0; data[1145] = 25.0; data[1146] = 26.0; data[1147] = 2.0;
		data[1148] = 29.0; data[1149] = 42.0; data[1150] = 24.0; data[1151] = 2.0;
		data[1152] = 28.0; data[1153] = 40.0; data[1154] = 24.0; data[1155] = 2.0;
		data[1156] = 29.0; data[1157] = 23.0; data[1158] = 24.0; data[1159] = 2.0;
		data[1160] = 29.0; data[1161] = 40.0; data[1162] = 17.0; data[1163] = 2.0;
		data[1164] = 28.0; data[1165] = 40.0; data[1166] = 26.0; data[1167] = 2.0;
		data[1168] = 29.0; data[1169] = 20.0; data[1170] = 20.0; data[1171] = 2.0;
		data[1172] = 38.0; data[1173] = 26.0; data[1174] = 24.0; data[1175] = 2.0;
		data[1176] = 40.0; data[1177] = 29.0; data[1178] = 27.0; data[1179] = 2.0;
		data[1180] = 39.0; data[1181] = 26.0; data[1182] = 22.0; data[1183] = 2.0;
		data[1184] = 40.0; data[1185] = 31.0; data[1186] = 29.0; data[1187] = 2.0;
		data[1188] = 39.0; data[1189] = 27.0; data[1190] = 26.0; data[1191] = 2.0;
		data[1192] = 28.0; data[1193] = 19.0; data[1194] = 17.0; data[1195] = 2.0;
		data[1196] = 30.0; data[1197] = 24.0; data[1198] = 19.0; data[1199] = 2.0;
		data[1200] = 28.0; data[1201] = 37.0; data[1202] = 8.0; data[1203] = 8.0;
		data[1204] = 11.0; data[1205] = 38.0; data[1206] = 7.0; data[1207] = 8.0;
		data[1208] = 45.0; data[1209] = 3.0; data[1210] = 7.0; data[1211] = 8.0;
		data[1212] = 30.0; data[1213] = 46.0; data[1214] = 8.0; data[1215] = 8.0;
		data[1216] = 17.0; data[1217] = 8.0; data[1218] = 8.0; data[1219] = 8.0;
		data[1220] = 34.0; data[1221] = 17.0; data[1222] = 7.0; data[1223] = 8.0;
		data[1224] = 20.0; data[1225] = 28.0; data[1226] = 7.0; data[1227] = 8.0;
		data[1228] = 42.0; data[1229] = 35.0; data[1230] = 7.0; data[1231] = 8.0;
		data[1232] = 51.0; data[1233] = 28.0; data[1234] = 7.0; data[1235] = 8.0;
		data[1236] = 40.0; data[1237] = 11.0; data[1238] = 8.0; data[1239] = 8.0;
		data[1240] = 48.0; data[1241] = 44.0; data[1242] = 8.0; data[1243] = 8.0;
		data[1244] = 56.0; data[1245] = 43.0; data[1246] = 7.0; data[1247] = 8.0;
		data[1248] = 11.0; data[1249] = 30.0; data[1250] = 8.0; data[1251] = 8.0;
		data[1252] = 20.0; data[1253] = 19.0; data[1254] = 7.0; data[1255] = 8.0;
		data[1256] = 41.0; data[1257] = 26.0; data[1258] = 7.0; data[1259] = 8.0;
		data[1260] = 46.0; data[1261] = 18.0; data[1262] = 7.0; data[1263] = 8.0;
		data[1264] = 17.0; data[1265] = 0.0; data[1266] = 7.0; data[1267] = 8.0;
		data[1268] = 44.0; data[1269] = 61.0; data[1270] = 7.0; data[1271] = 8.0;
		data[1272] = 11.0; data[1273] = 53.0; data[1274] = 7.0; data[1275] = 8.0;
		data[1276] = 20.0; data[1277] = 45.0; data[1278] = 7.0; data[1279] = 8.0;
		data[1280] = 34.0; data[1281] = 30.0; data[1282] = 7.0; data[1283] = 8.0;
		data[1284] = 16.0; data[1285] = 63.0; data[1286] = 8.0; data[1287] = 8.0;
		data[1288] = 51.0; data[1289] = 36.0; data[1290] = 7.0; data[1291] = 8.0;
		data[1292] = 20.0; data[1293] = 36.0; data[1294] = 8.0; data[1295] = 8.0;
		data[1296] = 25.0; data[1297] = 56.0; data[1298] = 8.0; data[1299] = 8.0;
		data[1300] = 33.0; data[1301] = 56.0; data[1302] = 7.0; data[1303] = 8.0;
		data[1304] = 31.0; data[1305] = 0.0; data[1306] = 7.0; data[1307] = 8.0;
		data[1308] = 27.0; data[1309] = 24.0; data[1310] = 7.0; data[1311] = 8.0;
		data[1312] = 51.0; data[1313] = 11.0; data[1314] = 7.0; data[1315] = 8.0;
		data[1316] = 11.0; data[1317] = 22.0; data[1318] = 7.0; data[1319] = 8.0;
		data[1320] = 11.0; data[1321] = 14.0; data[1322] = 7.0; data[1323] = 8.0;
		data[1324] = 48.0; data[1325] = 54.0; data[1326] = 8.0; data[1327] = 8.0;
		data[1328] = 39.0; data[1329] = 47.0; data[1330] = 8.0; data[1331] = 8.0;
		data[1332] = 30.0; data[1333] = 9.0; data[1334] = 8.0; data[1335] = 8.0;
		data[1336] = 56.0; data[1337] = 53.0; data[1338] = 8.0; data[1339] = 8.0;
		data[1340] = 8.0; data[1341] = 3.0; data[1342] = 8.0; data[1343] = 8.0;
		data[1344] = 7.0; data[1345] = 46.0; data[1346] = 8.0; data[1347] = 8.0;
		data[1348] = 7.0; data[1349] = 62.0; data[1350] = 8.0; data[1351] = 8.0;
		data[1352] = 56.0; data[1353] = 21.0; data[1354] = 8.0; data[1355] = 8.0;
		data[1356] = 53.0; data[1357] = 62.0; data[1358] = 8.0; data[1359] = 8.0;
		data[1360] = 54.0; data[1361] = 3.0; data[1362] = 7.0; data[1363] = 8.0;
		data[1364] = 29.0; data[1365] = 63.0; data[1366] = 7.0; data[1367] = 8.0;
		data[1368] = 24.0; data[1369] = 4.0; data[1370] = 6.0; data[1371] = 7.0;
		data[1372] = 35.0; data[1373] = 40.0; data[1374] = 5.0; data[1375] = 6.0;
		data[1376] = 58.0; data[1377] = 32.0; data[1378] = 10.0; data[1379] = 6.0;
		data[1380] = 37.0; data[1381] = 4.0; data[1382] = 11.0; data[1383] = 5.0;
		data[1384] = 58.0; data[1385] = 14.0; data[1386] = 4.0; data[1387] = 5.0;
		data[1388] = 59.0; data[1389] = 28.0; data[1390] = 4.0; data[1391] = 5.0;
		data[1392] = 58.0; data[1393] = 13.0; data[1394] = 11.0; data[1395] = 5.0;
		data[1396] = 36.0; data[1397] = 39.0; data[1398] = 11.0; data[1399] = 5.0;
		data[1400] = 41.0; data[1401] = 54.0; data[1402] = 4.0; data[1403] = 5.0;
		data[1404] = 36.0; data[1405] = 63.0; data[1406] = 11.0; data[1407] = 5.0;
		data[1408] = 58.0; data[1409] = 33.0; data[1410] = 4.0; data[1411] = 5.0;
		data[1412] = 59.0; data[1413] = 8.0; data[1414] = 11.0; data[1415] = 5.0;
		data[1416] = 40.0; data[1417] = 55.0; data[1418] = 11.0; data[1419] = 5.0;
		data[1420] = 59.0; data[1421] = 9.0; data[1422] = 4.0; data[1423] = 5.0;
		data[1424] = 27.0; data[1425] = 17.0; data[1426] = 11.0; data[1427] = 5.0;
		data[1428] = 5.0; data[1429] = 10.0; data[1430] = 11.0; data[1431] = 5.0;
		data[1432] = 5.0; data[1433] = 18.0; data[1434] = 11.0; data[1435] = 5.0;
		data[1436] = 4.0; data[1437] = 54.0; data[1438] = 11.0; data[1439] = 5.0;
		data[1440] = 4.0; data[1441] = 19.0; data[1442] = 4.0; data[1443] = 5.0;
		data[1444] = 4.0; data[1445] = 26.0; data[1446] = 11.0; data[1447] = 5.0;
		data[1448] = 4.0; data[1449] = 26.0; data[1450] = 6.0; data[1451] = 5.0;
		data[1452] = 4.0; data[1453] = 9.0; data[1454] = 4.0; data[1455] = 5.0;
		data[1456] = 4.0; data[1457] = 33.0; data[1458] = 5.0; data[1459] = 5.0;
		data[1460] = 4.0; data[1461] = 33.0; data[1462] = 11.0; data[1463] = 5.0;
		data[1464] = 4.0; data[1465] = 39.0; data[1466] = 11.0; data[1467] = 5.0;
		data[1468] = 23.0; data[1469] = 12.0; data[1470] = 4.0; data[1471] = 5.0;
		data[1472] = 18.0; data[1473] = 53.0; data[1474] = 11.0; data[1475] = 5.0;
		data[1476] = 18.0; data[1477] = 56.0; data[1478] = 4.0; data[1479] = 5.0;
		data[1480] = 3.0; data[1481] = 51.0; data[1482] = 3.0; data[1483] = 4.0;
		data[1484] = 37.0; data[1485] = 63.0; data[1486] = 3.0; data[1487] = 4.0;
		data[1488] = 38.0; data[1489] = 0.0; data[1490] = 3.0; data[1491] = 4.0;
		data[1492] = 3.0; data[1493] = 54.0; data[1494] = 6.0; data[1495] = 4.0;
		data[1496] = 4.0; data[1497] = 14.0; data[1498] = 3.0; data[1499] = 4.0;
		data[1500] = 38.0; data[1501] = 5.0; data[1502] = 3.0; data[1503] = 4.0;
		data[1504] = 3.0; data[1505] = 57.0; data[1506] = 3.0; data[1507] = 4.0;
		data[1508] = 3.0; data[1509] = 15.0; data[1510] = 7.0; data[1511] = 4.0;
		data[1512] = 3.0; data[1513] = 41.0; data[1514] = 3.0; data[1515] = 4.0;
		data[1516] = 3.0; data[1517] = 38.0; data[1518] = 6.0; data[1519] = 4.0;
		data[1520] = 27.0; data[1521] = 17.0; data[1522] = 3.0; data[1523] = 4.0;
		data[1524] = 60.0; data[1525] = 59.0; data[1526] = 3.0; data[1527] = 4.0;
		data[1528] = 60.0; data[1529] = 59.0; data[1530] = 12.0; data[1531] = 4.0;
		data[1532] = 22.0; data[1533] = 13.0; data[1534] = 12.0; data[1535] = 4.0;
		data[1536] = 60.0; data[1537] = 38.0; data[1538] = 12.0; data[1539] = 4.0;
		data[1540] = 60.0; data[1541] = 1.0; data[1542] = 12.0; data[1543] = 4.0;
		data[1544] = 14.0; data[1545] = 47.0; data[1546] = 12.0; data[1547] = 4.0;
		data[1548] = 24.0; data[1549] = 0.0; data[1550] = 12.0; data[1551] = 4.0;
		data[1552] = 44.0; data[1553] = 49.0; data[1554] = 2.0; data[1555] = 3.0;
		data[1556] = 43.0; data[1557] = 42.0; data[1558] = 2.0; data[1559] = 3.0;
		data[1560] = 50.0; data[1561] = 49.0; data[1562] = 2.0; data[1563] = 3.0;
		data[1564] = 40.0; data[1565] = 20.0; data[1566] = 13.0; data[1567] = 3.0;
		data[1568] = 47.0; data[1569] = 32.0; data[1570] = 13.0; data[1571] = 3.0;
		data[1572] = 47.0; data[1573] = 24.0; data[1574] = 13.0; data[1575] = 3.0;
		data[1576] = 41.0; data[1577] = 41.0; data[1578] = 13.0; data[1579] = 3.0;
		data[1580] = 40.0; data[1581] = 0.0; data[1582] = 13.0; data[1583] = 3.0;
		data[1584] = 46.0; data[1585] = 9.0; data[1586] = 13.0; data[1587] = 3.0;
		data[1588] = 15.0; data[1589] = 43.0; data[1590] = 13.0; data[1591] = 3.0;
		data[1592] = 60.0; data[1593] = 63.0; data[1594] = 2.0; data[1595] = 3.0;
		data[1596] = 17.0; data[1597] = 51.0; data[1598] = 2.0; data[1599] = 3.0;
		let texture = new THREE.DataTexture(data, 400, 1, THREE.RGBAFormat, THREE.FloatType);
		texture.needsUpdate = true;

		axios.get("http://localhost:8888/api/v1/models/shaders")
			.then(res => {
				setMaterialProps({
					uniforms: {
						iTime: { value: 0 },
						iResolution: { value: new THREE.Vector3() },
						iMouse: { value: new THREE.Vector4() },
						eyeOrientation: { value: 0 },
						pos: { value: 0 },
						node: {
							value: nodes
						},
						leafData: {
							value: leaf_data
						},
						spheres: {
							value: texture
						},
						movement: { value: 0.0 },
						enableSDF1: { value: true },
						enableSDF2: { value: true },
						enableSDF3: { value: true },
						enableSDF4: { value: true },
						uViewMatrix: {value: new THREE.Matrix3()},
						uCamera: {value: new THREE.Vector3()}
					},
					fragmentShader: f
				})
				setLoading(false)
			})
			.catch(err => console.error(err));
	}, [])

	const options = useMemo(() => {
		return {
			enableSDF1: false,
			enableSDF2: true,
			enableSDF3: true,
			enableSDF4: true,
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
import React, { useState, useRef, useEffect} from "react";
import { useParams } from 'react-router-dom';
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
		for (let s in mesh.current.material.uniforms.sdfLayers) {
			mesh.current.material.uniforms[s].value = props.controls[s];
		}

		mesh.current.material.uniforms.iMouse.value.set(state.mouse.x, -state.mouse.y, 0.0, 0.0);

		if (mouseDown) {
			let deltaX = state.mouse.x - lastMouse.x;
			let deltaY = state.mouse.y - lastMouse.y;
			mouse.x += PI * deltaX * CAMERA_SENSITIVITY; mouse.y += PI * deltaY * CAMERA_SENSITIVITY;
			lastMouse.x = state.mouse.x; lastMouse.y = state.mouse.y;
			// console.log(deltaX); console.log(deltaY);
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
	const [loading, setLoading] = useState(true);
	const [materialProps, setMaterialProps] = useState(undefined)
	const [terrainOptions, setTerrainOptions] = useState(undefined)
	const params = useParams();

	useEffect(() => {
		
		axios.get("http://localhost:8000/scenes/"+params.modelId)
			.then(res => {
				// console.log(res)
				const data = new Float32Array(res.data.processed_data.SPHERES_DATA);
				let texture = new THREE.DataTexture(data, data.length/4.0, 1, THREE.RGBAFormat, THREE.FloatType);
				texture.needsUpdate = true;
				// console.log(res.data.processed_data.FRAGMENT_SHADER)
				setMaterialProps({
					uniforms: {
						iTime: { value: 0 },
						iResolution: { value: new THREE.Vector3() },
						iMouse: { value: new THREE.Vector4() },
						eyeOrientation: { value: 0 },
						pos: { value: 0 },
						node: {
							value: res.data.processed_data.NODES
						},
						leafData: {
							value: res.data.processed_data.LEAF_DATA
						},
						spheres: {
							value: texture
						},
						movement: { value: 0.0 },
						sdfLayers: res.data.processed_data.SDF_LAYERS,
						...res.data.processed_data.SDF_LAYERS,
						uViewMatrix: {value: new THREE.Matrix3()},
						uCamera: {value: new THREE.Vector3()}
					},
					fragmentShader: res.data.processed_data.FRAGMENT_SHADER
				});
				
				let options = {};
				for (let layer in res.data.processed_data.SDF_LAYERS) {
					options[layer] = true;
				}
				setTerrainOptions(options);

				setLoading(false);
			})
			.catch(err => console.error(err));
	});

	/*const options = useMemo(() => {
					let options = {enableSDF1: true}
					return options
				}, [])*/
	/*let options = {}
	if (terrainOptions == undefined) {
		for (let layer in terrainOptions) {
			options[layer] = true;
		}
	}*/
	const options = useMemo(() => {
		return {
			enableSDF1: false,
			enableSDF2: true,
			enableSDF3: true,
			enableSDF4: true,
		}
	}, [])
	 // TODO: ver como usar el SDF_LAYER estando fuera del llamado y que ya este definido.
	// setTerrainOptions(options)
	// options --> null y setearlo despu
	// si options es undefined ponerlo como {}

	const terrainControls = useControls('Terrain', options);

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
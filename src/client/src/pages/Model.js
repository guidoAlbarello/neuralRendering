import React, { useState, useRef } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stats } from '@react-three/drei'

const TerrainShaderMaterial = {
  uniforms: {
    u_time: { type: "f", value: 0 },
    iResolution: { value: new THREE.Vector3() },
    iTime: { type: "f", value: 0 },
  },
  vertexShader: `
    precision mediump float;
    varying vec2 vUv;
    void main() {
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.);
        gl_Position = projectionMatrix * mvPosition;
        vUv = uv;
    }
  `,
  fragmentShader: `
    varying vec2 vUv;
    uniform float u_time;

    void main() {
      vec2 uv = vUv;
      float cb = floor((uv.x + u_time)*20.) + floor((uv.y + u_time)*20.);
      gl_FragColor = vec4(1.,0.,0.,mod(cb, 2.0));
    }
  `
};

function Terrain(props) {
  const ref = useRef()
  const [clicked, click] = useState(false)   

  useFrame(({ clock }) => {
    ref.current.material.uniforms.u_time.value = clock.oldTime * 0.00005;
    ref.current.rotation.x += 0.005
    ref.current.rotation.y += 0.005
  });

  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}>
      <boxGeometry args={[1, 1, 1]} />
      <shaderMaterial attach="material" args={[TerrainShaderMaterial]} />
    </mesh>
  )
}


const Model = () => (
  <Canvas style={{ height: "100vh", width: "100vw" }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Terrain position={[0, 0, 0]} />
      <OrbitControls />
      <Stats />
  </Canvas>
);

  export default Model;
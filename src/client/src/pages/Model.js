import React, { useState, useRef, useEffect } from "react";
import * as THREE from "three";
import axios from "axios";
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stats } from '@react-three/drei'

function Terrain(props) {
  const mesh = useRef()
  const [clicked, click] = useState(false)

  useFrame(({ clock }) => {
    mesh.current.material.uniforms.u_time.value = clock.oldTime * 0.00005;
    mesh.current.rotation.x += 0.005
    mesh.current.rotation.y += 0.005
  });

  return (
    <mesh
      {...props}
      ref={mesh}
      material={new THREE.ShaderMaterial({
        vertexShader: props.material.vertexShader,
        fragmentShader: props.material.fragmentShader,
        uniforms: props.material.uniforms
      })}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}>
      <boxGeometry args={[1, 1, 1]} />
    </mesh>
  )
}


const Model = () => {

  const [loading, setLoading] = useState(true);
  const [materialProps, setMaterialProps] = useState(undefined)

  useEffect(() => {
   axios.get("http://localhost:8888/api/v1/models/shaders")
   .then(res => {
    setMaterialProps({
      uniforms: {
        u_time: { type: "f", value: 0 },
        iResolution: { value: new THREE.Vector3() }, // unnecessary shader
        iTime: { type: "f", value: 0 }, // unnecessary with current shader
      },
      vertexShader: res.data.vertexShader,
      fragmentShader: res.data.fragmentShader
    })
    setLoading(false)
   })
   .catch(err => console.error(err));
  }, [])

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Canvas style={{ height: "100vh", width: "100vw" }}>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      <Terrain position={[0, 0, 0]} material={materialProps}/>
      <OrbitControls />
      <Stats />
    </Canvas>
  );
  };

  export default Model;
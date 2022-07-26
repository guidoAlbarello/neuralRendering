//import axios from "axios";
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Grapher from "../components/grapher";
import { Canvas, useFrame } from '@react-three/fiber'

function Box(props) {
  // This reference will give us direct access to the mesh
  const mesh = useRef()
  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (mesh.current.rotation.x += 0.01))
  // Return view, these are regular three.js elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? 1.5 : 1}
      onClick={(event) => setActive(!active)}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

const Model = () => {
  let params = useParams()

  const [model, setModel] = useState([]);
  const API = 'http://localhost:8888/api/v1/models/' + params.modelId;

  useEffect(() => {
    fetch(API)
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
        setModel(res)
      })
  }, [API])

  // useEffect(() => {
  //   const fetch = async () => {
  //     try {
  //       const { data } = await axios.get("http://localhost:8888/api/v1/models/" + params.modelId);
  //       setModel(data);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };
  //   fetch();
  // }, []);

  /*
  const getCanvas = () => {
    return <canvas id="model-canvas" width="800" height="600">
      Your browser does not support the HTML5 canvas element.
    </canvas>
  }
  */

  return (
  <>
    <div className="mb-4">
      <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
      </Canvas>
      <p className="text-center">{model.id} - {model.name}</p>
      <p>
        <i>{ model.description }</i>
      </p>
    </div>
  </>);
  };
  
  export default Model;
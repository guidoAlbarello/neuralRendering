//import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Grapher from "../components/grapher";

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
      <Grapher
        canvasHeight={600}
        canvasWidth={800}
      />
      <p className="text-center">{model.id} - {model.name}</p>
      <p>
        <i>{ model.description }</i>
      </p>
    </div>
  </>);
  };
  
  export default Model;
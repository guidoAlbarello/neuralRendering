/*
import React from "react";
import PropTypes from 'prop-types';
import * as THREE from 'three';
import Scene from "./scene";


const Grapher = ({canvasHeight, canvasWidth}) => {
    const [count, setCount] = React.useState(0)

    const [renderer, setRenderer] = React.useState([])
    const [scene, setScene] = React.useState([])

  // Use useRef for mutable variables that we want to persist
  // without triggering a re-render on their change
  const requestRef = React.useRef();
  const previousTimeRef = React.useRef();
  const canvasRef = React.useRef();
  
  React.useEffect(() => {
    const animate = time => {
        if (previousTimeRef.current !== undefined) {
          const deltaTime = time - previousTimeRef.current;
          
          // Pass on a function to the setter of the state
          // to make sure we always have the latest state
          setCount(prevCount => (prevCount + deltaTime * 0.01) % 100);
        }
        previousTimeRef.current = time;
        requestRef.current = requestAnimationFrame(animate);
      }

      let r = new THREE.WebGLRenderer({canvasRef})
      r.autoClearColor = false
      setRenderer(r)

      let s = new Scene()
      s.build()
      setScene(s)

    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []); // Make sure the effect runs only once

    return (
        <canvas 
            id="my-canvas" 
            ref={canvasRef}
            width={canvasWidth}
            height={canvasHeight}
            style={{
                border: '2px solid #000',
                marginTop: 10,
            }}
        >
        </canvas>
    )
}

Grapher.propTypes = {
    canvasHeight: PropTypes.number.isRequired,
    canvasWidth: PropTypes.number.isRequired,
};

*/

/*
const Grapher = (canvas) => {
    const [renderer, setRenderer] = useState([])
    const [scene, setScene] = useState([])

    const getCanvas = () => {
        return <canvas id="model-canvas" width="800" height="600">
          Your browser does not support the HTML5 canvas element.
        </canvas>
      }

    const update = (time) => {
        resizeRendererToDisplaySize(renderer);

        scene.update(time, renderer.domElement);
        renderer.render(scene.getScene(), scene.getCamera());

        window.scene = scene.getScene();
        requestAnimationFrame(t => update(t));
    }

    useEffect(() => {
        let r = new THREE.WebGLRenderer({getCanvas()})
        r.autoClearColor = false
        setRenderer(r)

        let s = new Scene()
        s.build()
        setScene(s)
    },[])

    const resizeRendererToDisplaySize = (r) => {
        const canvas = r.domElement;
        const width = canvas.clientWidth;
        const height = canvas.clientHeight;
        const needResize = canvas.width !== width || canvas.height !== height;
        if (needResize) {
            r.setSize(width, height, false);
        }
        return needResize;
    }
}
*/

export default Grapher;
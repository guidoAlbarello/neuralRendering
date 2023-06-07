var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path')

const publicPath = path.join(__dirname,'..', '/public');

router.get('/', function(req, res, next) {
  models = [
    {
      id: 1,
      name: "Model 1",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      status: "SHADER_CREATED",
      thumbnail_url: "images/img-1.jpeg"
    },
    {
      id: 2,
      name: "Model 2",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      status: "SHADER_CREATED",
      thumbnail_url: "images/img-2.jpeg"
    },
    {
      id: 3,
      name: "Model 3",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      status: "SHADER_CREATED",
      thumbnail_url: "images/img-3.jpeg"
    },
    {
      id: 4,
      name: "Model 4",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      status: "SHADER_CREATED",
      thumbnail_url: "images/img-4.jpeg"
    },
    {
      id: 5,
      name: "Model 5",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      status: "PROCESSING",
      thumbnail_url: ""
    },
    {
      id: 6,
      name: "Model 6",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      status: "MODEL_LOADED",
      thumbnail_url: ""
    },
    {
      id: 7,
      name: "Model 7",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      status: "FAILED_TO_PROCESS",
      thumbnail_url: ""
    },
  ]
  res.json({"models": models});
});

const shaders = {
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
  `,
};

router.get('/shaders', (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*") // Set CORS headers
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")
  res.json(shaders);
});

router.get('/:id', function(req, res, next) {
  model = {
      id: req.params['id'],
      name: "model " + req.params['id'],
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      status: "MODEL_LOADED",
      thumbnail_url: "",
      image_url: "",
      shader: 'sample-shader.glsl'
    }
  res.json(model);
});

router.get('/:id/shader/:shader', function(req, res, next) {  
  fs.readFile(path.join(publicPath,'shaders',req.params['shader']), 'utf8', function(err, data) {
    if (err) {
      console.error(err);
      res.send(err)
      return
    }
    res.send(data);
  })
});

router.post('/', function(req, res, next) {
  models = {
      id: req.params['id'],
      name: "model 1",
      description: "description one",
      status: "MODEL_LOADED"
    }
  res.json({"models": models});
});

module.exports = router;

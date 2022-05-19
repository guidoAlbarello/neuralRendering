var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  models = [
    {
      id: 1,
      name: "model 1",
      description: "description one",
      status: "MODEL_LOADED"
    },
    {
      id: 2,
      name: "model 2",
      description: "description two",
      status: "SHADER_CREATED"
    },
    {
      id: 3,
      name: "model 3",
      description: "description three",
      status: "PROCESSING"
    },
    {
      id: 4,
      name: "model 4",
      description: "description four",
      status: "FAILED_TO_PROCESS"
    },
  ]
  res.json({"models": models});
});

router.get('/:id', function(req, res, next) {
  models = {
      id: req.params['id'],
      name: "model 1",
      description: "description one",
      status: "MODEL_LOADED"
    }
  res.json({"models": models});
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

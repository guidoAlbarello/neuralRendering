var express = require('express');
var app = express();
var path = require('path');

app.use(express.static('research/rendering'));

app.listen(8080, "0.0.0.0");
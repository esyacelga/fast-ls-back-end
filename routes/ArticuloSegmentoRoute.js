var express = require('express');
var svrArticuloSegmeto = require('../servicios/svrArticuloSegmento');

var app = express();



app.put('/obtenerTodosArticuloSegmento/', svrArticuloSegmeto.obtenerTodos);



module.exports = app;

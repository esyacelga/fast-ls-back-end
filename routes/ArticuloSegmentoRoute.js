var express = require('express');
var svrArticuloSegmeto = require('../servicios/svrArticuloSegmento');

var app = express();


/**
 * Obtiene todos los segmentos
 */
app.put('/obtenerTodosArticuloSegmento/', svrArticuloSegmeto.obtenerTodos);

/**
 * Crea un registro
 */
app.post('/', svrArticuloSegmeto.registrar);

/**
 * Actualizar
 */
app.put('/', svrArticuloSegmeto.actualizar);


/**
 * Eliminar
 */
app.delete('/:id', svrArticuloSegmeto.eliminar);


module.exports = app;

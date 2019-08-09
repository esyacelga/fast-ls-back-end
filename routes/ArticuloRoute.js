var express = require('express');
var svrArticulo = require('../servicios/svrArticulo');

var app = express();


/**
 * Obtiene todos los segmentos
 */
app.put('/obtenerTodosArticulo/', svrArticulo.obtenerTodos);

/**
 * Crea un registro
 */
app.post('/', svrArticulo.registrar);

/**
 * Actualizar
 */
app.put('/', svrArticulo.actualizar);


/**
 * Eliminar
 */
app.delete('/:id', svrArticulo.eliminar);


module.exports = app;

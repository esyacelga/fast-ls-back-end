var express = require('express');
var mdlTipoArticulo = require('../models/TipoArticulo');
var responceActualizar = require('../system/SystemUtils');
var responceGuardar = require('../system/SystemUtils');
var responceCrear = require('../system/SystemUtils');
var responceEliminar = require('../system/SystemUtils');
var svrTipoArticulo = require('../servicios/svrTipoArticulo');

var app = express();


/**
 * Obtiene todos los tipos de articulos
 */
app.get('/', svrTipoArticulo.obtenerTodos)


/**
 * Inserta un nuevo tipo articulo
 */
app.post('', (req, res) => {
    var body = req.body;
    var svc = new mdlTipoArticulo({
        descripcion: body.descripcion,
        codigo: body.codigo,
        estado: body.estado
    });
    svc.save((err, objeto) => {
        res = responceCrear.responceCrear(req, res, err, objeto);
    });

});


/**
 * Actualiza usuario
 */
app.put('/:id', (req, res) => {

    var id = req.params.id;
    var body = req.body;

    mdlTipoArticulo.findById(id, (err, obj) => {
        var ret = responceActualizar.responceActualizar(req, res, err, obj);
        if (ret) {
            return ret;
        }
        obj.descripcion = body.descripcion;
        obj.codigo = body.codigo;
        obj.estado = body.estado;
        obj.save((err, objGuardado) => {
            res = responceGuardar.responceGuardar(req, res, err, objGuardado);
        });

    });

});


/**
 * Eliminacion de usuario
 */
app.delete('/:id', (req, res) => {
    var id = req.params.id;
    mdlTipoArticulo.findByIdAndRemove(id, (err, objeto) => {
        res = responceEliminar.responceEliminar(req, res, err, objeto);
    });
});

module.exports = app;

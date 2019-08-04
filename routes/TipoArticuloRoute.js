var express = require('express');
var mdlTipoArticulo = require('../models/TipoArticulo');
var responceActualizar = require('../system/SystemUtils');
var responceGuardar = require('../system/SystemUtils');
var responceBuscar = require('../system/SystemUtils');
var responceCrear = require('../system/SystemUtils');
var app = express();


/**
 * Obtiene todos los usuarios
 */
app.get('/', (req, res, next) => {
    mdlTipoArticulo.find({}, (error, objeto) => {
        res = responceBuscar.responceBuscar(req, res, error, objeto);
    });
})

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

    Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error borrar usuario',
                errors: err
            });
        }

        if (!usuarioBorrado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'No existe un usuario con ese id',
                errors: {message: 'No existe un usuario con ese id'}
            });
        }

        res.status(200).json({
            ok: true,
            usuario: usuarioBorrado
        });

    });

});

module.exports = app;

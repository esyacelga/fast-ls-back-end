var express = require('express');
var mdlTipoArticulo = require('../models/TipoArticulo');
var app = express();


/**
 * Obtiene todos los usuarios
 */
app.get('/', (req, res, next) => {
    mdlTipoArticulo.find({}, (error, tipoArticulo) => {
        if (error) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando usuario',
                errors: error
            })
        }
        res.status(200).json({
            ok: true,
            tipoArticulo: tipoArticulo
        })
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

    svc.save((err, objtGuardado) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error al crear objeto',
                errors: err
            })
        }
        res.status(201).json({
            ok: true,
            objtGuardado: objtGuardado
        })
    });

});


/**
 * Actualiza usuario
 */
app.put('/:id', (req, res) => {

    var id = req.params.id;
    var body = req.body;

    mdlTipoArticulo.findById(id, (err, obj) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        }

        if (!obj) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El usuario con el id ' + id + ' no existe',
                errors: {message: 'No existe un usuario con ese ID'}
            });
        }


        obj.descripcion = body.descripcion;
        obj.codigo = body.codigo;
        obj.estado = body.estado;

        obj.save((err, objGuardado) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar usuario',
                    errors: err
                });
            }
            res.status(200).json({
                ok: true,
                objGuardado: objGuardado
            });

        });

    });

});


/**
 * Eliminacion de usuario
 */
/*app.delete('/:id', (req, res) => {

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

});*/

module.exports = app;

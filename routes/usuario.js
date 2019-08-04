var express = require('express');
var usuario = require('../models/usuario');

var app = express();
//Rutas
app.get('/', (req, res, next) => {
    usuario.find({},'nombre email img role').exec(

        (error, usuarios) => {
        if (error) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error cargando usuario',
                errors: error
            })
        }
        res.status(200).json({
            ok: true,
            usuarios: usuarios
        })
    });


})


module.exports = app;

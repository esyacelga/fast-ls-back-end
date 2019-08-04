//Requires
var express = require('express');
var mongoose = require('mongoose');

//inicializar variables
var app = express();

//Conexion a la bas de datos

mongoose.connect('mongodb://localhost:27017/mensajeria-ley-seevice', (err, res) => {
    if (err) throw err;

    console.log('Base de datos puerto 3000:\x1b[36m%s\x1b[0m', 'online');
});

//Importar Rutas
var appRoutes = require('./routes/app');
var usuarioRoutes = require('./routes/usuario');


//Rutasuse('/', appRoutes);
app.use('/usuario', usuarioRoutes);
app.use('/', appRoutes);


//Escuchar peticiones
app.listen(3000, () => {
    console.log('Express server puerto 3000:\x1b[36m%s\x1b[0m', 'online');
});






//Requires
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser')


//inicializar variables
var app = express();


//CORS
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
});


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// parse application/json
app.use(bodyParser.json())


//Conexion a la bas de datos

mongoose.connect('mongodb://localhost:27017/mensajeria-ley-seevice', (err, res) => {
    if (err) throw err;

    console.log('Base de datos puerto 3000:\x1b[36m%s\x1b[0m', 'online');
});

//Importar Rutas
var appRoutes = require('./routes/app');
var usuarioRoutes = require('./routes/usuario');
var loqinRoutes = require('./routes/login');
var tipoArticulo = require('./routes/TipoArticuloRoute');
var articuloSegmento = require('./routes/ArticuloSegmentoRoute');


//Rutasuse('/', appRoutes);
app.use('/articuloSegmento', articuloSegmento);
app.use('/tipoArticulo', tipoArticulo);
app.use('/usuario', usuarioRoutes);
app.use('/login', loqinRoutes);
app.use('/', appRoutes);


//Escuchar peticiones
app.listen(3000, () => {
    console.log('Express server puerto 3000:\x1b[36m%s\x1b[0m', 'online');
});






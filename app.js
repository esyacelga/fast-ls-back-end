//Requires
var express = require('express');

//inicializar variables
var app = express();


var Connection = require('tedious').Connection;
var config = {
    server: '192.168.2.155:1433',  //update me
    authentication: {
        type: 'default',
        options: {
            userName: 'isses', //update me
            password: '123456'  //update me
        }
    },
    options: {
        // If you are on Microsoft Azure, you need encryption:
        encrypt: true,
        database: 'siisspolwebresp'  //update me
    }
};

var connection = new Connection(config);
connection.on('connect', function (err) {
    // If no error, then good to proceed.
    console.log("Connected");
});


//Importar Rutas
var appRoutes = require('./routes/app');
var articulosRoutes = require('./routes/articulo');


//Rutasuse('/', appRoutes);
app.use('/', appRoutes);
app.use('/', articulosRoutes);

//Escuchar peticiones
app.listen(3000, () => {
    console.log('Express server puerto 3000:\x1b[36m%s\x1b[0m', 'online');
});






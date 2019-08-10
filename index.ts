import Server from './classes/server';
import mongoose from 'mongoose';

import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import userRoutes from './routes/usuario';
import postRoutes from './routes/post';
import tipoArticulo from "./routes/TipoArticuloRoute";
import articuloSegmentoRoute from "./routes/ArticuloSegmentoRoute";

const server = new Server();


// Body parser
server.app.use(bodyParser.urlencoded({extended: true}));
server.app.use(bodyParser.json());

server.app.use(cors({origin: true, credentials: true}));
// FileUpload
server.app.use(fileUpload({useTempFiles: true}));


// Rutas de mi app
server.app.use('/user', userRoutes);
server.app.use('/posts', postRoutes);
server.app.use('/tipoArticulo', tipoArticulo);
server.app.use('/articuloSegmento', articuloSegmentoRoute);

// Conectar DB
mongoose.connect('mongodb://localhost:27017/fotosgram',
    {useNewUrlParser: true, useCreateIndex: true}, (err) => {

        if (err) throw err;

        console.log('Base de datos ONLINE');
    })

// Levantar express
server.start(() => {
    console.log(`Servidor corriendo en puerto ${server.port}`);
});

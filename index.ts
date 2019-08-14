import Server from './classes/server';
import mongoose from 'mongoose';

import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import userRoutes from './routes/usuario';
import postRoutes from './routes/post';
import tipoArticulo from "./routes/TipoArticuloRoute";
import articuloSegmentoRoute from "./routes/ArticuloSegmentoRoute";
import articuloRoute from "./routes/ArticuloRoute";
import sectorRoute from "./routes/route/direccion/SectorRoute";
import tipoUsuaroRoute from "./routes/route/persona/TipoUsuarioRoute";
import personaRoute from "./routes/route/persona/PersonaRoute";
import usuarioRoute from "./routes/route/persona/UsuarioRoute";
//import tipoUsuarioPersonaRoute from "./routes/route/persona/TipoUsuarioPersonaRoute";

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
server.app.use('/sector', sectorRoute);
server.app.use('/usuario', usuarioRoute);
server.app.use('/persona', personaRoute);
server.app.use('/articulo', articuloRoute);
server.app.use('/tipoArticulo', tipoArticulo);
server.app.use('/tipoUsuario', tipoUsuaroRoute);
server.app.use('/articuloSegmento', articuloSegmentoRoute);
//server.app.use('/tipoUsuarioPersona', tipoUsuarioPersonaRoute);



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

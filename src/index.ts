import Server from './src/classes/server';
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
import tipoUsuarioPersonaRoute from "./routes/route/persona/TipoUsuarioPersonaRoute";
import solcitudRoute from "./routes/route/mensajeria/SolicitudRoute";
import notificacionRoute from "./routes/route/notificacion/PushNotificationRoute";
import vehiculoRoute from "./routes/route/ruta/VehiculoRoute";
import disponibilidadRoute from "./routes/route/ruta/DisponibilidadRoute";
import estadoRutaRoute from "./routes/route/ruta/EstadoRutaRoute";
import rutaRoute from "./routes/route/ruta/RutaRoute";
import commonRoute from "./routes/route/common/CommonRoute";
import comentarioRoute from "./routes/route/common/CommentItemRoute";
import likeDislikeRoute from "./routes/route/common/LikeDislikeRoute";

const server = new Server();


// Body parser
server.app.use(bodyParser.urlencoded({extended: true}));
server.app.use(bodyParser.json());

server.app.use(cors({origin: true, credentials: true}));
// FileUpload
server.app.use(fileUpload({useTempFiles: true}));


// Rutas de mi app
server.app.use('/ruta', rutaRoute);
server.app.use('/user', userRoutes);
server.app.use('/posts', postRoutes);
server.app.use('/common', commonRoute);
server.app.use('/sector', sectorRoute);
server.app.use('/usuario', usuarioRoute);
server.app.use('/persona', personaRoute);
server.app.use('/articulo', articuloRoute);
server.app.use('/solicitud', solcitudRoute);
server.app.use('/tipoArticulo', tipoArticulo);
server.app.use('/commentario', comentarioRoute);
server.app.use('/likeDislike', likeDislikeRoute);
server.app.use('/tipoUsuario', tipoUsuaroRoute);
server.app.use('/vehiculoRoute', vehiculoRoute);
server.app.use('/notificacion', notificacionRoute);
server.app.use('/estadoRutaRoute', estadoRutaRoute);
server.app.use('/articuloSegmento', articuloSegmentoRoute);
server.app.use('/disponibilidadRoute', disponibilidadRoute);
server.app.use('/tipoUsuarioPersona', tipoUsuarioPersonaRoute);


// Conectar DB
mongoose.connect('mongodb+srv://esyacelga:seya1922@cluster0.ck0re.gcp.mongodb.net/black-cat?retryWrites=true&w=majority',
    {useNewUrlParser: true, useCreateIndex: true}, (err) => {
        if (err) throw err;
        console.log('Base de datos ONLINE');
    })

// Levantar express
server.start(() => {
    console.log(`Servidor corriendo en puerto ${server.port}`);
});

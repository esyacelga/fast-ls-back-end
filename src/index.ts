import Server from './classes/server';
import mongoose from 'mongoose';


import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import userRoutes from './routes/usuario';
import postRoutes from './routes/post';
import rutaRoute from "./routes/route/ruta/RutaRoute";
import commonRoute from "./routes/route/common/CommonRoute";
import usuarioRoute from "./routes/route/persona/UsuarioRoute";
import sectorRoute from "./routes/route/direccion/SectorRoute";
import personaRoute from "./routes/route/persona/PersonaRoute";
import solcitudRoute from "./routes/route/mensajeria/SolicitudRoute";
import articuloRoute from "./routes/ArticuloRoute";
import tipoArticulo from "./routes/TipoArticuloRoute";
import comentarioRoute from "./routes/route/common/CommentItemRoute";
import likeDislikeRoute from "./routes/route/common/LikeDislikeRoute";
import tipoUsuaroRoute from "./routes/route/persona/TipoUsuarioRoute";
import vehiculoRoute from "./routes/route/ruta/VehiculoRoute";
import notificacionRoute from "./routes/route/notificacion/PushNotificationRoute";
import estadoRutaRoute from "./routes/route/ruta/EstadoRutaRoute";
import articuloSegmentoRoute from "./routes/ArticuloSegmentoRoute";
import disponibilidadRoute from "./routes/route/ruta/DisponibilidadRoute";
import tipoUsuarioPersonaRoute from "./routes/route/persona/TipoUsuarioPersonaRoute";
import parametroRoute from "./routes/route/common/parametroRoute";

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
server.app.use('/parametro', parametroRoute);
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

server.app.get('/', (req, res)=>{
    res.send('<h1>Volarys Activo (NODE.js)</h1>')
})

// Conectar DB
mongoose.connect('mongodb://eyacelga:seya1922@localhost:27017/volarysdb',
    {useNewUrlParser: true, useCreateIndex: true}, (err) => {
        if (err) throw err;
        console.log('Base de datos ONLINE');
    })
// Levantar express
server.start(() => {
});

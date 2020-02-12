import {Router} from 'express';
import {
    Actualizar,
    ObtenerIntegrantes,
    ObtenerTodos,
    Registrar,
    RegistrarSolicitud
} from "../../service/ruta/RutaService";

const rutaRoute = Router();


/**
 * Crea un registro
 */
rutaRoute.post('/', Registrar);


rutaRoute.post('/RegistrarSolicitud', RegistrarSolicitud);


rutaRoute.put('/obtenerTodos', ObtenerTodos);


rutaRoute.put('/ObtenerIntegrantes', ObtenerIntegrantes);


rutaRoute.put('/', Actualizar);


export default rutaRoute;

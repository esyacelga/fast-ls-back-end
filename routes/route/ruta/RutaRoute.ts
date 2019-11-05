import {Router} from 'express';
import {Actualizar, ObtenerIntegrantes, ObtenerTodos, Registrar} from "../../service/ruta/RutaService";

const rutaRoute = Router();


/**
 * Crea un registro
 */
rutaRoute.post('/', Registrar);


rutaRoute.put('/obtenerTodos', ObtenerTodos);


rutaRoute.put('/ObtenerIntegrantes', ObtenerIntegrantes);


rutaRoute.put('/', Actualizar);


export default rutaRoute;

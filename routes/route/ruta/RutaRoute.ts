import {Router} from 'express';
import {Actualizar, ObtenerTodos, Registrar} from "../../service/ruta/RutaService";

const rutaRoute = Router();


/**
 * Crea un registro
 */
rutaRoute.post('/', Registrar);


rutaRoute.put('/obtenerTodos', ObtenerTodos);


rutaRoute.put('/', Actualizar);


export default rutaRoute;

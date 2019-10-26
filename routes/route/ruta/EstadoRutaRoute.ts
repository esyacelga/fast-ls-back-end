import {Router} from 'express';
import {Actualizar, ObtenerTodos, Registrar} from "../../service/ruta/EstadoRutaService";

const estadoRutaRoute = Router();


/**
 * Crea un registro
 */
estadoRutaRoute.post('/', Registrar);


estadoRutaRoute.put('/obtenerTodos', ObtenerTodos);


estadoRutaRoute.put('/', Actualizar);


export default estadoRutaRoute;

import {Router} from 'express';
import {Actualizar, ObtenerTodos, Registrar} from "./service/ArticuloService";
import {SubirImagen} from "./service/UploadGenericService";

const articuloRoute = Router();
/**
 * Obtiene todos
 */
articuloRoute.put('/obtenerTodos', ObtenerTodos);

/**
 * Crea un registro
 */
articuloRoute.post('/', Registrar);


/**
 * Actualiza un registro
 */
articuloRoute.put('/', Actualizar);


articuloRoute.post('/upload', SubirImagen);


export default articuloRoute;

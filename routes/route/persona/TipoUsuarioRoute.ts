import {Router} from 'express';
import {Actualizar, ObtenerTodos, Registrar} from "../../service/persona/TipoUsuarioService";

const tipoUsuaroRoute = Router();

/**
 * Obtiene todos
 */
tipoUsuaroRoute.put('/obtenerTodos', ObtenerTodos);

/**
 * Crea un registro
 */
tipoUsuaroRoute.post('/', Registrar);


/**
 * Actualiza un registro
 */
tipoUsuaroRoute.put('/', Actualizar);


export default tipoUsuaroRoute;

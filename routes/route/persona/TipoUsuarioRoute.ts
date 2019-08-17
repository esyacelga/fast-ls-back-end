import {Router} from 'express';
import {Actualizar, ObtenerPorCampoValor, ObtenerTodos, Registrar} from "../../service/persona/TipoUsuarioService";

const tipoUsuaroRoute = Router();

/**
 * Obtiene todos
 */
tipoUsuaroRoute.put('/obtenerTodos', ObtenerTodos);


tipoUsuaroRoute.put('/ObtenerPorCampoValor', ObtenerPorCampoValor);

/**
 * Crea un registro
 */
tipoUsuaroRoute.post('/', Registrar);


/**
 * Actualiza un registro
 */
tipoUsuaroRoute.put('/', Actualizar);


export default tipoUsuaroRoute;

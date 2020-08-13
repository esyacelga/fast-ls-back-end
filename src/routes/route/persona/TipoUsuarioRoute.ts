import {Router} from 'express';
import {
    Actualizar,
    ObtenerPorCampoValor,
    ObtenerPorCodigo,
    ObtenerTodos,
    Registrar
} from "../../service/persona/TipoUsuarioService";

const tipoUsuaroRoute = Router();

/**
 * Obtiene todos
 */
tipoUsuaroRoute.put('/obtenerTodos', ObtenerTodos);

/**
 * Obtiene Tipo Usuario por codigo
 */
tipoUsuaroRoute.put('/ObtenerPorCodigo', ObtenerPorCodigo);


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

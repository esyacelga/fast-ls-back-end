import {Router} from 'express';
import {Actualizar, ObtenerTodos, Registrar} from "../../service/persona/UsuarioService";

const usuarioRoute = Router();

/**
 * Obtiene todos
 */
usuarioRoute.put('/obtenerTodos', ObtenerTodos);

/**
 * Crea un registro
 */
usuarioRoute.post('/', Registrar);


/**
 * Actualiza un registro
 */
usuarioRoute.put('/', Actualizar);


export default usuarioRoute;

import {Router} from 'express';
import {Actualizar, ObtenerTodos, Registrar} from "../../service/persona/TipoUsuarioPersonaService";

const tipoUsuarioPersonaRoute = Router();

/**
 * Obtiene todos
 */
tipoUsuarioPersonaRoute.put('/obtenerTodos', ObtenerTodos);

/**
 * Crea un registro
 */
tipoUsuarioPersonaRoute.post('/', Registrar);


/**
 * Actualiza un registro
 */
tipoUsuarioPersonaRoute.put('/', Actualizar);


export default tipoUsuarioPersonaRoute;

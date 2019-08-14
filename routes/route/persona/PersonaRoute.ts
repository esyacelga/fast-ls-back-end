import {Router} from 'express';
import {Actualizar, ObtenerTodos, Registrar} from "../../service/persona/PersonaService";

const personaRoute = Router();

/**
 * Obtiene todos
 */
personaRoute.put('/obtenerTodos', ObtenerTodos);

/**
 * Crea un registro
 */
personaRoute.post('/', Registrar);


/**
 * Actualiza un registro
 */
personaRoute.put('/', Actualizar);


export default personaRoute;

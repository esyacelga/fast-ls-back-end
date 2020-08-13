import {Router} from 'express';
import {Actualizar, ObtenerPersonaPorId, ObtenerTodos, Registrar} from "../../service/persona/PersonaService";

const personaRoute = Router();

/**
 * Obtiene todos
 */
personaRoute.put('/obtenerTodos', ObtenerTodos);

/**
 * Obtiene la persona por ID
 */
personaRoute.put('/obtenerPersonaPorID', ObtenerPersonaPorId);

/**
 * Crea un registro
 */
personaRoute.post('/', Registrar);


/**
 * Actualiza un registro
 */
personaRoute.put('/', Actualizar);


export default personaRoute;

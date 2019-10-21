import {Router} from 'express';
import {Actualizar, ObtenerDisponibilidad, ObtenerTodos, Registrar} from "../../service/ruta/DisponibilidadService";


const disponibilidadRoute = Router();


/**
 * Crea un registro
 */
disponibilidadRoute.post('/', Registrar);

/**
 * Obtener Todos
 */
disponibilidadRoute.put('/obtenerTodos', ObtenerTodos);

/**
 * Obtener Disponibilidad Persona Usuario
 */
disponibilidadRoute.put('/ObtenerDisponibilidad', ObtenerDisponibilidad);



disponibilidadRoute.put('/', Actualizar);


export default disponibilidadRoute;

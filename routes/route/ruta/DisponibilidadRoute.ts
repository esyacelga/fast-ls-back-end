import {Router} from 'express';
import {Actualizar, ObtenerTodos, Registrar} from "../../service/ruta/DisponibilidadService";


const disponibilidadRoute = Router();


/**
 * Crea un registro
 */
disponibilidadRoute.post('/', Registrar);


disponibilidadRoute.put('/obtenerTodos', ObtenerTodos);


disponibilidadRoute.put('/', Actualizar);


export default disponibilidadRoute;

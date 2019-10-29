import {Router} from 'express';
import {Actualizar, ObtenerTodos, Registrar} from "../../service/ruta/VehiculoService";

const vehiculoRoute = Router();


/**
 * Crea un registro
 */
vehiculoRoute.post('/', Registrar);


vehiculoRoute.put('/obtenerTodos', ObtenerTodos);


vehiculoRoute.put('/', Actualizar);


export default vehiculoRoute;

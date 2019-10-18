import {Router} from 'express';
import {Actualizar, Registrar} from "../../service/ruta/VehiculoService";
import {obtenerTodos} from "../../service/notificacion/PushNotificationService";

const vehiculoRoute = Router();


/**
 * Crea un registro
 */
vehiculoRoute.post('/', Registrar);


vehiculoRoute.put('/obtenerTodos', obtenerTodos);


vehiculoRoute.put('/', Actualizar);


export default vehiculoRoute;

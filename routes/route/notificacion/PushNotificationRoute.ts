import {Router} from 'express';
import {
    actualizarNotificacion,
    enviarNotificacion, enviarNotificacionMasiva,
    obtenerTodos,
    registrarNotificacion
} from "../../service/notificacion/PushNotificationService";

const notificacionRoute = Router();


/**
 * Crea un registro
 */
notificacionRoute.put('/', enviarNotificacion);


notificacionRoute.put('/enviarNotificacionMasiva', enviarNotificacionMasiva);

notificacionRoute.post('/', registrarNotificacion);


notificacionRoute.put('/actualizar', actualizarNotificacion);

notificacionRoute.put('/obtenerTodos', obtenerTodos);


export default notificacionRoute;


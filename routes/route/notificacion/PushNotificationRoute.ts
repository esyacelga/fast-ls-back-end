import {Router} from 'express';
import {
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

notificacionRoute.put('/', obtenerTodos);


export default notificacionRoute;

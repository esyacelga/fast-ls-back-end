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
notificacionRoute.put('/obtenerTodos', obtenerTodos);
notificacionRoute.put('/', enviarNotificacion);
notificacionRoute.post('/', registrarNotificacion);
notificacionRoute.put('/actualizar', actualizarNotificacion);
notificacionRoute.put('/enviarNotificacionMasiva', enviarNotificacionMasiva);

export default notificacionRoute;


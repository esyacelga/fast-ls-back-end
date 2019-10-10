import {Router} from 'express';
import {enviarNotificacion, registrarNotificacion} from "../../service/notificacion/PushNotificationService";

const notificacionRoute = Router();


/**
 * Crea un registro
 */
notificacionRoute.put('/', enviarNotificacion);

notificacionRoute.post('/', registrarNotificacion);


export default notificacionRoute;

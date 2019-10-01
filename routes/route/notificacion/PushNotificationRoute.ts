import {Router} from 'express';
import {enviarNotificacion} from "../../service/notificacion/PushNotificationService";

const notificacionRoute = Router();


/**
 * Crea un registro
 */
notificacionRoute.post('/', enviarNotificacion);


export default notificacionRoute;

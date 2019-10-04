import {Router} from 'express';
import {enviarNotificacion} from "../../service/notificacion/PushNotificationService";

const notificacionRoute = Router();


/**
 * Crea un registro
 */
notificacionRoute.put('/', enviarNotificacion);


export default notificacionRoute;

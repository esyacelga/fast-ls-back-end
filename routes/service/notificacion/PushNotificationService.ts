import {Request, Response} from "express";
import {CommonsMethods} from "../../../commons/CommonsMethods";
import {EnvioNotificacion} from "./classes/EnvioNotificacion";

const util = new CommonsMethods();
export const enviarNotificacion = (req: Request, res: Response) => {
    const data = {
        tittuloNotificacion: req.body.tittuloNotificacion,
        detalleNotificacion: req.body.detalleNotificacion,
        key: req.body.key,
        valor: req.body.valor,
        ruta: req.body.ruta,
    };
    const lstPlayer: string[] = ['d6352214-15ec-4f64-85c6-0ad0a59e2ef2']
    const notificacion = new EnvioNotificacion();
    console.log('Enviando notificacion...');
    notificacion.enviar(data.tittuloNotificacion, data.detalleNotificacion, lstPlayer,'pruebas','pruebas-valor','pruebas-ruta')
    res = util.responceBuscar(req, res, null, data);
}

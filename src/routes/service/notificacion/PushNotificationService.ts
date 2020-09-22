import {Request, Response} from "express";
import {CommonsMethods} from "../../../commons/CommonsMethods";
import {EnvioNotificacion} from "./classes/EnvioNotificacion";
import {obtenerUsuariosNotificacion} from "../persona/TipoUsuarioPersonaService";
import {NotificacionModel} from "../../../models/notificacion/notificacion.model";
import {TipoUsuarioPersona} from "../../../models/persona/TipoUsuarioPersonaModel";
import {Notificador} from "../../../classes/notificacion/Notificador";
import {ModeloTipoUsuarioPersona} from "../../../classes/persona/ModeloTipoUsuarioPersona";
import {DtoNotificacion, NotificacionMensajeClass} from "../../../classes/common/NotificacionMensajeClass";
import {NotificacionMensajeModel} from "../../../models/notificacion/notificacionMensaje.model";
import {ModuloJson} from "../../../push";
import {
    KeyClass,
    ObjSubscripcionClass,
    ObjSubscripcionInterface,
    PushSubscriptionClass
} from "../../../interfaces/ObjSubscripcionInterface";
import {SubscriptionModel} from "../../../models/notificacion/Subscription.model";
// @ts-ignore
import webPuss from 'web-push';

const util = new CommonsMethods();
const vapidKeys = {
    publicKey: 'BMQDf5kB60GNn8ZPXpxJ_AXKpip3pReYB2u4Pnn9clmMj2eu1TX8Yh-Uklc_N68Z-ELhp2SeTvuBRYowNTKQtAs',
    privateKey: '3FRdTfEWZScUpSAVQgE6i4lyxoKVNm4eT20R22LQSj8'
}

webPuss.setVapidDetails(
    'mailto:esyacelga@hotmail.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey
);

export const generarSubscripcion = async (req: Request, res: Response) => {
    const subs: ObjSubscripcionInterface = req.body as ObjSubscripcionInterface;
    const objSubscripcion: ObjSubscripcionClass = new ObjSubscripcionClass(subs.keys.auth, subs.keys.p256dh, subs.endpoint)
    const obj: ObjSubscripcionClass = await SubscriptionModel.create(objSubscripcion) as unknown as ObjSubscripcionClass;
    return util.responceCrear(req, res, null, obj);
}


export const obtenerkey = async (req: Request, res: Response) => {
    let data = ModuloJson.getKey();
    return util.responceBuscar(req, res, null, data);
}


export const enviarNotificiaconPWA = async (titulo: string, mensaje: string) => {
    const lstSubscripciones: ObjSubscripcionClass[] = await SubscriptionModel.find() as unknown as ObjSubscripcionClass[];
    const payLoad = {
        notification: {
            data: {url: 'https://www.youtube.com/watch?v=0vSEmEdYKro&t=580s'},
            title: titulo,
            body: mensaje,
            vibrate: [100, 50, 100]
        }
    }
    if (lstSubscripciones && lstSubscripciones.length > 0)
        for (var i = 0; lstSubscripciones.length > i; i++) {
            const keyObj: KeyClass = new KeyClass(lstSubscripciones[i].auth, lstSubscripciones[i].p256dh)
            const objSubs: PushSubscriptionClass = new PushSubscriptionClass(lstSubscripciones[i].endpoint, keyObj);
            console.log(objSubs);
            await webPuss.sendNotification(objSubs, JSON.stringify(payLoad)).then(() => {
                    //res.status(200).json({message: 'Newsletter sent successfully.'})
                }
            ).catch((error: any) => {
                    if (error.statusCode === 410) {
                        // @ts-ignore
                        SubscriptionModel.deleteOne({'_id': lstSubscripciones[i]._id}, (err) => {
                            console.log('Borrado');
                        });
                    }
                }
            );
        }

}

export const generarPush = async (req: Request, res: Response) => {
    await enviarNotificiaconPWA('Pruebas', 'Holas');
    return util.responceBuscar(req, res, null, 'Enviado');
}

export const pwaPushNotification = async (req: Request, res: Response) => {
    await enviarNotificiaconPWA(req.body.titulo, req.body.mensaje);
    return util.responceBuscar(req, res, null, 'Enviado');
}

/**
 * Método de envío de notificación
 * @param req
 * @param res
 */

export const enviarNotificacion = async (req: Request, res: Response) => {
    const data = {
        tittuloNotificacion: req.body.tittuloNotificacion,
        detalleNotificacion: req.body.detalleNotificacion,
        key: req.body.key,
        valor: req.body.valor,
        grupoUsuarios: req.body.grupoUsuarios
    };
    const lstPlayer: string[] = await obtenerUsuariosNotificacion(data.grupoUsuarios);
    const notificacion = new EnvioNotificacion();
    notificacion.enviar(data.tittuloNotificacion, data.detalleNotificacion, lstPlayer, 'ruta', data.valor, 'main/tabs/config');
    return util.responceBuscar(req, res, null, data);
}

export const obtenerTodos = (req: Request, res: Response) => {
    NotificacionModel.find({}, (error, objeto) => {
        res = util.responceBuscar(req, res, error, objeto);
    }).where('estado').in([1, 2]);
}

export const enviarNotificacionMasiva = async (req: Request, res: Response) => {
    const lstPlayerId: string[] = [];
    const notificacion = new EnvioNotificacion();
    const notificador: Notificador = (await NotificacionModel.findOne().populate('tipoUsuario').where('_id').equals(req.body._id)) as unknown as Notificador;
    if (!notificador) {
        return res = util.responceBuscar(req, res, {message: 'No se encuentra la notificacion'}, notificador);
    }
    const lstTipoUsuarioPersona: ModeloTipoUsuarioPersona[] = (await TipoUsuarioPersona.find().populate('usuario').where('tipoUsuario').equals(notificador.tipoUsuario._id)) as unknown as ModeloTipoUsuarioPersona[];
    if (!lstTipoUsuarioPersona) {
        return res = util.responceBuscar(req, res, {message: 'No se existen player ids'}, notificador);
    }
    for (const dato of lstTipoUsuarioPersona) {
        if (dato.usuario.playerId !== '' && dato.usuario.playerId !== null) {
            lstPlayerId.push(dato.usuario.playerId);
        }
    }
    let obj: DtoNotificacion = {
        created: new Date(),
        tipoNotificacion: 2,
        idSegmento: notificador.titulo,
        mensaje: notificador.mensajeTitulo,
        nombreSegmento: notificador.keyPayload,
        estado: true
    };
    NotificacionMensajeModel.create(obj);
    NotificacionModel.findByIdAndUpdate(req.body._id, {estado: 2}, {new: true}, (err, userDB) => {
        res = util.responceCrear(req, res, err, userDB);
        notificacion.enviar(notificador.titulo, notificador.mensajeTitulo, lstPlayerId, 'ruta', notificador.keyPayload, 'main/tabs/config');
    });
    return res;
}

export const registrarNotificacion = async (req: Request, res: Response) => {
    const data = {
        titulo: req.body.titulo,
        mensajeTitulo: req.body.mensajeTitulo,
        key: req.body.key,
        keyPayload: req.body.keyPayload,
        tipoUsuario: req.body.tipoUsuario,
        estado: 1,
        created: new Date()
    };
    NotificacionModel.create(data, (err: any, objeto: any) => {
        res = util.responceCrear(req, res, err, objeto);
    });
}

export const registrarNotificacionSimple = async (req: Request, res: Response) => {
    const data: NotificacionMensajeClass = req.body as NotificacionMensajeClass;
    const resultado: NotificacionMensajeClass = (await NotificacionMensajeModel.create(data)) as unknown as NotificacionMensajeClass;
    util.responceCrear(req, res, null, resultado);
}


export const enviarNotificacionSimple = async (req: Request, res: Response) => {
    const lstPlayerId: string[] = [];
    const notificacion = new EnvioNotificacion();
    const data: NotificacionMensajeClass = req.body as NotificacionMensajeClass;
    lstPlayerId.push(data.playerId);
    notificacion.enviar(data.idSegmento, data.mensaje, lstPlayerId, 'ruta', data.nombreSegmento, 'main/tabs/config');
    util.responceCrear(req, res, null, notificacion);
}

export const actualizarNotificacion = async (req: Request, res: Response) => {
    const data = {
        titulo: req.body.titulo,
        mensajeTitulo: req.body.mensajeTitulo,
        key: req.body.key,
        keyPayload: req.body.keyPayload,
        tipoUsuario: req.body.tipoUsuario,
        estado: req.body.estado,
        created: new Date()
    };
    NotificacionModel.findByIdAndUpdate(req.body._id, data, {new: true}, (err, userDB) => {
        res = util.responceCrear(req, res, err, userDB);
    });
}

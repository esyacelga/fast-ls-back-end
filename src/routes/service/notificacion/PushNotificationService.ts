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

const util = new CommonsMethods();
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

import {Request, Response} from "express";
import {CommonsMethods} from "../../../commons/CommonsMethods";
import {EnvioNotificacion} from "./classes/EnvioNotificacion";
import {obtenerUsuariosNotificacion} from "../persona/TipoUsuarioPersonaService";
import {NotificacionModel} from "../../../models/notificacion/notificacion.model";
import {TipoUsuarioPersona} from "../../../models/persona/TipoUsuarioPersonaModel";
import {Notificador} from "../../../classes/notificacion/Notificador";
import {ModeloTipoUsuarioPersona} from "../../../classes/persona/ModeloTipoUsuarioPersona";

const util = new CommonsMethods();
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
    console.log('Enviando notificacion...');
    console.log(lstPlayer);
    notificacion.enviar(data.tittuloNotificacion, data.detalleNotificacion, lstPlayer, data.key, data.valor, '');
    res = util.responceBuscar(req, res, null, data);
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
    if (!notificador){
       return res = util.responceBuscar(req, res, {message:'No se encuentra la notificacion'}, notificador);
    }
    const lstTipoUsuarioPersona: ModeloTipoUsuarioPersona[] = (await TipoUsuarioPersona.find().populate('usuario').where('tipoUsuario').equals(notificador.tipoUsuario._id)) as unknown as ModeloTipoUsuarioPersona[];
    if (!lstTipoUsuarioPersona){
        return res = util.responceBuscar(req, res, {message:'No se existen player ids'}, notificador);
    }
    for (const dato of lstTipoUsuarioPersona) {
        if (dato.usuario.playerId !== '' && dato.usuario.playerId !== null) {
            lstPlayerId.push(dato.usuario.playerId);
        }
    }

    NotificacionModel.findByIdAndUpdate(req.body._id, {estado:2}, {new: true}, (err, userDB) => {
        res = util.responceCrear(req, res, err, userDB);
        notificacion.enviar(notificador.titulo, notificador.mensajeTitulo, lstPlayerId, notificador.key, notificador.keyPayload, '');
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
    console.log(data);
    NotificacionModel.findByIdAndUpdate(req.body._id, data, {new: true}, (err, userDB) => {
        res = util.responceCrear(req, res, err, userDB);
    });
}

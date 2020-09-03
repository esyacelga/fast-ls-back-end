import {Request, Response} from "express";
import {CommonsMethods} from "../../../commons/CommonsMethods";
import {ItemComment} from "./class/ItemComment";
import {ItemComentarioModel} from "../../../models/common/ItemComentarioModel";
import {ArticuloClass, ArticuloDto} from "../../../classes/mensajeria/ArticuloDto";
import {Articulo} from "../../../models/mensajeria/ArticuloModel";
import {
    NotificacionMensajeClass,
    NotificacionMensajeDto,
    NotificacionMensajeInterface
} from "../../../classes/common/NotificacionMensajeClass";
import {NotificacionMensajeModel} from "../../../models/notificacion/notificacionMensaje.model";

const util = new CommonsMethods();


export const IngresarComentario = async (req: Request, res: Response) => {
    const objetoComentarioArticulo: ItemComment = req.body as ItemComment;
    const result: ItemComment = (await ItemComentarioModel.create(objetoComentarioArticulo) as unknown as ItemComment);
    const objComentario = await actualizarConteoComentario(objetoComentarioArticulo.articulo);
    const objArticulo: ArticuloClass = (await Articulo.findOne().populate('articuloSegmento').where('_id').equals(objComentario._id) as unknown as ArticuloClass);
    const objNotificacion = new NotificacionMensajeClass(
        result.articulo, result.persona, 0,
        result.comentario, result.persona, false, false,
        objArticulo.articuloSegmento._id, objArticulo.articuloSegmento.descripcion);
    NotificacionMensajeModel.create(objNotificacion);
    result.articulo = objComentario;
    return util.responceCrear(req, res, null, result);
}


export const ObtenerTodosNotificaciones = async (req: Request, res: Response) => {
    const lstNotificacion: NotificacionMensajeInterface [] = (await NotificacionMensajeModel.find().populate('articulo').populate('persona').populate('personaPrivado').sort({created: -1}) as unknown as NotificacionMensajeInterface []);
    const lstNotificacionDto: NotificacionMensajeDto[] = [];
    for (const objNotificacion of lstNotificacion) {
        let mensajeTitulo = '';
        if (objNotificacion.tipoNotificacion === 0)
            mensajeTitulo = ' ha enviado un comentario  ';

        let estadoExperiencia: boolean = false;
        if (objNotificacion.tipoNotificacion === 1 && objNotificacion.like) {
            mensajeTitulo = ' indica que tubo una experiencia positiva';
            estadoExperiencia = true;
        }

        if (objNotificacion.tipoNotificacion === 1 && objNotificacion.dislike) {
            mensajeTitulo = ' indica que tubo una experiencia negativa  ';
            estadoExperiencia = false;
        }

        const notificacion: NotificacionMensajeDto = new NotificacionMensajeDto(objNotificacion._id,
            objNotificacion.persona.displayName, objNotificacion.persona.picture, mensajeTitulo,
            objNotificacion.mensaje, objNotificacion.personaPrivado._id, objNotificacion.tipoNotificacion,
            objNotificacion.articulo.portada, objNotificacion.idSegmento, objNotificacion.nombreSegmento, estadoExperiencia);
        lstNotificacionDto.push(notificacion);
    }
    return util.responceBuscar(req, res, null, lstNotificacionDto);
}


export const EliminarComentario = async (req: Request, res: Response) => {
    const objetoComentarioArticulo: ItemComment = req.body as ItemComment;
    (await ItemComentarioModel.deleteOne(objetoComentarioArticulo) as unknown as ItemComment);
    return util.responceCrear(req, res, null, '');
}


export const ObtenerComentariosPorArticulo = (req: Request, res: Response) => {
    const objetoArticulo: ArticuloDto = req.body as ArticuloDto;
    ItemComentarioModel.find({}, (error, respuesta) => {
        return util.responceBuscar(req, res, error, respuesta);
    }).where('articulo').populate('persona').equals(objetoArticulo._id).sort({creacionFecha: -1});
}


async function actualizarConteoComentario(articulo: ArticuloDto) {
    const lst: ItemComment[] = await ItemComentarioModel.find({articulo: articulo._id}) as unknown as ItemComment[];
    articulo.conteoComentarios = lst.length;
    await Articulo.findByIdAndUpdate(articulo._id, articulo);
    const art: ArticuloDto = (await Articulo.findOne().where('_id').equals(articulo._id) as unknown as ArticuloDto);
    return art;
}

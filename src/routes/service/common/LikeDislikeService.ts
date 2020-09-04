import {Request, Response} from "express";
import {CommonsMethods} from "../../../commons/CommonsMethods";
import {LikeDislike} from "./class/LikeDislike";
import {LikeDislikeModel} from "../../../models/common/LikeDislikeModel";
import {ArticuloClass, ArticuloDto} from "../../../classes/mensajeria/ArticuloDto";
import * as _ from 'underscore';
import {Articulo} from "../../../models/mensajeria/ArticuloModel";
import {NotificacionMensajeClass} from "../../../classes/common/NotificacionMensajeClass";
import {NotificacionMensajeModel} from "../../../models/notificacion/notificacionMensaje.model";

const util = new CommonsMethods();


export const IngresarLike = (req: Request, res: Response) => {
    const objetoLikeDislike: LikeDislike = req.body as LikeDislike;
    let result: LikeDislike;
    objetoLikeDislike.modificacionFecha = new Date();
    LikeDislikeModel.findOne({}, async (error, objeto: LikeDislike) => {
        if (objeto && objeto._id) {
            result = (await LikeDislikeModel.findByIdAndUpdate(objeto._id, objetoLikeDislike) as unknown as LikeDislike);
        } else {
            result = (await LikeDislikeModel.create(objetoLikeDislike) as unknown as LikeDislike);
        }
        const objArticulo: ArticuloClass = (await Articulo.findOne().populate('articuloSegmento').where('_id').equals(result.articulo._id) as unknown as ArticuloClass);
        if (result.like === true) {
            const objNotificacion = new NotificacionMensajeClass(result.articulo, result.persona, 1, 'NULL', true, false, objArticulo.articuloSegmento._id, objArticulo.articuloSegmento.descripcion, '');
            NotificacionMensajeModel.create(objNotificacion);
        } else {
            const objNotificacion = new NotificacionMensajeClass(result.articulo, result.persona, 1, 'NULL', false, true, objArticulo.articuloSegmento._id, objArticulo.articuloSegmento.descripcion, '');
            NotificacionMensajeModel.create(objNotificacion);
        }
        const obj = await actualizarConteoLikeDislike(objetoLikeDislike.articulo);
        result.articulo = obj;
        return res = util.responceActualizar(req, res, null, result);
    }).where('persona').equals(objetoLikeDislike.persona._id)
        .where('articulo').equals(objetoLikeDislike.articulo._id);

}

async function actualizarConteoLikeDislike(articulo: ArticuloDto) {
    const lstLikeDislike: LikeDislike[] = await LikeDislikeModel.find({articulo: articulo._id}) as unknown as LikeDislike[];
    const lstLike = _.where(lstLikeDislike, {like: true})
    const lstDislike = _.where(lstLikeDislike, {like: false})
    articulo.conteoDisLike = lstDislike.length;
    articulo.conteoLike = lstLike.length;
    await Articulo.findByIdAndUpdate(articulo._id, articulo);
    const art: ArticuloDto = (await Articulo.findOne().where('_id').equals(articulo._id) as unknown as ArticuloDto);
    return art;
}

/*
export const ObtenerComentariosPorArticulo = (req: Request, res: Response) => {
    const objetoArticulo: ArticuloDto = req.body as ArticuloDto;
    ItemComentarioModel.find({}, (error, respuesta) => {
        return util.responceBuscar(req, res, error, respuesta);
    }).where('articulo').populate('persona').equals(objetoArticulo._id).sort({creacionFecha: -1});
}
*/




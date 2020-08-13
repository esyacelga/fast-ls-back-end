import {Request, Response} from "express";
import {CommonsMethods} from "../../../commons/CommonsMethods";
import {ItemComment} from "./class/ItemComment";
import {ItemComentarioModel} from "../../../models/common/ItemComentarioModel";
import {ArticuloDto} from "../../../classes/mensajeria/ArticuloDto";

const util = new CommonsMethods();


export const IngresarComentario = async (req: Request, res: Response) => {
    const objetoComentarioArticulo: ItemComment = req.body as ItemComment;
    const result: ItemComment = (await ItemComentarioModel.create(objetoComentarioArticulo) as unknown as ItemComment);
    return util.responceCrear(req, res, null, result);
}


export const ObtenerComentariosPorArticulo = (req: Request, res: Response) => {
    const objetoArticulo: ArticuloDto = req.body as ArticuloDto;
    ItemComentarioModel.find({}, (error, respuesta) => {
        return util.responceBuscar(req, res, error, respuesta);
    }).where('articulo').populate('persona').equals(objetoArticulo._id).sort({creacionFecha: -1});
}




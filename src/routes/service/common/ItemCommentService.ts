import {Request, Response} from "express";
import {CommonsMethods} from "../../../commons/CommonsMethods";
import {ItemComment} from "./class/ItemComment";
import {ItemComentarioModel} from "../../../models/common/ItemComentarioModel";
import {ArticuloDto} from "../../../src/classes/mensajeria/ArticuloDto";
import {Articulo} from "../../../models/mensajeria/ArticuloModel";

const util = new CommonsMethods();


export const IngresarComentario = async (req: Request, res: Response) => {
    const objetoComentarioArticulo: ItemComment = req.body as ItemComment;
    const result: ItemComment = (await ItemComentarioModel.create(objetoComentarioArticulo) as unknown as ItemComment);
    const objComentario = await actualizarConteoComentario(objetoComentarioArticulo.articulo);
    result.articulo = objComentario;
    console.log(result.articulo);
    return util.responceCrear(req, res, null, result);
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

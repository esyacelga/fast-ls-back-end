import {CommonsMethods} from "../../commons/CommonsMethods";
import {Request, Response} from "express";
import {ArticuloSegmento} from "../../models/mensajeria/ArticuloSegmentoModel";
import {ArticuloSegmentoInterface} from "../../classes/interface/inventario/ArticuloSegmentoInterface";

const util = new CommonsMethods();

export const ObtenerTodosArticuloSegmento = (req: Request, res: Response) => {
    ArticuloSegmento.find({}, (error, objeto) => {
        res = util.responceBuscar(req, res, error, objeto);
    }).populate('tipoArticulo').where('estado').equals(1);
}


export const ObtenerSegmentoPortTipoArticulo = (req: Request, res: Response) => {
    var body = req.body;
    ArticuloSegmento.find({}, (error, objeto) => {
        res = util.responceBuscar(req, res, error, objeto);
    }).where('tipoArticulo').equals(body.tipoArticulo);
}


export const RegistrarArticuloSegmento = (req: Request, res: Response) => {
    const data: ArticuloSegmentoInterface = req.body as ArticuloSegmentoInterface;
    data.estado = 1;
    ArticuloSegmento.create(data, (err: any, objeto: any) => {
        res = util.responceCrear(req, res, err, objeto);
    });
}

export const ActualizarArticuloSegmento = (req: Request, res: Response) => {
    const data: ArticuloSegmentoInterface = req.body as ArticuloSegmentoInterface;
    ArticuloSegmento.findByIdAndUpdate(req.body._id, data, {new: true}, (err, userDB) => {
        res = util.responceGuardar(req, res, err, userDB);
    });
};

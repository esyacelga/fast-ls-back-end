import {CommonsMethods} from "../../commons/CommonsMethods";
import {Request, Response} from "express";
import {ArticuloSegmento} from "../../models/mensajeria/ArticuloSegmentoModel";

const util = new CommonsMethods();

export const ObtenerTodosArticuloSegmento = (req: Request, res: Response) => {
    var body = req.body;
    ArticuloSegmento.find({}, (error, objeto) => {
        res = util.responceBuscar(req, res, error, objeto);
    }).where('estado').equals(1);
}


export const RegistrarArticuloSegmento = (req: Request, res: Response) => {
    const data = {
        tipoArticulo: req.body.tipoArticulo,
        descripcion: req.body.descripcion,
        estado: req.body.estado
    };
    ArticuloSegmento.create(data, (err: any, objeto: any) => {
        res = util.responceCrear(req, res, err, objeto);
    });
}

export const ActualizarArticuloSegmento = (req: Request, res: Response) => {
    const tipoArt = {
        tipoArticulo: req.body.tipoArticulo,
        descripcion: req.body.descripcion,
        estado: req.body.estado,
    }
    ArticuloSegmento.findByIdAndUpdate(req.body._id, tipoArt, {new: true}, (err, userDB) => {
        res = util.responceGuardar(req, res, err, userDB);
    });
};

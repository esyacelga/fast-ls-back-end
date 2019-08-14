import {Request, Response} from "express";
import {CommonsMethods} from "../../../commons/CommonsMethods";
import {Sector} from "../../../models/direccion/SectorModel";

const util = new CommonsMethods();

export const ObtenerSectores = (req: Request, res: Response) => {
    var body = req.body;
    Sector.find({}, (error, objeto) => {
        res = util.responceBuscar(req, res, error, objeto);
    }).where('estado').equals(1);
}


export const Registrar = (req: Request, res: Response) => {
    const data = {
        descripcion: req.body.descripcion,
        estado: req.body.estado
    };
    Sector.create(data, (err: any, objeto: any) => {
        res = util.responceCrear(req, res, err, objeto);
    });
}

export const Actualizar = (req: Request, res: Response) => {
    const tipoArt = {
        descripcion: req.body.descripcion,
        estado: req.body.estado,
    }
    Sector.findByIdAndUpdate(req.body._id, tipoArt, {new: true}, (err, userDB) => {
        res = util.responceGuardar(req, res, err, userDB);
    });
};

/*

export const eliminar
(req: Request, res: Response)
{
    var id = req.params.id;
    TipoArticulo.findOneAndDelete(id, (err, objeto) => {
        res = util.responceEliminar(req, res, err, objeto);
    });
}
*/



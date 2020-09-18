import {TipoArticulo} from "../../models/mensajeria/TipoArticulo";
import {CommonsMethods} from "../../commons/CommonsMethods";
import {Request, Response} from "express";

const util = new CommonsMethods();

export const ObtenerTodos = (req: Request, res: Response) => {
    TipoArticulo.find({}, (error, objeto) => {
        res = util.responceBuscar(req, res, error, objeto);
    }).where('estado').equals(1).sort({codigo: 1});
}


export const RegistrarTipoArticulo = (req: Request, res: Response) => {
    const data = {
        nombre: req.body.nombre,
        codigo: req.body.codigo,
        descripcion: req.body.descripcion,
        estado: req.body.estado
    };
    TipoArticulo.create(data, (err: any, objeto: any) => {
        res = util.responceCrear(req, res, err, objeto);
    });
}

export const ActualizarTipoArticulo = (req: Request, res: Response) => {
    const tipoArt = {
        nombre: req.body.nombre,
        codigo: req.body.codigo,
        descripcion: req.body.descripcion,
        estado: req.body.estado,
    }
    TipoArticulo.findByIdAndUpdate(req.body._id, tipoArt, {new: true}, (err, userDB) => {
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



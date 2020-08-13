import {Request, Response} from "express";
import {CommonsMethods} from "../../../commons/CommonsMethods";
import {EstadoRutaModeloPersistencia} from "../../../models/ruta/EstadoRutaModeloPersistencia";

const util = new CommonsMethods();

export const ObtenerTodos = (req: Request, res: Response) => {
    EstadoRutaModeloPersistencia.find({}, (error, objeto) => {
        res = util.responceBuscar(req, res, error, objeto);
    });
}


export const Registrar = (req: Request, res: Response) => {
    const data = {
        nombre: req.body.nombre.toUpperCase(),
        codigo: req.body.codigo.toUpperCase(),
        color: req.body.color,
        estado: req.body.estado,
    };
    EstadoRutaModeloPersistencia.create(data, (err: any, objeto: any) => {
        res = util.responceCrear(req, res, err, objeto);
    });
}

export const Actualizar = (req: Request, res: Response) => {
    const data = {
        nombre: req.body.nombre.toUpperCase(),
        codigo: req.body.codigo.toUpperCase(),
        color: req.body.color,
        estado: req.body.estado,
    };
    EstadoRutaModeloPersistencia.findByIdAndUpdate(req.body._id, data, {new: true}, (err, userDB) => {
        res = util.responceGuardar(req, res, err, userDB);
    });
};


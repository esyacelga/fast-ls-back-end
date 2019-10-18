import {Request, Response} from "express";
import {CommonsMethods} from "../../../commons/CommonsMethods";
import {VehiculoModeloPersistencia} from "../../../models/ruta/VehiculoModeloPersistencia";

const util = new CommonsMethods();

export const ObtenerTodos = (req: Request, res: Response) => {
    VehiculoModeloPersistencia.find({}, (error, objeto) => {
        res = util.responceBuscar(req, res, error, objeto);
    });
}


export const Registrar = (req: Request, res: Response) => {
    const data = {
        modelo: req.body.modelo,
        placa: req.body.placa,
        marca: req.body.marca,
        tipo: req.body.tipo,
        estado: req.body.estado
    };
    data.placa = data.placa.toUpperCase();
    data.marca = data.marca.toUpperCase();
    data.tipo = data.tipo.toUpperCase();
    VehiculoModeloPersistencia.create(data, (err: any, objeto: any) => {
        res = util.responceCrear(req, res, err, objeto);
    });
}

export const Actualizar = (req: Request, res: Response) => {
    const data = {
        modelo: req.body.modelo,
        placa: req.body.placa,
        marca: req.body.marca,
        tipo: req.body.tipo,
        estado: req.body.estado
    };
    VehiculoModeloPersistencia.findByIdAndUpdate(req.body._id, data, {new: true}, (err, userDB) => {
        res = util.responceGuardar(req, res, err, userDB);
    });
};


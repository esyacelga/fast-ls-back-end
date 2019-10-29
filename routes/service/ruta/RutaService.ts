import {Request, Response} from "express";
import {CommonsMethods} from "../../../commons/CommonsMethods";
import {RutaModeloPersistencia} from "../../../models/ruta/RutaModeloPersistencia";
import {RutaDto} from "../../../classes/ruta/RutaDto";

const util = new CommonsMethods();


export const ObtenerTodos = (req: Request, res: Response) => {
    RutaModeloPersistencia.find({}, (error, objeto) => {
        res = util.responceBuscar(req, res, error, objeto);
    });
}


export const Registrar = (req: Request, res: Response) => {
    const data: RutaDto = req.body as RutaDto;
    RutaModeloPersistencia.create(data, (err: any, objeto: any) => {
        res = util.responceCrear(req, res, err, objeto);
    });
}

export const Actualizar = (req: Request, res: Response) => {
    const data: RutaDto = req.body as RutaDto;
    RutaModeloPersistencia.findByIdAndUpdate(req.body._id, data, {new: true}, (err, userDB) => {
        res = util.responceGuardar(req, res, err, userDB);
    });
};


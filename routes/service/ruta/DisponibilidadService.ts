import {Request, Response} from "express";
import {CommonsMethods} from "../../../commons/CommonsMethods";
import {DisponibilidadModeloPersistencia} from "../../../models/ruta/DisponibilidadModeloPersistencia";

const util = new CommonsMethods();

export const ObtenerTodos = (req: Request, res: Response) => {
    DisponibilidadModeloPersistencia.find({}, (error, objeto) => {
        res = util.responceBuscar(req, res, error, objeto);
    });
}


export const Registrar = (req: Request, res: Response) => {
    const data = {
        nombreAlias: req.body.nombreAlias,
        tipoUsuarioPersona: req.body.tipoUsuarioPersona,
        vehiculo: req.body.vehiculo,
        numeroTurno: req.body.numeroTurno,
        enTurno: req.body.enTurno,
        estadoDiponibilidad: req.body.estadoDiponibilidad
    };
    const disp = DisponibilidadModeloPersistencia.findOne().sort({'numeroTurno': -1}).where('estadoDiponibilidad').equals(true);
    if (!disp) {
        data.numeroTurno = 1
    } else {
        // @ts-ignore
        data.numeroTurno = disp.numeroTurno + 1
    }
    console.log(data);
    DisponibilidadModeloPersistencia.create(data, (err: any, objeto: any) => {
        res = util.responceCrear(req, res, err, objeto);
    });
}

export const Actualizar = (req: Request, res: Response) => {
    const data = {
        tipoUsuarioPersona: req.body.tipoUsuarioPersona,
        vehiculo: req.body.vehiculo,
        numeroTurno: req.body.numeroTurno,
        enTurno: req.body.enTurno,
        estadoDiponibilidad: req.body.estadoDiponibilidad
    };
    DisponibilidadModeloPersistencia.findByIdAndUpdate(req.body._id, data, {new: true}, (err, userDB) => {
        res = util.responceGuardar(req, res, err, userDB);
    });
};


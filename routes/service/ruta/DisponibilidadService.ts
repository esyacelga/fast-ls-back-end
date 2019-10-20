import {Request, Response} from "express";
import {CommonsMethods} from "../../../commons/CommonsMethods";
import {DisponibilidadModeloPersistencia} from "../../../models/ruta/DisponibilidadModeloPersistencia";
import {ModeloDisponibilidad} from "../../../classes/ruta/ModeloDisponibilidad";

const util = new CommonsMethods();

export const ObtenerTodos = (req: Request, res: Response) => {
    DisponibilidadModeloPersistencia.find({}, (error, objeto) => {
        res = util.responceBuscar(req, res, error, objeto);
    }).populate('tipoUsuarioPersona').populate('vehiculo');
}

export const Registrar = async (req: Request, res: Response) => {
    const objDisponibilidad: ModeloDisponibilidad = req.body as ModeloDisponibilidad;
    const disp: ModeloDisponibilidad = <ModeloDisponibilidad><unknown>(await DisponibilidadModeloPersistencia.findOne().sort({'numeroTurno': -1}).where('estadoDiponibilidad').equals(true));
    if (!disp) {
        objDisponibilidad.numeroTurno = 1
    } else {
        objDisponibilidad.numeroTurno = disp.numeroTurno + 1
    }
    objDisponibilidad.nombreAlias = objDisponibilidad.nombreAlias.toUpperCase();
    DisponibilidadModeloPersistencia.create(objDisponibilidad, (err: any, objeto: any) => {
        res = util.responceCrear(req, res, err, objeto);
    });
}

export const Actualizar = (req: Request, res: Response) => {
    const data = {
        tipoUsuarioPersona: req.body.tipoUsuarioPersona,
        vehiculo: req.body.vehiculo,
        numeroTurno: req.body.numeroTurno,
        enTurno: req.body.enTurno,
        nombreAlias:req.body.nombreAlias,
        estadoDiponibilidad: req.body.estadoDiponibilidad
    };
    data.nombreAlias = data.nombreAlias.toUpperCase();
    DisponibilidadModeloPersistencia.findByIdAndUpdate(req.body._id, data, {new: true}, (err, userDB) => {
        res = util.responceGuardar(req, res, err, userDB);
    });
};


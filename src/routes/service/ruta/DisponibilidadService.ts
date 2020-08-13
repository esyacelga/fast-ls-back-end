import {Request, Response} from "express";
import {CommonsMethods} from "../../../commons/CommonsMethods";
import {DisponibilidadModeloPersistencia} from "../../../models/ruta/DisponibilidadModeloPersistencia";
import {ModeloDisponibilidad} from "../../../classes/ruta/ModeloDisponibilidad";
import {TipoUsuarioPersona} from "../../../models/persona/TipoUsuarioPersonaModel";
import {TipoUsuario} from "../../../models/persona/TipoUsuarioModel";
import {ModeloTipoUsuario, ModeloTipoUsuarioPersona} from "../../../classes/persona/ModeloTipoUsuarioPersona";
import {isNullOrUndefined} from "util";

const util = new CommonsMethods();

export const ObtenerTodos = (req: Request, res: Response) => {
    DisponibilidadModeloPersistencia.find({}, (error, objeto) => {
        res = util.responceBuscar(req, res, error, objeto);
    }).populate('tipoUsuarioPersona').populate('vehiculo');
}

export const ObtenerDisponibilidad = async (req: Request, res: Response) => {
    const objTipoUsuario: ModeloTipoUsuario = (await TipoUsuario.findOne().where('codigo').equals('CHOFER')) as ModeloTipoUsuario;

    if(isNullOrUndefined(objTipoUsuario)){
        res = util.responceBuscar(req, res, null, null);
        return;
    }


    const lstTipoUsuarioPersona: ModeloTipoUsuarioPersona[] = (await TipoUsuarioPersona.find().populate('usuario').populate('persona').where('tipoUsuario').equals(objTipoUsuario._id)) as unknown as ModeloTipoUsuarioPersona[];
    if(isNullOrUndefined(lstTipoUsuarioPersona)){
        res = util.responceBuscar(req, res, null, null);
        return;
    }

    let lstDisponibilidad: ModeloDisponibilidad[]=[];
    try {
        lstDisponibilidad  = (await DisponibilidadModeloPersistencia.find().populate('estadoDiponibilidad').populate('tipoUsuarioPersona').populate('vehiculo').where('enTurno').equals(true).sort({'numeroTurno':-1})) as unknown as ModeloDisponibilidad[];
        if(isNullOrUndefined(lstTipoUsuarioPersona)){
            res = util.responceBuscar(req, res, null, null);
            return;
        }
    }
    catch (e) {
        res = util.responceBuscar(req, res, {message:e}, null);
        return;
    }



    for (let item of lstDisponibilidad) {
        for (let tups of lstTipoUsuarioPersona) {
            if (item.tipoUsuarioPersona._id.toString() == tups._id.toString()) {
                item.tipoUsuarioPersona.persona = tups.persona;
                item.tipoUsuarioPersona.usuario = tups.usuario;
            }
        }
    }
    return util.responceBuscar(req, res, null, lstDisponibilidad);

}

export const Registrar = async (req: Request, res: Response) => {
    const objDisponibilidad: ModeloDisponibilidad = req.body as ModeloDisponibilidad;
    const disp: ModeloDisponibilidad = <ModeloDisponibilidad><unknown>(await DisponibilidadModeloPersistencia.findOne().sort({'numeroTurno': -1}).where('estadoDiponibilidad').equals(objDisponibilidad.estadoDiponibilidad._id));
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
        nombreAlias: req.body.nombreAlias,
        estadoDiponibilidad: req.body.estadoDiponibilidad
    };
    data.nombreAlias = data.nombreAlias.toUpperCase();
    DisponibilidadModeloPersistencia.findByIdAndUpdate(req.body._id, data, {new: true}, (err, userDB) => {
        res = util.responceGuardar(req, res, err, userDB);
    });
};


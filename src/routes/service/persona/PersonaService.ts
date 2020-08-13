import {Request, Response} from "express";
import {CommonsMethods} from "../../../commons/CommonsMethods";
import {PersonaModeloPersistencia} from "../../../models/persona/PersonaModel";
import {PersonaModeloPersistenciaLog} from "../../../models/persona/PersonaModelLog";

const util = new CommonsMethods();

export const ObtenerTodos = (req: Request, res: Response) => {
    PersonaModeloPersistencia.find({}, (error, objeto) => {
        res = util.responceBuscar(req, res, error, objeto);
    });
}

export const ObtenerPersonaPorId = (req: Request, res: Response) => {
    PersonaModeloPersistencia.findOne({}, (error, objeto) => {
        res = util.responceBuscar(req, res, error, objeto);
    }).where('_id').equals(req.body.idPersona);
}


export const Registrar = (req: Request, res: Response) => {
    const data = {
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        identificacion: req.body.identificacion,
        correo: req.body.correo,
        sector: req.body.sector,
        fechaNacimiento: req.body.fechaNacimiento,
        fechaCreacion: new Date(),
        fechaModificacion: new Date(),
    };
    PersonaModeloPersistencia.create(data, (err: any, objeto: any) => {
        res = util.responceCrear(req, res, err, objeto);
    });
}

export const Actualizar = (req: Request, res: Response) => {
    const data = {
        nombres: req.body.nombres,
        apellidos: req.body.apellidos,
        identificacion: req.body.identificacion,
        correo: req.body.correo,
        sector: req.body.sector,
        fechaNacimiento: req.body.fechaNacimiento,
        numeroTelefonoCelular: req.body.numeroTelefonoCelular,
        numeroTelefonoConvencional: req.body.numeroTelefonoConvencional,
        fechaModificacion: new Date(),
    };
    PersonaModeloPersistencia.findOne({}, (error, objeto:any) => {
        const dataLog = {
            nombres: objeto.nombres,
            apellidos: objeto.apellidos,
            identificacion: objeto.identificacion,
            correo: objeto.correo,
            sector: objeto.sector,
            fechaNacimiento: objeto.fechaNacimiento,
            numeroTelefonoCelular: objeto.numeroTelefonoCelular,
            numeroTelefonoConvencional: objeto.numeroTelefonoConvencional,
            fechaModificacion: new Date(),
        };
        PersonaModeloPersistenciaLog.create(dataLog, (err: any, objetoRespuesta: any) => {
            console.log(objetoRespuesta);
        });
    }).where('_id').equals(req.body._id);
    PersonaModeloPersistencia.findByIdAndUpdate(req.body._id, data, {new: true}, (err, userDB) => {
        res = util.responceGuardar(req, res, err, userDB);
    });

};


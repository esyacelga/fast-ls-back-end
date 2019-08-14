import {Request, Response} from "express";
import {CommonsMethods} from "../../../commons/CommonsMethods";
import {Persona} from "../../../models/persona/PersonaModel";

const util = new CommonsMethods();

export const ObtenerTodos = (req: Request, res: Response) => {
    var body = req.body;
    Persona.find({}, (error, objeto) => {
        res = util.responceBuscar(req, res, error, objeto);
    });
}


export const Registrar = (req: Request, res: Response) => {
    const data = {
        primerNombre: req.body.primerNombre,
        segundoNombre: req.body.segundoNombre,
        primerApellido: req.body.primerApellido,
        segundoApellido: req.body.segundoApellido,
        cedula: req.body.cedula,
        sector: req.body.sector,
        fechaNacimiento: req.body.fechaNacimiento,
        descripcion: req.body.descripcion
    };
    Persona.create(data, (err: any, objeto: any) => {
        res = util.responceCrear(req, res, err, objeto);
    });
}

export const Actualizar = (req: Request, res: Response) => {
    const data = {
        primerNombre: req.body.primerNombre,
        segundoNombre: req.body.segundoNombre,
        primerApellido: req.body.primerApellido,
        segundoApellido: req.body.segundoApellido,
        cedula: req.body.cedula,
        sector: req.body.sector,
        fechaNacimiento: req.body.fechaNacimiento,
        descripcion: req.body.descripcion
    };
    Persona.findByIdAndUpdate(req.body._id, data, {new: true}, (err, userDB) => {
        res = util.responceGuardar(req, res, err, userDB);
    });
};


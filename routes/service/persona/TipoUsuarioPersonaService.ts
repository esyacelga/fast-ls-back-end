import {Request, Response} from "express";
import {CommonsMethods} from "../../../commons/CommonsMethods";
import {Persona} from "../../../models/persona/PersonaModel";
import {TipoUsuarioPersona} from "../../../models/persona/TipoUsuarioPersonaModel";
import {UsuarioModel} from "../../../models/security/UsuarioModel";

const util = new CommonsMethods();

export const ObtenerTodos = (req: Request, res: Response) => {
    TipoUsuarioPersona.find({}, (error, objeto) => {
        res = util.responceBuscar(req, res, error, objeto);
    });
}


export const Registrar = async (req: Request, res: Response) => {
    const persona = await crearPersona(req, res);
    console.log("Hola humao");
    const usuario = await crearUsuario(req, res);

    //  req.persona = persona;
    return null;
}

async function crearPersona(request: Request, res: Response) {
    const persona = {
        primerNombre: request.body.primerNombre,
        segundoNombre: request.body.segundoNombre,
        primerApellido: request.body.primerApellido,
        segundoApellido: request.body.segundoApellido,
        cedula: request.body.cedula,
        correo: request.body.correo,
        fechaNacimiento: request.body.fechaNacimiento,
        sector: request.body.sector,
    }
    await Persona.create(persona, (err: any, objeto: any) => {
        res = util.responceCrear(request, res, err, objeto);
        // @ts-ignore
        console.log("2")
    });
}


async function crearUsuario(req: Request, res: Response) {
    const data = {
        avatar: req.body.avatar,
        playerId: req.body.playerId,
        clave: req.body.clave,
        estado: req.body.estado
    };
    await UsuarioModel.create(data, (err: any, objeto: any) => {
        res = util.responceCrear(req, res, err, objeto);
        console.log("1")
    });
}


export const Actualizar = (req: Request, res: Response) => {
    const data = {
        persona: req.body.persona,
        usuario: req.body.usuario,
        estado: req.body.estado
    };
    TipoUsuarioPersona.findByIdAndUpdate(req.body._id, data, {new: true}, (err, userDB) => {
        res = util.responceGuardar(req, res, err, userDB);
    });
};


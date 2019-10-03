import {Request, Response} from "express";
import {CommonsMethods} from "../../../commons/CommonsMethods";
import {Persona} from "../../../models/persona/PersonaModel";
import {TipoUsuarioPersona} from "../../../models/persona/TipoUsuarioPersonaModel";
import {UsuarioModel} from "../../../models/security/UsuarioModel";
import {Usuario} from "../../../models/usuario.model";
import {TipoUsuario} from "../../../models/persona/TipoUsuarioModel";

const util = new CommonsMethods();

export const ObtenerTodos = (req: Request, res: Response) => {
    TipoUsuarioPersona.find({}, (error, objeto) => {
        res = util.responceBuscar(req, res, error, objeto);
    });
}


export const BusquedaPersonaClave = (req: Request, res: Response) => {
    TipoUsuarioPersona.find({}, (error, objeto) => {
        let tipoUsuario = null;
        for (let entry of objeto) {
            // @ts-ignore
            if (entry.persona && entry.usuario && entry.usuario._id) {
                // @ts-ignore
                actualizarUsuario(entry.usuario, req.body.playerId);
                tipoUsuario = entry;
            }
        }
        console.log(tipoUsuario);
        res = util.responceBuscar(req, res, error, tipoUsuario);
    }).populate({path: 'persona', match: {'correo': {$eq: req.body.correo}},})
        .populate({path: 'usuario', match: {'clave': {$eq: req.body.clave}},})
        .exec()
}


export const obtenerUsuariosNotificacion = async (tipoUsuario: string) => {
    const lstPlayerId: string[] = [];
    const tipoUsuaro = await obtenerTipoUsuarioXDescripcion(tipoUsuario);
    if (!tipoUsuaro)
        return [];

    // @ts-ignore
    const lstIpoUsuario = <[]>await obtenerTipoUsuarioPersona(tipoUsuaro._id);
    if (!lstIpoUsuario)
        return [];
    // @ts-ignore
    for (let entry of lstIpoUsuario) {
        // @ts-ignore
        if (entry.usuario && entry.usuario.playerId) {
            // @ts-ignore
            lstPlayerId.push(entry.usuario.playerId);
        }
    }
    return lstPlayerId;

}

function obtenerTipoUsuarioXDescripcion(tipoUsuario: string) {
    const promesa = new Promise(async (resolve: any, reject: any) => {
        TipoUsuario.findOne({}, (error, objeto) => {
            resolve(objeto);
        }).where('descripcion').equals(tipoUsuario);
    })

    return promesa;
}

function obtenerTipoUsuarioPersona(idTipoUsuario: string) {
    const promesa = new Promise(async (resolve: any, reject: any) => {
        TipoUsuarioPersona.find({}, (error, objeto) => {
            resolve(objeto);
        }).populate('usuario').where('tipoUsuario').equals(idTipoUsuario);
    })

    return promesa;

}

function actualizarUsuario(usuario: any, playerId: string) {
    usuario.playerId = playerId;
    Usuario.findByIdAndUpdate(usuario._id, usuario, {new: true}, (err, userDB) => {
        if (err) throw err;
        console.log(userDB);
        return 0;
    });
}


async function crearTipoUsuarioPersona(persona: any, usuario: any, request: Request) {
    const tipoUsuarioPersona = {
        persona: persona._id,
        usuario: usuario._id,
        tipoUsuario: request.body.tipoUsuario,
    }
    return await TipoUsuarioPersona.create(tipoUsuarioPersona);
}

export const Registrar = async (req: Request, res: Response) => {
    const persona = await crearPersona(req, res);
    const usuario = await crearUsuario(req, res);
    const tipoUsuarioPersona = await crearTipoUsuarioPersona(persona, usuario, req);
    res.status(200).json({
        ok: true,
        objeto: tipoUsuarioPersona
    })
    return res;
}


async function crearPersona(request: Request, res: Response) {
    const persona = {
        nombres: request.body.nombres,
        apellidos: request.body.apellidos,
        cedula: request.body.cedula,
        correo: request.body.correo,
        fechaNacimiento: request.body.fechaNacimiento,
        sector: request.body.sector,
    }
    return await Persona.create(persona);
}


async function crearUsuario(req: Request, res: Response) {
    const data = {
        avatar: req.body.avatar,
        playerId: req.body.playerId,
        clave: req.body.clave,
        estado: req.body.estado
    };
    return await UsuarioModel.create(data);
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


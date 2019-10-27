import {Request, Response} from "express";
import {CommonsMethods} from "../../../commons/CommonsMethods";
import {TipoUsuarioPersona} from "../../../models/persona/TipoUsuarioPersonaModel";
import {UsuarioModel} from "../../../models/security/UsuarioModel";
import {Usuario} from "../../../models/usuario.model";
import {TipoUsuario} from "../../../models/persona/TipoUsuarioModel";
import {PersonaModeloPersistencia} from "../../../models/persona/PersonaModel";
import {PersonaDto} from "../../../classes/persona/Persona";
import {ModeloTipoUsuarioPersona} from "../../../classes/persona/ModeloTipoUsuarioPersona";
import FileSystem from "../../../classes/file-system";

const util = new CommonsMethods();
const fileSystem = new FileSystem();
export const ObtenerTodos = (req: Request, res: Response) => {
    TipoUsuarioPersona.find({}, (error, objeto) => {
        res = util.responceBuscar(req, res, error, objeto);
    }).populate('persona').populate('tipoUsuario').populate('usuario');
}

export const ObtenerPorPersona = (req: Request, res: Response) => {
    TipoUsuarioPersona.find({}, (error, objeto) => {
        res = util.responceBuscar(req, res, error, objeto);
    }).populate('persona').populate('tipoUsuario').populate('usuario').where('persona').equals(req.body.persona);
}

export const ObtenerPorTipoUsuario = (req: Request, res: Response) => {
    TipoUsuarioPersona.find({}, (error, objeto) => {
        res = util.responceBuscar(req, res, error, objeto);
    }).populate('persona').populate('tipoUsuario').populate('usuario').where('tipoUsuario').equals(req.body.tipoUsuario);
}


function obtenerPersonaCorreo(correo: string) {
    const promesa = new Promise(async (resolve: any, reject: any) => {
        PersonaModeloPersistencia.findOne({}, (error, objeto) => {
            resolve(objeto);
        }).where('correo').equals(correo);
    })
    return promesa;
}


export const BusquedaPersonaClave = async (req: Request, res: Response) => {
    console.log(req.body.correo);
    const objPersona: PersonaDto = (await PersonaModeloPersistencia.findOne().where('correo').equals(req.body.correo)) as unknown as PersonaDto;
    if (!objPersona)
        return util.responceBuscar(req, res, null, null);
    const lstTipoUsuarioPersona: ModeloTipoUsuarioPersona[] = (await TipoUsuarioPersona.find().populate('tipoUsuario').populate('persona').populate('usuario').where('persona').equals(objPersona._id)) as unknown as ModeloTipoUsuarioPersona[];
    console.log(lstTipoUsuarioPersona);
    if (!lstTipoUsuarioPersona || lstTipoUsuarioPersona.length === 0)
        return util.responceBuscar(req, res, null, null);
    for (let item of lstTipoUsuarioPersona) {
        if (item.usuario.clave === req.body.clave) {
            return util.responceBuscar(req, res, null, lstTipoUsuarioPersona);
        }
    }
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

/**
 * Registra un persona en  todas las tablas relacionadas a este
 * @param req
 * @param res
 * @constructor
 */
export const Registrar = async (req: Request, res: Response) => {
    let usuario = await PersonaModeloPersistencia.findOne().where('correo').equals(req.body.correo);
    if (usuario) {
        res = util.responceCrear(req, res, {message: 'El correo ingresado ya existe'});
        return res;
    }
    const persona = await crearPersona(req, res);
    usuario = await crearUsuario(req, res);
    const tipoUsuarioPersona = await crearTipoUsuarioPersona(persona, usuario, req);
    res.status(200).json({
        ok: true,
        objeto: tipoUsuarioPersona
    })
    return res;
}


export const Insertar = async (req: Request, res: Response) => {
    const tipoUsuarioPersona = {
        persona: req.body.persona,
        usuario: req.body.usuario,
        tipoUsuario: req.body.tipoUsuario,
    }
    return util.responceCrear(req, res, null, await TipoUsuarioPersona.create(tipoUsuarioPersona));
}


async function crearPersona(request: Request, res: Response) {
    const persona = {
        avatar: request.body.avatar,
        nombres: request.body.nombres.toUpperCase(),
        apellidos: request.body.apellidos.toUpperCase(),
        identificacion: request.body.identificacion,
        correo: request.body.correo.toLowerCase(),
        fechaNacimiento: request.body.fechaNacimiento,
        sector: request.body.sector,
    }
    return await PersonaModeloPersistencia.create(persona);
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

export const ActualizarPhoto = (req: Request, res: Response) => {
    const imagen = fileSystem.imagenesDeTempHaciaPost(req.body._id);
    const data = {
        imagen: imagen
    };
    TipoUsuarioPersona.findByIdAndUpdate(req.body._id, data, {new: true}, (err, userDB) => {
        res = util.responceGuardar(req, res, err, userDB);
    });
};

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


import {Request, Response} from "express";
import {CommonsMethods} from "../../../commons/CommonsMethods";
import {TipoUsuario} from "../../../models/persona/TipoUsuarioModel";

const util = new CommonsMethods();

export const ObtenerTodos = (req: Request, res: Response) => {
    var body = req.body;
    TipoUsuario.find({}, (error, objeto) => {
        res = util.responceBuscar(req, res, error, objeto);
    }).where('estado').equals(1);
}

export const ObtenerPorCampoValor = (req: Request, res: Response) => {
    var body = req.body;
    const campo = body.campo;
    const valor = body.valor;
    console.log(campo);
    console.log(valor);
    TipoUsuario.findOne({}, (error, objeto) => {
        res = util.responceBuscar(req, res, error, objeto);
    }).where(campo).equals(valor);
}

export const Registrar = (req: Request, res: Response) => {
    const data = {
        descripcion: req.body.descripcion,
        estado: req.body.estado
    };
    TipoUsuario.create(data, (err: any, objeto: any) => {
        res = util.responceCrear(req, res, err, objeto);
    });
}

export const Actualizar = (req: Request, res: Response) => {
    const tipoArt = {
        descripcion: req.body.descripcion,
        estado: req.body.estado,
    }
    TipoUsuario.findByIdAndUpdate(req.body._id, tipoArt, {new: true}, (err, userDB) => {
        res = util.responceGuardar(req, res, err, userDB);
    });
};


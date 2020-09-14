import {Request, Response} from "express";
import {CommonsMethods} from "../../../commons/CommonsMethods";
import {ParametroInterface} from "../../../classes/interface/common/ParametroInterface";
import {ParametroModel} from "../../../models/common/ParametroModel";

const util = new CommonsMethods();


export const crearParametro = async (req: Request, res: Response) => {
    const data: ParametroInterface = req.body as ParametroInterface;
    data.creacionFecha = new Date();
    const objCreado: ParametroInterface = (await ParametroModel.create(data)) as unknown as ParametroInterface;
    return util.responceCrear(req, res, null, objCreado);
}

export const actualizaParametro = async (req: Request, res: Response) => {
    const data: ParametroInterface = req.body as ParametroInterface;
    const objCreado: ParametroInterface = (await ParametroModel.findByIdAndUpdate(data._id, data)) as unknown as ParametroInterface;
    return util.responceCrear(req, res, null, objCreado);
}


export const obtenerTodos = async (req: Request, res: Response) => {
    ParametroModel.find({}, (error, objeto) => {
        return res = util.responceBuscar(req, res, error, objeto);
    }).where('estado').in([1]);
}

export const obtenerParametroPorCodigo = async (req: Request, res: Response) => {
    const codigo = req.body.codigo;
    ParametroModel.findOne({}, (error, objeto) => {
        return res = util.responceBuscar(req, res, error, objeto);
    }).where('codigo').equals(codigo);
}


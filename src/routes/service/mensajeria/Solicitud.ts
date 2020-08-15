import {CommonsMethods} from "../../../commons/CommonsMethods";
import {SolicitudCabecera, SolicitudDetalle} from "../../../models/mensajeria/Solicitud";
import {Request, Response} from "express";
import {SolcitudCabeceraModel} from "./class/SolcitudMap";
import {SolicitudCabeceraDto, SolicitudClass} from "./class/SolicitudClass";
import {Pedido} from "../../../classes/mensajeria/solicitud/Pedido";
import {Articulo} from "../../../models/mensajeria/ArticuloModel";
import {ModeloUsuario} from "../../../classes/persona/ModeloTipoUsuarioPersona";

const util = new CommonsMethods();

export const actualizarSolicitud = (req: Request, res: Response) => {
    const solicitud = {
        estado: req.body.estado,
        fechaModificacion: new Date()
    }
    SolicitudCabecera.findByIdAndUpdate(req.body._id, solicitud, {new: true}, (err, userDB) => {
        res = util.responceGuardar(req, res, err, userDB);
    });
}


export const Registrar = (req: Request, res: Response) => {
    const data = <SolcitudCabeceraModel>req.body;
    data.fechaCreacion = new Date();
    SolicitudDetalle.insertMany(data.lstSolcitudDetalle, (err: any, lstResultado: any) => {
        const solicitudCabecera = new SolicitudClass(data.usuario, data.estado, util.obtenerListaIDs(lstResultado), new Date());
        SolicitudCabecera.create(solicitudCabecera, (err: any, objeto: any) => {
            res = util.responceCrear(req, res, err, objeto);
        });
    });
}
export const obtenerPedidos = async (req: Request, res: Response) => {
    const lstCab: Pedido[] = (await obtenerCabecera(1)) as Pedido[];
    res = util.responceCrear(req, res, null, lstCab);
}

/**
 * Obtiene los pedidos por el id de usuario
 * @param req
 * @param res
 */
export const obtenerPedidoPorUsuario = async (req: Request, res: Response) => {
    const idUsuario: ModeloUsuario = req.body.idUsuario;
    if (idUsuario === null && idUsuario === '') {
        util.responceBuscar(req, res, {messaje: 'Debe enviar el id de persona, para enviar  a buscar'}, null);
        return;
    }
    const lstCabeceraDto: SolicitudCabeceraDto[] = (await SolicitudCabecera.find({usuario: idUsuario}) as unknown as SolicitudCabeceraDto []);
    return res = util.responceCrear(req, res, null, lstCabeceraDto);
}


export const obtenerCabecera = async (estado: number) => {
    const promesa = new Promise(async (resolve: any, reject: any) => {
        SolicitudCabecera.find({}, async (error, lstPedido: Pedido[]) => {
            let lstAuxiliar: Pedido[] = lstPedido;
            for (let it of lstAuxiliar) {
                for (let ita of it.solicitudDetalle) {
                    // @ts-ignore
                    ita.articulo = await Articulo.findOne().where('_id').equals(ita.articulo._id);
                }
                it.usuario = 'hola......77712123234.............';
            }
            resolve(lstAuxiliar);
        }).populate({
            path: 'solicitudDetalle',
            populate: {
                path: 'solicitudDetalle'
            }
        }).sort({fechaCreacion: -1})
    })

    return promesa;
}


export const obtenerDetalle = async (lstKeys: string[]) => {
    const promesa = new Promise(async (resolve: any, reject: any) => {
        SolicitudDetalle.find({}, (error, objeto) => {
            resolve(objeto);
        }).where('descripcion').in(lstKeys);
    })

    return promesa;
}



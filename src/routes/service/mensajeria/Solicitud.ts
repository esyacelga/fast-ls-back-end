import {CommonsMethods} from "../../../commons/CommonsMethods";
import {SolicitudCabecera, SolicitudDetalle} from "../../../models/mensajeria/Solicitud";
import {Request, Response} from "express";
import {SolcitudCabeceraModel} from "./class/SolcitudMap";
import {SolicitudCabeceraDto, SolicitudClass} from "./class/SolicitudClass";
import {Pedido} from "../../../classes/mensajeria/solicitud/Pedido";
import {Articulo} from "../../../models/mensajeria/ArticuloModel";
import {ModeloUsuario} from "../../../classes/persona/ModeloTipoUsuarioPersona";
import {TipoUsuarioPersona} from "../../../models/persona/TipoUsuarioPersonaModel";
import {TipoUsuario} from "../../../models/persona/TipoUsuarioModel";
import {TipoUsuarioInterface} from "../../../classes/interface/persona/TipoUsuarioInterface";
import {PedidoDTO, PedidoInterface} from "../../../classes/interface/mensajeria/PedidoInterface";
import {TipoUsuarioPersonaInterface} from "../../../classes/interface/persona/TipoUsuarioPersonaInterface";
import {PedidoDetalleInterface} from "../../../classes/interface/mensajeria/PedidoDetalleInterface";

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
    return util.responceBuscar(req, res, null, lstCab);
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
            if (lstAuxiliar)
                for (let it of lstAuxiliar) {
                    for (let ita of it.solicitudDetalle) {
                        // @ts-ignore
                        ita.articulo = await Articulo.findOne().where('_id').equals(ita.articulo._id);
                    }
                    it.usuario = '';
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

export const setearTipoUsuarioPesona = (lstPedido: PedidoInterface[], lstTipoUsuarioPersona: TipoUsuarioPersonaInterface[]) => {
    const lstNewPedido: PedidoInterface[] = [];
    for (const pedido of lstPedido) {
        for (const tipoUsuarioPersona of lstTipoUsuarioPersona) {
            const valorIncial = tipoUsuarioPersona.usuario._id;
            const valorFinal = pedido.usuario._id;
            if (new String(valorIncial).valueOf() == new String(valorFinal).valueOf()) {
                let datoPedido: PedidoInterface = {
                    tipoUsuarioPersona: tipoUsuarioPersona,
                    usuario: pedido.usuario,
                    _id: pedido._id,
                    estado: pedido.estado,
                    fechaCreacion: pedido.fechaCreacion,
                    solicitudDetalle: pedido.solicitudDetalle
                }
                lstNewPedido.push(datoPedido)
            }

        }
    }
    return lstNewPedido
}

export const obtenerKeyDetalle = (lstPedido: PedidoInterface[]) => {
    const lstKeys: string[] = [];
    for (const pedido of lstPedido) {
        for (const detalle of pedido.solicitudDetalle) {
            lstKeys.push(detalle._id);
        }
    }
    return lstKeys;
}

export const filtrarListaDetalle = (keyBusqueda: string, lstDetalle: PedidoDetalleInterface[]): PedidoDetalleInterface => {
    for (const data of lstDetalle) {
        if (new String(data._id).valueOf() === new String(keyBusqueda).valueOf()) {
            return data;
        }
    }
    // @ts-ignore
    return null;
}
export const transformarDetalle = (solicitudDetalle: PedidoDetalleInterface[], lstDetalle: PedidoDetalleInterface[]) => {
    const lst: PedidoDetalleInterface[] = [];
    for (let detalle of solicitudDetalle) {
        const obj: PedidoDetalleInterface = filtrarListaDetalle(detalle._id, lstDetalle);
        if (obj !== null)
            detalle = obj
        lst.push(detalle);
    }
    return lst;
}
export const setearDetalle = (lstPedido: PedidoInterface[], lstDetalle: PedidoDetalleInterface[]) => {
    const lstRet: PedidoDTO[] = [];
    for (let pedido of lstPedido) {
        const objPedido: PedidoDTO = new PedidoDTO(pedido._id, pedido.estado, pedido.fechaCreacion,
            transformarDetalle(pedido.solicitudDetalle, lstDetalle), pedido.usuario, pedido.tipoUsuarioPersona)
        lstRet.push(objPedido);
    }
    return lstRet;
}

export const obtenerPedidoPorEstado = async (req: Request, res: Response) => {
    let lstPedido: PedidoInterface[] = (await SolicitudCabecera.find().populate('solicitudDetalle').populate('usuario').where('estado').equals(req.body.estado).sort({fechaCreacion: -1})) as unknown as PedidoInterface[];
    const lstNumberString: string[] = obtenerKeyDetalle(lstPedido);
    const lstDetalle: PedidoDetalleInterface[] = (await SolicitudDetalle.find().populate('articulo').where('_id').in(lstNumberString)) as unknown as PedidoDetalleInterface[];
    lstPedido = setearDetalle(lstPedido, lstDetalle);
    const tipoUsuario: TipoUsuarioInterface = (await TipoUsuario.findOne().where('codigo').equals('CLIENTE').where('estado').equals(1)) as unknown as TipoUsuarioInterface;
    const lstTipoUsuarioPersona: TipoUsuarioPersonaInterface[] = (await TipoUsuarioPersona.find().populate('usuario').populate('persona').where('tipoUsuario').equals(tipoUsuario._id).where('estado').equals(1)) as unknown as TipoUsuarioPersonaInterface[];
    lstPedido = setearTipoUsuarioPesona(lstPedido, lstTipoUsuarioPersona);
    return util.responceBuscar(req, res, null, lstPedido);
}

export const obtenerPedidoUsuario = async (req: Request, res: Response) => {
    let lstPedido: PedidoInterface[] = (await SolicitudCabecera.find().populate('solicitudDetalle').populate('usuario')
        .where('estado').equals(2)
        .where('usuario').equals(req.body.usuario)
        .sort({fechaCreacion: -1})) as unknown as PedidoInterface[];
    const lstNumberString: string[] = obtenerKeyDetalle(lstPedido);
    const lstDetalle: PedidoDetalleInterface[] = (await SolicitudDetalle.find().populate('articulo').where('_id').in(lstNumberString)) as unknown as PedidoDetalleInterface[];
    lstPedido = setearDetalle(lstPedido, lstDetalle);
    const tipoUsuario: TipoUsuarioInterface = (await TipoUsuario.findOne().where('codigo').equals('CLIENTE').where('estado').equals(1)) as unknown as TipoUsuarioInterface;
    const lstTipoUsuarioPersona: TipoUsuarioPersonaInterface[] = (await TipoUsuarioPersona.find().populate('usuario').populate('persona').where('tipoUsuario').equals(tipoUsuario._id).where('estado').equals(1)) as unknown as TipoUsuarioPersonaInterface[];
    lstPedido = setearTipoUsuarioPesona(lstPedido, lstTipoUsuarioPersona);
    return util.responceBuscar(req, res, null, lstPedido);
}


export const obtenerDetalle = async (lstKeys: string[]) => {
    const promesa = new Promise(async (resolve: any, reject: any) => {
        SolicitudDetalle.find({}, (error, objeto) => {
            resolve(objeto);
        }).where('descripcion').in(lstKeys);
    })

    return promesa;
}



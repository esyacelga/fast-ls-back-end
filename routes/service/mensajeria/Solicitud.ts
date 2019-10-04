import {CommonsMethods} from "../../../commons/CommonsMethods";
import {SolicitudCabecera, SolicitudDetalle} from "../../../models/mensajeria/Solicitud";
import {Request, Response} from "express";
import {SolcitudCabeceraModel} from "./class/SolcitudMap";
import {SolicitudClass} from "./class/SolicitudClass";
import {Pedido, PedidoDetalle} from "../../../classes/mensajeria/solicitud/Pedido";
import {Articulo} from "../../../models/mensajeria/ArticuloModel";
import {TipoUsuarioPersona} from "../../../models/persona/TipoUsuarioPersonaModel";

const util = new CommonsMethods();


export const Registrar = (req: Request, res: Response) => {
    const data = <SolcitudCabeceraModel>req.body;
    SolicitudDetalle.insertMany(data.lstSolcitudDetalle, (err: any, lstResultado: any) => {
        const solicitudCabecera = new SolicitudClass(data.usuario, data.estado, util.obtenerListaIDs(lstResultado));
        SolicitudCabecera.create(solicitudCabecera, (err: any, objeto: any) => {
            res = util.responceCrear(req, res, err, objeto);
        });
    });
}
export const obtenerPedidos = async (req: Request, res: Response) => {
    const lstCab: Pedido[] = (await obtenerCabecera(1)) as Pedido[];
  //  const lstKeys = util.convertirObjListaArreglo(lstCab);
  //  const lstPed: PedidoDetalle[] = (await obtenerDetalle(lstKeys)) as PedidoDetalle[];
    //console.log(lstCab)
    res = util.responceCrear(req, res, null, lstCab);
}

export const obtenerCabecera = async (estado: number) => {
    const promesa = new Promise(async (resolve: any, reject: any) => {
        SolicitudCabecera.find({}, async (error, lstPedido: Pedido[]) => {
            for (let it of lstPedido) {
                it.usuario = '****444';
                console.log('esto',it.usuario);
               /* for (let ita of it.solicitudDetalle) {
                    // @ts-ignore
                    ita.articulo = await Articulo.findOne().where('_id').equals(ita.articulo._id);
                }*/

            }

            resolve(lstPedido);
        }).populate({
            path: 'solicitudDetalle',
            populate: {
                path: 'solicitudDetalle'
            }
        }).where('estado').equals(estado);
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



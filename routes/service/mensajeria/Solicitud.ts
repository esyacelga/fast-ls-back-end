import {CommonsMethods} from "../../../commons/CommonsMethods";
import {SolicitudCabecera, SolicitudDetalle} from "../../../models/mensajeria/Solicitud";
import {Request, Response} from "express";
import {SolcitudCabeceraModel} from "./class/SolcitudMap";
import {SolicitudClass} from "./class/SolicitudClass";
import {Pedido} from "../../../classes/mensajeria/solicitud/Pedido";
import {Articulo} from "../../../models/mensajeria/ArticuloModel";

const util = new CommonsMethods();

export const actualizarSolicitud = (req: Request, res: Response) => {
    const solicitud = {
        estado: req.body.estado,
        fechaModificacion: new Date()
    }
    console.log(solicitud);
    SolicitudCabecera.findByIdAndUpdate(req.body._id, solicitud, {new: true}, (err, userDB) => {
        res = util.responceGuardar(req, res, err, userDB);
    });
}


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
    for (let i of lstCab) {
        i.usuario = 'hola'
        // @ts-ignore
        i.de = 'tttas';
        console.log(i);
    }
    /* const lstKeys = util.convertirObjListaArreglo(lstCab);
     const lstPed: PedidoDetalle[] = (await obtenerDetalle(lstKeys)) as PedidoDetalle[];*/
    //console.log(lstCab)
    res = util.responceCrear(req, res, null, lstCab);
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



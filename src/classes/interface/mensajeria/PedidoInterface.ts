import {TipoUsuarioPersonaInterface} from "../persona/TipoUsuarioPersonaInterface";
import {PedidoDetalleInterface} from "./PedidoDetalleInterface";
import {UsuarioInterface} from "../persona/UsuarioInterface";

export interface PedidoInterface {
    _id: string;
    estado: number;
    fechaCreacion: Date;
    solicitudDetalle: PedidoDetalleInterface[];
    usuario: UsuarioInterface;
    tipoUsuarioPersona: TipoUsuarioPersonaInterface;
}

export class PedidoDTO {
    _id: string;
    estado: number;
    fechaCreacion: Date;
    solicitudDetalle: PedidoDetalleInterface[];
    usuario: UsuarioInterface;
    tipoUsuarioPersona: TipoUsuarioPersonaInterface;


    constructor(id: string, estado: number, fechaCreacion: Date, solicitudDetalle: PedidoDetalleInterface[], usuario: UsuarioInterface, tipoUsuarioPersona: TipoUsuarioPersonaInterface) {
        this._id = id;
        this.estado = estado;
        this.fechaCreacion = fechaCreacion;
        this.solicitudDetalle = solicitudDetalle;
        this.usuario = usuario;
        this.tipoUsuarioPersona = tipoUsuarioPersona;
    }
}

import {ModeloUsuario} from "../../../../classes/persona/ModeloTipoUsuarioPersona";

export class SolicitudClass {
    usuario: string;
    estado: number;
    solicitudDetalle: string[];
    fechaCreacion: Date;


    constructor(usuario: string, estado: number, solicitudDetalle: string[], fechaCreacion: Date) {
        this.usuario = usuario;
        this.estado = estado;
        this.solicitudDetalle = solicitudDetalle;
        this.fechaCreacion = fechaCreacion;
    }
}


export class SolicitudCabeceraDto {
    public _id: string;
    public usuario: ModeloUsuario;
    public estado: number;
    public fechaCreacion: Date;

    constructor(id: string, usuario: ModeloUsuario, estado: number, fechaCreacion: Date) {
        this._id = id;
        this.usuario = usuario;
        this.estado = estado;
        this.fechaCreacion = fechaCreacion;
    }
}

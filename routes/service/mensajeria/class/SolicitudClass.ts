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

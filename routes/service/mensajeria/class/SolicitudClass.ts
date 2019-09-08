export class SolicitudClass {
    usuario: string;
    estado: number;
    solicitudDetalle: string[];


    constructor(usuario: string, estado: number, solicitudDetalle: string[]) {
        this.usuario = usuario;
        this.estado = estado;
        this.solicitudDetalle = solicitudDetalle;
    }
}

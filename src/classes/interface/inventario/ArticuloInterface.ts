export interface ArticuloInterface {
    _id: string;
    descripcion: number;
    unidadCosto: number;
    estado: number;
    articuloSegmento: string;
    img: string[];
    unidadAlmacenada: Number;
    fechaCreacion: Date;
    portada: string;
    verObservacion: boolean;
    obsevacion: string;
    esBanner: boolean;
    ocultarBotonSolicitar: boolean;
    horaInicio: Date,
    horaFin: Date,
    conteoLike: Number;
    conteoDisLike: Number;
    conteoComentarios: Number;

}

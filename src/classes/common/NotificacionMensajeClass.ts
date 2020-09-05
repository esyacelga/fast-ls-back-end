import {ArticuloDto} from "../mensajeria/ArticuloDto";
import {PersonaDto} from "../persona/Persona";

export interface NotificacionMensajeInterface {
    _id: string;
    estado: boolean;
    tipoNotificacion: number;
    created: Date;
    persona: PersonaDto;
    personaPrivado: PersonaDto;
    articulo: ArticuloDto;
    mensaje: string;
    idSegmento: string;
    like: boolean;
    dislike: boolean;
    nombreSegmento: string;
    playerId: string;
    esServicio: boolean;
}

export class NotificacionMensajeClass {
    public estado: boolean;
    public tipoNotificacion: number;
    public created: Date;
    public persona: PersonaDto;
    public articulo: ArticuloDto;
    public mensaje: string;
    public like: boolean;
    public dislike: boolean;
    public idSegmento: string;
    public nombreSegmento: string;
    public playerId: string;
    public esServicio: boolean;


    constructor(articulo: ArticuloDto, persona: PersonaDto, tipoNotificacion: number, mensaje: string,
                like: boolean, dislike: boolean, idSegmento: string,
                nombreSegmento: string, playerId: string, esServicio: boolean) {
        this.mensaje = mensaje;
        this.persona = persona;
        this.articulo = articulo;
        this.tipoNotificacion = tipoNotificacion;
        this.estado = true;
        this.created = new Date();
        this.like = like;
        this.dislike = dislike;
        this.idSegmento = idSegmento;
        this.nombreSegmento = nombreSegmento;
        this.playerId = playerId;
        this.esServicio = esServicio;
    }
}

export interface DtoNotificacion {
    tipoNotificacion: Number,
    estado: Boolean,
    mensaje: String,
    idSegmento: String,
    nombreSegmento: String,
    created: Date
}


export class NotificacionMensajeDto {
    public _id: string;
    public displayName: string;
    public picture: string;
    public titulo: string;
    public mensaje: string;
    public playerId: string;
    public tipoNotificacon: number;
    public portada: string;
    public idSegmento: string;
    public nombreSegmento: string;
    public like: boolean;
    public esServicio: boolean;


    constructor(id: string, displayName: string, picture: string, titulo: string, mensaje: string,
                playerId: string, tipoNotificacon: number, portada: string,
                idSegmento: string, nombreSegmento: string, like: boolean, esServicio: boolean) {
        this._id = id;
        this.displayName = displayName;
        this.picture = picture;
        this.titulo = titulo;
        this.mensaje = mensaje;
        this.playerId = playerId;
        this.tipoNotificacon = tipoNotificacon;
        this.portada = portada;
        this.idSegmento = idSegmento;
        this.nombreSegmento = nombreSegmento;
        this.like = like;
        this.esServicio = esServicio;
    }
}

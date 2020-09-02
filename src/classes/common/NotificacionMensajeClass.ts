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
}

export class NotificacionMensajeClass {
    public estado: boolean;
    public tipoNotificacion: number;
    public created: Date;
    public persona: PersonaDto;
    public personaPrivado: PersonaDto;
    public articulo: ArticuloDto;
    public mensaje: string;
    public like: boolean;
    public dislike: boolean;
    public idSegmento: string;
    public nombreSegmento: string;


    constructor(articulo: ArticuloDto, persona: PersonaDto, tipoNotificacion: number, mensaje: string,
                personaPrivado: PersonaDto, like: boolean, dislike: boolean, idSegmento: string, nombreSegmento: string) {
        this.mensaje = mensaje;
        this.persona = persona;
        this.articulo = articulo;
        this.tipoNotificacion = tipoNotificacion;
        this.estado = true;
        this.created = new Date();
        this.personaPrivado = personaPrivado;
        this.like = like;
        this.dislike = dislike;
        this.idSegmento = idSegmento;
        this.nombreSegmento = nombreSegmento;
    }
}


export class NotificacionMensajeDto {
    public _id: string;
    public displayName: string;
    public picture: string;
    public titulo: string;
    public mensaje: string;
    public idPersona: string;
    public tipoNotificacon: number;
    public portada: string;
    public idSegmento: string;
    public nombreSegmentro: string;
    public like: boolean;

    constructor(id: string, displayName: string, picture: string, titulo: string, mensaje: string,
                idPersona: string, tipoNotificacon: number, portada: string,
                idSegmento: string, nombreSegmentro: string, like: boolean) {
        this._id = id;
        this.displayName = displayName;
        this.picture = picture;
        this.titulo = titulo;
        this.mensaje = mensaje;
        this.idPersona = idPersona;
        this.tipoNotificacon = tipoNotificacon;
        this.portada = portada;
        this.idSegmento = idSegmento;
        this.nombreSegmentro = nombreSegmentro;
        this.like = like;
    }
}

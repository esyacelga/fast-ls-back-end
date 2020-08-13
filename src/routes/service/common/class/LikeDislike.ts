import {PersonaDto} from "../../../../src/classes/persona/Persona";
import {ArticuloDto} from "../../../../src/classes/mensajeria/ArticuloDto";

export class LikeDislike {
    // @ts-ignore
    public _id: string;
    public persona: PersonaDto;
    public articulo: ArticuloDto;
    public like: boolean;
    public creacionFecha: Date;
    public modificacionFecha: Date;
    public estado: boolean;

    constructor(persona: PersonaDto, articulo: ArticuloDto, like: boolean, creacionFecha: Date, estado: boolean) {
        this.persona = persona;
        this.articulo = articulo;
        this.like = like;
        this.creacionFecha = creacionFecha;
        this.estado = estado;
        this.modificacionFecha = new Date();
    }
}

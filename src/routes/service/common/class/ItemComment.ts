import {PersonaDto} from "../../../../src/classes/persona/Persona";
import {ArticuloDto} from "../../../../src/classes/mensajeria/ArticuloDto";

export class ItemComment {

    public persona: PersonaDto;
    public articulo: ArticuloDto;
    public comentario: string;
    public creacionFecha: Date;
    public estado: boolean;

    constructor(persona: PersonaDto, articulo: ArticuloDto, comentario: string, creacionFecha: Date, estado: boolean) {
        this.persona = persona;
        this.articulo = articulo;
        this.comentario = comentario;
        this.creacionFecha = creacionFecha;
        this.estado = estado;
    }
}

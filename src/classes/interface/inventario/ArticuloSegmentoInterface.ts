import {TipoArticuloInterface} from "./TipoArticuloInterface";

export interface ArticuloSegmentoInterface {
    _id: string;
    descripcion: string,
    tipoArticulo: TipoArticuloInterface,
    estado: number
}


import {SectorDto} from "../direccion/SectorDto";
import {ModeloDisponibilidad} from "./ModeloDisponibilidad";

export class RutaDto {
    _id: string = '';
    sectorIncial: SectorDto = new SectorDto();
    sectorFinal: SectorDto = new SectorDto();
    disponibilidad: ModeloDisponibilidad = new ModeloDisponibilidad();
    finalizado: boolean = false;
    espacioTotal: boolean = false;
    espacioCompartido: boolean = false;
    estado: Number = 0
    lstIntegrantes: RutaIntegranteDto[] = [];

}


export class RutaIntegranteDto {
    // @ts-ignore
    _id: string;
    rutaModeloPersistencia: string = '';
    tipoUsuarioPersona: string = '';
    estado: string = '';


    constructor(rutaModeloPersistencia: string, tipoUsuarioPersona: string, estado: string) {
        this.rutaModeloPersistencia = rutaModeloPersistencia;
        this.tipoUsuarioPersona = tipoUsuarioPersona;
        this.estado = estado;
    }
}

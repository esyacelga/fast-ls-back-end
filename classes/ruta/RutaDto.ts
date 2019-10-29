import {SectorDto} from "../direccion/SectorDto";

export class RutaDto {
    _id: string = '';
    sectorIncial: SectorDto = new SectorDto();
    sectorFinal: SectorDto = new SectorDto();
    finalizado: boolean = false;
    espacioTotal: boolean = false;
    espacioCompartido: boolean = false;
    estado: Number = 0
    lstIntegrantes: RutaIntegranteDto[] = [];

}


export class RutaIntegranteDto {
    rutaModeloPersistencia: string = '';
    tipoUsuarioPersona: string = '';
    estado: string = '';
}

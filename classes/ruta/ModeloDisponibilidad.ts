import {ModeloTipoUsuarioPersona} from "../persona/ModeloTipoUsuarioPersona";

export class ModeloVehiculo {
    _id: string = '';
    placa: string = '';
}

export class ModeloDisponibilidad {
    _id: string = '';
    nombreAlias: string = '';
    tipoUsuarioPersona: ModeloTipoUsuarioPersona = new ModeloTipoUsuarioPersona();
    vehiculo: ModeloVehiculo = new ModeloVehiculo();
    numeroTurno: number = 0;
    enTurno: boolean = true;
    estadoDiponibilidad: boolean = true;
}


export class PersistenciaDisponibilidad {
    _id: string = '';
    nombreAlias: string = '';
    tipoUsuarioPersona: string = '';
    vehiculo: string = '';
    numeroTurno: number = 0;
    enTurno: boolean = true;
    estadoDiponibilidad: boolean = true;

    constructor(nombreAlias: string, tipoUsuarioPersona: string, vehiculo: string, numeroTurno: number, enTurno: boolean, estadoDiponibilidad: boolean) {
        this.nombreAlias = nombreAlias;
        this.tipoUsuarioPersona = tipoUsuarioPersona;
        this.vehiculo = vehiculo;
        this.numeroTurno = numeroTurno;
        this.enTurno = enTurno;
        this.estadoDiponibilidad = estadoDiponibilidad;
    }
}

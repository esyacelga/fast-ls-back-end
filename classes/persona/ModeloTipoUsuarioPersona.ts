import {PersonaDto} from "./Persona";

export class ModeloTipoUsuarioPersona {
    _id: string = '';
    usuario: ModeloUsuario = new ModeloUsuario();
    tipoUsuario: ModeloTipoUsuario = new ModeloTipoUsuario();
    persona: PersonaDto = new PersonaDto();
}

export class ModeloUsuario {
    _id: string = '';
    playerId: string = '';
    clave: string = '';

}

export class ModeloTipoUsuario {
    _id: string = '';
}


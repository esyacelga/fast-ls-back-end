import {ModeloTipoUsuario} from "../persona/ModeloTipoUsuarioPersona";

export class Notificador {
    _id: string = '';
    titulo: string = '';
    mensajeTitulo: string = '';
    key: string = '';
    keyPayload: string = '';
    estado: number=0;
    tipoUsuario: ModeloTipoUsuario = new ModeloTipoUsuario();
}

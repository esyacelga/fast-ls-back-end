import {ModeloUsuario} from "../../persona/ModeloTipoUsuarioPersona";

export class Pedido {
    _id: string = '';
    estado: number = 0;
    fechaCreacion: Date = new Date();
    solicitudDetalle: PedidoDetalle[] = [];
    usuario: string = '';
    tipoUsuarioPersona: TipoUsuarioPersona = new TipoUsuarioPersona();
}

export class TipoUsuarioPersona {
    _id: string = '';
    persona: Persona = new Persona();
    usuario: ModeloUsuario = new ModeloUsuario();
}

export class Persona {
    _id: string = '';
    nombres: string = '';
    apellidos: string = '';
}

export class PedidoDetalle {
    _id: string = '';
    estado: number = 0;
    articulo: Artic = new Artic();
}


export class Artic {
    _id: string = '';
    descripcion: number = 0;
}

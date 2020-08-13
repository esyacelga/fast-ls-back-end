export class Pedido {
    _id: string = '';
    estado: number = 0;
    solicitudDetalle: PedidoDetalle[] = [];
    usuario: string = '';
    tipoUsuarioPersona: TipoUsuarioPersona = new TipoUsuarioPersona();
}

export class TipoUsuarioPersona {
    _id: string = '';
    persona: Persona = new Persona();
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

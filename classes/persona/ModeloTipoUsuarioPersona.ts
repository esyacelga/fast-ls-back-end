export class ModeloTipoUsuarioPersona {
    _id: string = '';
    usuario: ModeloUsuario = new ModeloUsuario();
    tipoUsuario: ModeloTipoUsuario = new ModeloTipoUsuario();
}

export class ModeloUsuario {
    _id: string = '';
    playerId: string = '';

}

export class ModeloTipoUsuario {
    _id: string = '';
}

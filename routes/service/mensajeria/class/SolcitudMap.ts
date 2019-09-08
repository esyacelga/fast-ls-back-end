export interface SolcitudCabeceraModel {
    usuario: string;
    estado: number;
    lstSolcitudDetalle: SolcitudDetalleModel[]
}

export interface SolcitudCabeceraPersistence {
    usuario: string;
    estado: number;
    lstSolcitudDetalle: string[];
}


export interface SolcitudDetalleModel {
    _id: string;
    articulo: string;
    estado: number;
}

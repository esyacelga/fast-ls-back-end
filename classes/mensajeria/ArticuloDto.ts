export class ArticuloDto {
    public _id: string = '';
    public articuloSegmento: string = '';
    public img: string[] = [];
    public unidadCosto: Number = 0;
    public unidadAlmacenada: Number = 0;
    public descripcion: string = '';
    public estado: boolean = false;
    public fechaCreacion: Date = new Date();
    public portada: string = '';

}

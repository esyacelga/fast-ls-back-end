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
    public verObservacion: boolean = false;
    public obsevacion: string = '';
    public esBanner: boolean = false;
    public conteoLike: Number = 0;
    public conteoDisLike: Number = 0;
    public conteoComentarios: Number = 0;
}

export class ArticuloClass {
    public _id: string = '';
    public descripcion: string = '';
    public articuloSegmento: ArticuloSegmentoClass = new ArticuloSegmentoClass();

}

export class ArticuloSegmentoClass {
    public _id: string = '';
    public descripcion: string = '';
    public estado: Number = 1;
}

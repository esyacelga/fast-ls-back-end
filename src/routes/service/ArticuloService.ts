import {CommonsMethods} from "../../commons/CommonsMethods";
import {Request, Response} from "express";
import {Articulo} from "../../models/mensajeria/ArticuloModel";
import FileSystem from "../../classes/file-system";
import {isNull} from "util";
import {ArticuloDto} from "../../classes/mensajeria/ArticuloDto";

const util = new CommonsMethods();
const fileSystem = new FileSystem();


export const ObtnerArticuloImagenes = async (req: any, res: Response) => {
    const directorio = req.params.directorio;
    const img = req.params.img;
    const pathFoto = fileSystem.getFotoUrl(directorio, img);
    res.sendFile(pathFoto);
};

export const PaginarArticulos = async (req: Request, res: Response) => {
    let pagina = Number(req.body.pagina) || 1;
    let skip = pagina - 1;
    skip = skip * 10;
    const posts = await Articulo.find()
        .sort({_id: -1})
        .skip(skip)
        .limit(10)
        //   .populate('usuario', '-password')
        .exec();
    res.json({
        ok: true,
        pagina,
        items: posts
    });
}


export const ObtenerTodos = (req: Request, res: Response) => {
    var body = req.body;
    Articulo.find({}, (error, objeto) => {
        res = util.responceBuscar(req, res, error, objeto);
    }).populate('articuloSegmento').where('estado').equals(1);
}

export const Registrar = (req: Request, res: Response) => {
    if (req.body.articuloSegmento)
        req.body.img = fileSystem.imagenesDeTempHaciaPost(req.body.articuloSegmento);
    const data = {
        articuloSegmento: req.body.articuloSegmento,
        unidadCosto: req.body.unidadCosto,
        unidadAlmacenada: req.body.unidadAlmacenada,
        descripcion: req.body.descripcion,
        estado: req.body.estado,
        esServicio: isNull(req.body.estado) ? false : req.body.esServicio,
        permiteComentarios: isNull(req.body.estado) ? false : req.body.permiteComentarios,
        fechaCreacion: new Date(),
        img: req.body.img,
        portada: null
    };

    if (req.body.img) {
        if (Array.isArray(req.body.img) === true && req.body.img.length > 0) {
            data.portada = req.body.img[0];
            data.img = req.body.img;
        } else {
            // @ts-ignore
            objArticulo.portada = imagen;
            // @ts-ignore
            objArticulo.img.push(imagen);
        }
    }

    Articulo.create(data, (err: any, objeto: any) => {
        res = util.responceCrear(req, res, err, objeto);
    });
}


export const RegistrarArticulo = (req: Request, res: Response) => {
    const data = {
        portada: null,
        articuloSegmento: req.body.articuloSegmento,
        unidadCosto: req.body.unidadCosto,
        unidadAlmacenada: req.body.unidadAlmacenada,
        descripcion: req.body.descripcion,
        estado: req.body.estado,
        fechaCreacion: new Date(),
        img: req.body.img[0]
    };

    if (req.body.img.length > 0 && req.body.img && req.body.img[0])
        data.portada = req.body.img;
    Articulo.create(data, (err: any, objeto: any) => {
        res = util.responceCrear(req, res, err, objeto);
    });
}


export const Actualizar = async (req: Request, res: Response) => {
    // @ts-ignore
    const imagen: string[] = fileSystem.imagenesDeTempHaciaPost(req.body.articuloSegmento);
    const objArticulo: ArticuloDto = req.body as ArticuloDto;
    console.log(imagen);
    const imagenCopia: ArticuloDto = (await Articulo.findOne().where('_id').equals(objArticulo._id)) as unknown as ArticuloDto;


    if (imagen) {
        if (Array.isArray(imagen) === true && imagen.length > 0) {
            objArticulo.portada = imagen[0];
            objArticulo.img = imagen;
        } else {
            // @ts-ignore
            objArticulo.portada = imagen;
            // @ts-ignore
            objArticulo.img.push(imagen);
        }
    } else {
        objArticulo.portada = imagenCopia.portada;
        objArticulo.img = imagenCopia.img;
    }
    console.log(objArticulo);
    Articulo.findByIdAndUpdate(req.body._id, objArticulo, {new: true}, (err, userDB) => {
        res = util.responceGuardar(req, res, err, userDB);
    });
};


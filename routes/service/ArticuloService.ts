import {CommonsMethods} from "../../commons/CommonsMethods";
import {Request, Response} from "express";
import {Articulo} from "../../models/mensajeria/ArticuloModel";
import FileSystem from "../../classes/file-system";

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
        fechaCreacion: new Date(),
        imgs: req.body.img
    };
    Articulo.create(data, (err: any, objeto: any) => {
        res = util.responceCrear(req, res, err, objeto);
    });
}


export const RegistrarArticulo = (req: Request, res: Response) => {
    const data = {
        portada: req.body.portada,
        articuloSegmento: req.body.articuloSegmento,
        unidadCosto: req.body.unidadCosto,
        unidadAlmacenada: req.body.unidadAlmacenada,
        descripcion: req.body.descripcion,
        estado: req.body.estado,
        fechaCreacion: new Date(),
        imgs: req.body.img
    };
    Articulo.create(data, (err: any, objeto: any) => {
        res = util.responceCrear(req, res, err, objeto);
    });
}

export const Actualizar = (req: Request, res: Response) => {
    const imagen = fileSystem.imagenesDeTempHaciaPost(req.body.articuloSegmento);
    const tipoArt = {
        portada: imagen,
        articuloSegmento: req.body.articuloSegmento,
        unidadCosto: req.body.unidadCosto,
        unidadAlmacenada: req.body.unidadAlmacenada,
        descripcion: req.body.descripcion,
        estado: req.body.estado,
    }
    Articulo.findByIdAndUpdate(req.body._id, tipoArt, {new: true}, (err, userDB) => {
        res = util.responceGuardar(req, res, err, userDB);
    });
};

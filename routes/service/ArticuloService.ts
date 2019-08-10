import {CommonsMethods} from "../../commons/CommonsMethods";
import {Request, Response} from "express";
import {Articulo} from "../../models/mensajeria/ArticuloModel";
import FileSystem from "../../classes/file-system";

const util = new CommonsMethods();
const fileSystem = new FileSystem();

export const ObtenerTodos = (req: Request, res: Response) => {
    var body = req.body;
    Articulo.find({}, (error, objeto) => {
        res = util.responceBuscar(req, res, error, objeto);
    }).where('estado').equals(1);
}


export const Registrar = (req: Request, res: Response) => {
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

export const Actualizar = (req: Request, res: Response) => {
    const tipoArt = {
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

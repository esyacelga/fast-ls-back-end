"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CommonsMethods_1 = require("../../commons/CommonsMethods");
const ArticuloModel_1 = require("../../models/mensajeria/ArticuloModel");
const util = new CommonsMethods_1.CommonsMethods();
exports.ObtenerTodos = (req, res) => {
    var body = req.body;
    ArticuloModel_1.Articulo.find({}, (error, objeto) => {
        res = util.responceBuscar(req, res, error, objeto);
    }).where('estado').equals(1);
};
exports.Registrar = (req, res) => {
    const data = {
        articuloSegmento: req.body.articuloSegmento,
        unidadCosto: req.body.unidadCosto,
        unidadAlmacenada: req.body.unidadAlmacenada,
        descripcion: req.body.descripcion,
        estado: req.body.estado
    };
    ArticuloModel_1.Articulo.create(data, (err, objeto) => {
        res = util.responceCrear(req, res, err, objeto);
    });
};
exports.Actualizar = (req, res) => {
    const tipoArt = {
        articuloSegmento: req.body.articuloSegmento,
        unidadCosto: req.body.unidadCosto,
        unidadAlmacenada: req.body.unidadAlmacenada,
        descripcion: req.body.descripcion,
        estado: req.body.estado,
    };
    ArticuloModel_1.Articulo.findByIdAndUpdate(req.body._id, tipoArt, { new: true }, (err, userDB) => {
        res = util.responceGuardar(req, res, err, userDB);
    });
};

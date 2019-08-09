"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CommonsMethods_1 = require("../../commons/CommonsMethods");
const ArticuloSegmentoModel_1 = require("../../models/mensajeria/ArticuloSegmentoModel");
const util = new CommonsMethods_1.CommonsMethods();
exports.ObtenerTodosArticuloSegmento = (req, res) => {
    var body = req.body;
    ArticuloSegmentoModel_1.ArticuloSegmento.find({}, (error, objeto) => {
        res = util.responceBuscar(req, res, error, objeto);
    }).where('estado').equals(1);
};
exports.RegistrarArticuloSegmento = (req, res) => {
    const data = {
        tipoArticulo: req.body.tipoArticulo,
        descripcion: req.body.descripcion,
        estado: req.body.estado
    };
    ArticuloSegmentoModel_1.ArticuloSegmento.create(data, (err, objeto) => {
        res = util.responceCrear(req, res, err, objeto);
    });
};
exports.ActualizarArticuloSegmento = (req, res) => {
    const tipoArt = {
        tipoArticulo: req.body.tipoArticulo,
        descripcion: req.body.descripcion,
        estado: req.body.estado,
    };
    ArticuloSegmentoModel_1.ArticuloSegmento.findByIdAndUpdate(req.body._id, tipoArt, { new: true }, (err, userDB) => {
        res = util.responceGuardar(req, res, err, userDB);
    });
};

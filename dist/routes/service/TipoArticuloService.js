"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TipoArticulo_1 = require("../../models/mensajeria/TipoArticulo");
const CommonsMethods_1 = require("../../commons/CommonsMethods");
const util = new CommonsMethods_1.CommonsMethods();
exports.ObtenerTodos = (req, res) => {
    var body = req.body;
    TipoArticulo_1.TipoArticulo.find({}, (error, objeto) => {
        res = util.responceBuscar(req, res, error, objeto);
    }).where('estado').equals(1);
};
exports.RegistrarTipoArticulo = (req, res) => {
    const data = {
        codigo: req.body.codigo,
        descripcion: req.body.descripcion,
        estado: req.body.estado
    };
    TipoArticulo_1.TipoArticulo.create(data, (err, objeto) => {
        res = util.responceCrear(req, res, err, objeto);
    });
};
exports.ActualizarTipoArticulo = (req, res) => {
    const tipoArt = {
        codigo: req.body.codigo,
        descripcion: req.body.descripcion,
        estado: req.body.estado,
    };
    TipoArticulo_1.TipoArticulo.findByIdAndUpdate(req.body._id, tipoArt, { new: true }, (err, userDB) => {
        res = util.responceGuardar(req, res, err, userDB);
    });
};
/*

export const eliminar
(req: Request, res: Response)
{
    var id = req.params.id;
    TipoArticulo.findOneAndDelete(id, (err, objeto) => {
        res = util.responceEliminar(req, res, err, objeto);
    });
}
*/

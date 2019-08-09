var mdlArticuloSegmento = require('../models/ArticuloSegmento');
var responceBuscar = require('../system/SystemUtils');

function obtenerTodos(req, res) {
    var body = req.body;
    mdlArticuloSegmento.find({}, (error, objeto) => {
        res = responceBuscar.responceBuscar(req, res, error, objeto);
    }).where('estado').equals(1);
}


module.exports = {
    obtenerTodos
};

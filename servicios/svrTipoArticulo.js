var mdlTipoArticulo = require('../models/TipoArticulo');
var responceBuscar = require('../system/SystemUtils');

function obtenerTodos(req, res) {
    var body = req.body;
    mdlTipoArticulo.find({}, (error, objeto) => {
        res = responceBuscar.responceBuscar(req, res, error, objeto);
    });
}


module.exports = {
    obtenerTodos
};

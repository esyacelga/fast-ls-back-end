var responceBuscar = function (peticion, respuesta, error, objeto) {
    if (error) {
        return respuesta.status(500).json({
            ok: false,
            mensaje: 'Error cargando la lista de obejtos',
            errors: error
        })
    }
    respuesta.status(200).json({
        ok: true,
        objeto: objeto
    })
};


var responceCrear = function (peticion, respuesta, error, objeto) {
    if (error) {
        console.error(error);
        return respuesta.status(400).json({
            ok: false,
            mensaje: 'Error al crear objeto',
            errors: error
        })
    }
    respuesta.status(201).json({
        ok: true,
        objeto: objeto
    })
};

var responceActualizar = function (peticion, respuesta, error, objeto) {
    var id = peticion.params.id;
    if (error) {
        return respuesta.status(500).json({
            ok: false,
            mensaje: 'Error al actualizar objeto',
            errors: error
        });
    }
    if (!objeto) {
        return respuesta.status(400).json({
            ok: false,
            mensaje: 'El usuario con el id ' + id + ' no existe',
            errors: {message: 'No existe un objeto con ese ID'}
        });
    }
};


var responceGuardar = function (peticion, respuesta, error, objeto) {
    if (error) {
        return respuesta.status(400).json({
            ok: false,
            mensaje: 'Error al crear objeto',
            errors: error
        })
    }
    respuesta.status(201).json({
        ok: true,
        objeto: objeto
    })
};

var responceEliminar = function (peticion, respuesta, error, objeto) {
    var id = peticion.params.id;
    console.log(id);
    if (error) {
        return res.status(500).json({
            ok: false,
            mensaje: 'Error errorrrar usuario',
            errors: error
        });
    }

    if (!objeto) {
        return respuesta.status(400).json({
            ok: false,
            mensaje: 'No existe un usuario con ese id',
            errors: {message: 'No existe un usuario con ese id'}
        });
    }

    respuesta.status(200).json({
        ok: true,
        objeto: objeto
    });
};

module.exports.responceActualizar = responceActualizar;
module.exports.responceGuardar = responceGuardar;
module.exports.responceBuscar = responceBuscar;
module.exports.responceCrear = responceCrear;
module.exports.responceEliminar = responceEliminar;

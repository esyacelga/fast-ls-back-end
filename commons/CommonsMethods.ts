import {Request, Response} from "express";

export class CommonsMethods {

    responceBuscar(peticion: Request, respuesta: Response, error: any, objeto: any) {
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
        return respuesta;
    };


    responceCrear(peticion: Request, respuesta: Response, error: any, objeto: any) {
        if (error) {
            console.error(error);
            return respuesta.status(400).json({
                ok: false,
                mensaje: 'Error al crear objeto..',
                errors: error
            })
        }
        respuesta.status(201).json({
            ok: true,
            objeto: objeto
        })
        return respuesta;
    };

    responceActualizar(peticion: Request, respuesta: Response, error: any, objeto: any) {
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
                mensaje: 'El objeto con el id ' + id + ' no existe',
                errors: {message: 'No existe un objeto con ese ID'}
            });
        }
    };


    responceGuardar(peticion: Request, respuesta: Response, error: any, objeto: any) {
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
        return respuesta;
    };

    responceEliminar(peticion: Request, respuesta: Response, error: any, objeto: any) {
        var id = peticion.params.id;
        console.log(id);
        if (error) {
            return respuesta.status(500).json({
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
        return respuesta;
    };


}

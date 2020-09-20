import {Request, Response} from "express";
import {ErrorMessaje} from "../models/common/ErrorMessaje";

export class CommonsMethods {

    convertirObjListaArreglo(listaObjeto: any[]): string[] {
        const lstKeys: string[] = []
        if (!listaObjeto)
            return [];

        if (listaObjeto.length === 0)
            return [];

        for (let iterador of listaObjeto) {
            lstKeys.push(iterador._id)
        }
        return lstKeys;
    }

    cargarError(sms: string, opcion: boolean): ErrorMessaje {
        let datoError: ErrorMessaje = new ErrorMessaje(sms, opcion);
        return datoError;
    }

    responceActualizar(peticion: Request, respuesta: Response, error: any, objeto: any) {
        if (error) {
            const mensaje = error.messaje;
            const opcion = error.opcion || false;
            return respuesta.status(500).json({
                ok: false,
                message: 'Error al actualizar:',
                errors: this.cargarError(mensaje, opcion)
            })
        }
        respuesta.status(200).json({
            ok: true,
            objeto: objeto
        })
        return respuesta;
    };
    responceBuscar(peticion: Request, respuesta: Response, error: any, objeto: any) {
        if (error) {
            const mensaje = error.messaje;
            const opcion = error.opcion || false;
            return respuesta.status(500).json({
                ok: false,
                message: 'Error:',
                errors: this.cargarError(mensaje, opcion)
            })
        }
        respuesta.status(200).json({
            ok: true,
            objeto: objeto
        })
        return respuesta;
    };


    obtenerListaIDs(data: any[]): string[] {
        let lsRet: string[] = [];
        data.forEach(function (value) {
            lsRet.push(value._id);
        });
        return lsRet;
    }

    obtenerListaCampo(valores: any[], campo: string): string[] {
        let lsRet: string[] = [];
        valores.forEach(function (value) {
            lsRet.push(value[campo]);
        });

        return lsRet;
    }


    /*
     for (const aux in valores) {
       if (aux === campo) {
       lista[i][aux] = this.toBoolean(lista[i][aux]);
   }
   }
   */

    responceCrear(peticion: Request, respuesta: Response, error: any, objeto?: any) {
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

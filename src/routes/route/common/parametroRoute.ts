import {Router} from 'express';
import {
    actualizaParametro,
    crearParametro,
    obtenerParametroPorCodigo,
    obtenerTodos
} from "../../service/common/ParametroService";

const parametroRoute = Router();


/**
 * Crea un registro
 */
parametroRoute.post('/', crearParametro);

parametroRoute.put('/', actualizaParametro);

parametroRoute.put('/obtenerTodos', obtenerTodos);

parametroRoute.put('/obtenerParametroPorCodigo', obtenerParametroPorCodigo);


export default parametroRoute;

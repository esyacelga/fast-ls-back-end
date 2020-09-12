import {Router} from 'express';
import {actualizaParametro, crearParametro, obtenerTodos} from "../../service/common/ParametroService";

const parametroRoute = Router();


/**
 * Crea un registro
 */
parametroRoute.post('/', crearParametro);


parametroRoute.put('/actualizaParametro', actualizaParametro);


parametroRoute.put('/obtenerTodos', obtenerTodos);


export default parametroRoute;

import {Router} from 'express';
import {
    ActualizarArticuloSegmento,
    ObtenerTodosArticuloSegmento,
    RegistrarArticuloSegmento
} from "./service/ArticuloSegmentoService";

const articuloSegmentoRoute = Router();

/**
 * Obtiene todos
 */
articuloSegmentoRoute.get('/', ObtenerTodosArticuloSegmento);

/**
 * Crea un registro
 */
articuloSegmentoRoute.post('/', RegistrarArticuloSegmento);


/**
 * Actualiza un registro
 */
articuloSegmentoRoute.put('/', ActualizarArticuloSegmento);


export default articuloSegmentoRoute;

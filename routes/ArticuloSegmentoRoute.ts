import {Router} from 'express';
import {
    ActualizarArticuloSegmento, ObtenerSegmentoPortTipoArticulo,
    ObtenerTodosArticuloSegmento,
    RegistrarArticuloSegmento
} from "./service/ArticuloSegmentoService";

const articuloSegmentoRoute = Router();

/**
 * Obtiene todos
 */
articuloSegmentoRoute.put('/obtenerTodosArticuloSegmento', ObtenerTodosArticuloSegmento);


/**
 * Obtiene por tipo articulo
 */
articuloSegmentoRoute.put('/obtenerPorTipoArticulo', ObtenerSegmentoPortTipoArticulo);

/**
 * Crea un registro
 */
articuloSegmentoRoute.post('/', RegistrarArticuloSegmento);


/**
 * Actualiza un registro
 */
articuloSegmentoRoute.put('/', ActualizarArticuloSegmento);


export default articuloSegmentoRoute;

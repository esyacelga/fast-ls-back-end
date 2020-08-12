import {Router} from 'express';
import {IngresarComentario, ObtenerComentariosPorArticulo} from "../../service/common/ItemCommentService";


const comentarioRoute = Router();


/**
 * Crea un registro
 */
comentarioRoute.post('/', IngresarComentario);


comentarioRoute.put('/obtenerTodos', ObtenerComentariosPorArticulo);


export default comentarioRoute;

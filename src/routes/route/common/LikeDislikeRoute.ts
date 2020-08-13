import {Router} from 'express';
import {IngresarLike} from "../../service/common/LikeDislikeService";


const likeDislikeRoute = Router();


/**
 * Crea un registro
 */
likeDislikeRoute.post('/', IngresarLike);


//comentarioRoute.put('/obtenerTodos', ObtenerComentariosPorArticulo);


export default likeDislikeRoute;

import {Router} from 'express';
import {
    EliminarComentario,
    IngresarComentario,
    ObtenerComentariosPorArticulo,
    ObtenerTodosNotificaciones,
} from "../../service/common/ItemCommentService";


const comentarioRoute = Router();


/**
 * Crea un registro
 */
comentarioRoute.post('/', IngresarComentario);


comentarioRoute.put('/ObtenerTodosNotificaciones', ObtenerTodosNotificaciones);


comentarioRoute.put('/eliminar', EliminarComentario);


comentarioRoute.put('/obtenerTodos', ObtenerComentariosPorArticulo);

export default comentarioRoute;

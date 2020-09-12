import {Router} from 'express';
import {
    actualizarSolicitud, obtenerPedidoPorEstado,
    obtenerPedidoPorUsuario,
    obtenerPedidos,
    Registrar
} from "../../service/mensajeria/Solicitud";

const solcitudRoute = Router();


/**
 * Crea un registro
 */
solcitudRoute.post('/', Registrar);


solcitudRoute.put('/obtenerPedidos', obtenerPedidos);


solcitudRoute.put('/obtenerPedidoPorEstado', obtenerPedidoPorEstado);


solcitudRoute.put('/obtenerPedidoPorUsuario', obtenerPedidoPorUsuario);


solcitudRoute.put('/actualizar', actualizarSolicitud);


export default solcitudRoute;

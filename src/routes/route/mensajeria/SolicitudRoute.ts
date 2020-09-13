import {Router} from 'express';
import {
    actualizarSolicitud,
    obtenerPedidoPorEstado,
    obtenerPedidoPorUsuario,
    obtenerPedidos,
    obtenerPedidoUsuario,
    Registrar
} from "../../service/mensajeria/Solicitud";

const solcitudRoute = Router();


/**
 * Crea un registro
 */
solcitudRoute.post('/', Registrar);


solcitudRoute.put('/obtenerPedidos', obtenerPedidos);


solcitudRoute.put('/obtenerPedidoPorEstado', obtenerPedidoPorEstado);

solcitudRoute.put('/obtenerPedidoUsuario', obtenerPedidoUsuario);


solcitudRoute.put('/obtenerPedidoPorUsuario', obtenerPedidoPorUsuario);


solcitudRoute.put('/actualizar', actualizarSolicitud);


export default solcitudRoute;

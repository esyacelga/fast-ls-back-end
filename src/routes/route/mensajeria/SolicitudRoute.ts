import {Router} from 'express';
import {actualizarSolicitud, obtenerPedidos, Registrar} from "../../service/mensajeria/Solicitud";

const solcitudRoute = Router();


/**
 * Crea un registro
 */
solcitudRoute.post('/', Registrar);


solcitudRoute.put('/obtenerPedidos', obtenerPedidos);


solcitudRoute.put('/actualizar', actualizarSolicitud);


export default solcitudRoute;

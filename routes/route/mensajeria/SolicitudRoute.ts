import {Router} from 'express';
import {obtenerPedidos, Registrar} from "../../service/mensajeria/Solicitud";

const solcitudRoute = Router();


/**
 * Crea un registro
 */
solcitudRoute.post('/', Registrar);


solcitudRoute.put('/obtenerPedidos', obtenerPedidos);



export default solcitudRoute;

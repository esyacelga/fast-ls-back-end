import {Router} from 'express';
import {Registrar} from "../../service/mensajeria/Solicitud";

const solcitudRoute = Router();


/**
 * Crea un registro
 */
solcitudRoute.post('/', Registrar);




export default solcitudRoute;

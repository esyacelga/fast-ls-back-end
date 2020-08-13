import {Router} from 'express';
import {Actualizar, ObtenerSectores, Registrar} from "../../service/direccion/SectorService";

const sectorRoute = Router();

/**
 * Obtiene todos
 */
sectorRoute.put('/obtenerTodosSectores', ObtenerSectores);

/**
 * Crea un registro
 */
sectorRoute.post('/', Registrar);


/**
 * Actualiza un registro
 */
sectorRoute.put('/', Actualizar);


export default sectorRoute;

import {Router} from 'express';
import {
    Actualizar,
    BusquedaPersonaClave,
    ObtenerTodos,
    Registrar
} from "../../service/persona/TipoUsuarioPersonaService";

const tipoUsuarioPersonaRoute = Router();

/**
 * Obtiene todos
 */
tipoUsuarioPersonaRoute.put('/obtenerTodos', ObtenerTodos);


tipoUsuarioPersonaRoute.put('/BusquedaPersonaClave', BusquedaPersonaClave);

/**
 * Crea un registro
 */
tipoUsuarioPersonaRoute.post('/', Registrar);


/**
 * Actualiza un registro
 */
tipoUsuarioPersonaRoute.put('/', Actualizar);


export default tipoUsuarioPersonaRoute;

import {Router} from 'express';
import {
    Actualizar,
    BusquedaPersonaClave,
    Insertar,
    ObtenerPorPersona, ObtenerPorTipoUsuario,
    ObtenerTodos,
    Registrar
} from "../../service/persona/TipoUsuarioPersonaService";

const tipoUsuarioPersonaRoute = Router();

/**
 * Obtiene todos
 */
tipoUsuarioPersonaRoute.put('/obtenerTodos', ObtenerTodos);

/**
 * Obtiene Persona Usuario por id_persona
 */
tipoUsuarioPersonaRoute.put('/ObtenerPorPersona', ObtenerPorPersona);


/**
 * Obtiene Persona Usuario por id_persona
 */
tipoUsuarioPersonaRoute.put('/ObtenerPorTipoUsuario', ObtenerPorTipoUsuario);



/**
 * Validación del correo y clave
 */
tipoUsuarioPersonaRoute.put('/BusquedaPersonaClave', BusquedaPersonaClave);

/**
 * Crea un registro en persona, usuario y tipo_usuario
 */
tipoUsuarioPersonaRoute.post('/', Registrar);


/**
 * Inser un registro en el documento
 */
tipoUsuarioPersonaRoute.post('/insertar', Insertar);

/**
 * Actualiza un registro
 */
tipoUsuarioPersonaRoute.put('/', Actualizar);


export default tipoUsuarioPersonaRoute;

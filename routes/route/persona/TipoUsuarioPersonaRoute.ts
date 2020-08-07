import {Router} from 'express';
import {
    Actualizar,
    ActualizarPhoto,
    BuscarPersonaCorreo,
    BusquedaPersonaClave,
    Insertar,
    ObtenerPorPersona,
    ObtenerPorTipoUsuario,
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
 * Obtiene la persona por correo electronico
 */
tipoUsuarioPersonaRoute.put('/BuscarPersonaCorreo', BuscarPersonaCorreo);

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

/**
 * Actualiza la foto de perfil del usuario
 */
tipoUsuarioPersonaRoute.put('/actualizarPhoto', ActualizarPhoto);


export default tipoUsuarioPersonaRoute;

import {Router} from 'express';
import {EnviarCorreo} from "../../service/common/CommonService";

const commonRoute = Router();

/**
 * Obtiene todos
 */
commonRoute.put('/EnviarCorreo', EnviarCorreo);


export default commonRoute;

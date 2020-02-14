import {Request, Response} from "express";
import {CommonsMethods} from "../../../commons/CommonsMethods";
import {RutaModeloPersistencia} from "../../../models/ruta/RutaModeloPersistencia";
import {RutaDto, RutaIntegranteDto} from "../../../classes/ruta/RutaDto";
import {isNullOrUndefined} from "util";
import {RutaIntegranteModeloPersistencia} from "../../../models/ruta/RutaIntegranteModeloPersistencia";
import {TipoUsuarioPersona} from "../../../models/persona/TipoUsuarioPersonaModel";

const util = new CommonsMethods();


export const ObtenerTodos = (req: Request, res: Response) => {
    RutaModeloPersistencia.find({}, (error, objeto) => {
        res = util.responceBuscar(req, res, error, objeto);
    });
}

export const ObtenerIntegrantes = async (req: Request, res: Response) => {
    let objRuta: RutaDto = (await RutaModeloPersistencia.findOne().where('disponibilidad').equals(req.body.idDisponibilidad).where('finalizado').equals(0)) as unknown as RutaDto;

    if (isNullOrUndefined(objRuta)) {
        res = util.responceBuscar(req, res, null, null);
        return;
    }
    const lstIntegrantes: RutaIntegranteDto[] = (await RutaIntegranteModeloPersistencia.find({}).where('rutaModeloPersistencia').equals(objRuta._id)) as unknown as RutaIntegranteDto[];


    if (lstIntegrantes) {
        const lstIds: string[] = util.obtenerListaCampo(lstIntegrantes, 'tipoUsuarioPersona');
        console.log('Aca: ', lstIds);
        const respuesta = await TipoUsuarioPersona.find().populate('persona').where('_id').in(lstIds);

        res = util.responceBuscar(req, res, null, respuesta);
        return;
    }

}

export const ObtenerRutaPersona = async (req: Request, res: Response) => {
    const data: RutaDto = req.body as RutaDto;
    let objRuta: RutaDto = (await RutaModeloPersistencia.findOne().where('disponibilidad').equals(data.disponibilidad._id)) as unknown as RutaDto;
    if (isNullOrUndefined(objRuta)) {
        res = util.responceBuscar(req, res, null, null);
        return;
    }

    if (data && data.lstIntegrantes && data.lstIntegrantes.length > 0) {
        let objRutaDetalle: RutaIntegranteDto = data.lstIntegrantes[0];
        objRutaDetalle.rutaModeloPersistencia = objRuta._id;
        const lstRuta: RutaIntegranteDto[] =
            (await RutaIntegranteModeloPersistencia.find()
                .where('rutaModeloPersistencia').equals(objRuta._id)
                .where('tipoUsuarioPersona').equals(objRutaDetalle.tipoUsuarioPersona)) as unknown as RutaIntegranteDto[];
        res = util.responceBuscar(req, res, null, lstRuta);
        return;
    }
    res = util.responceBuscar(req, res, null, []);
    return;
}

export const RegistrarSolicitud = async (req: Request, res: Response) => {
    let rutaDetalle: RutaIntegranteDto;
    let objRuta: RutaDto;
    const data: RutaDto = req.body as RutaDto;
    // @ts-ignore
    data.sectorFinal = undefined;
    // @ts-ignore
    data.sectorIncial = undefined;
    // @ts-ignore
    data._id = null;

    //objRuta = (await RutaModeloPersistencia.create(data)) as unknown as RutaDto;
    RutaModeloPersistencia.create(data).then(obj=>{
        console.log(obj);
        res = util.responceCrear(req, res, null, obj);
        return res;
    })

    console.log('sasas',objRuta);
    if (data && data.lstIntegrantes && data.lstIntegrantes.length > 0) {
        let objRutaDetalle: RutaIntegranteDto = data.lstIntegrantes[0];
        objRutaDetalle.rutaModeloPersistencia = objRuta._id;
        console.log(objRutaDetalle);
        rutaDetalle = (await (RutaIntegranteModeloPersistencia.create(objRutaDetalle))) as unknown as RutaIntegranteDto;
        objRuta.lstIntegrantes = [];
        objRuta.lstIntegrantes.push(rutaDetalle);
    }
    res = util.responceCrear(req, res, null, objRuta);
    return res;

}


export const Registrar = async (req: Request, res: Response) => {
    let rutaDetalle: RutaIntegranteDto;
    const data: RutaDto = req.body as RutaDto;
    let objRuta: RutaDto = (await RutaModeloPersistencia.findOne().where('disponibilidad').equals(data.disponibilidad._id)) as unknown as RutaDto;
    if (isNullOrUndefined(objRuta)) {
        console.log('Va a crear:  ', data);
        // @ts-ignore
        data.sectorFinal = undefined;
        // @ts-ignore
        data.sectorIncial = undefined;
        // @ts-ignore
        data._id = null;
        objRuta = (await RutaModeloPersistencia.create(data)) as unknown as RutaDto;
    }

    if (data && data.lstIntegrantes && data.lstIntegrantes.length > 0) {
        let objRutaDetalle: RutaIntegranteDto = data.lstIntegrantes[0];
        objRutaDetalle.rutaModeloPersistencia = objRuta._id;
        console.log(objRutaDetalle);
        rutaDetalle = (await (RutaIntegranteModeloPersistencia.create(objRutaDetalle))) as unknown as RutaIntegranteDto;
        objRuta.lstIntegrantes = [];
        objRuta.lstIntegrantes.push(rutaDetalle);
    }
    res = util.responceCrear(req, res, null, objRuta);
    return res;
}

export const Actualizar = (req: Request, res: Response) => {
    const data: RutaDto = req.body as RutaDto;
    RutaModeloPersistencia.findByIdAndUpdate(req.body._id, data, {new: true}, (err, userDB) => {
        res = util.responceGuardar(req, res, err, userDB);
    });
};


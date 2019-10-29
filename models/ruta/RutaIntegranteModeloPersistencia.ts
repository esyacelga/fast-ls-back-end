import {model, Schema,} from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const rutaIntegranteModeloPersistencia = new Schema({
    rutaModeloPersistencia:{required: [true, 'La persona es necesaria'],
        type: Schema.Types.ObjectId,
        ref: 'RutaModeloPersistencia'},
    tipoUsuarioPersona: {
        required: [true, 'La persona es necesaria'],
        type: Schema.Types.ObjectId,
        ref: 'TipoUsuarioPersona'
    },
    estado: {type: Number, required: [true, 'El estado es necesario'], default: 1}
});
rutaIntegranteModeloPersistencia.plugin(uniqueValidator, {message: '{PATH} debe de ser único'});

export const RutaIntegranteModeloPersistencia = model('RutaIntegranteModeloPersistencia', rutaIntegranteModeloPersistencia);

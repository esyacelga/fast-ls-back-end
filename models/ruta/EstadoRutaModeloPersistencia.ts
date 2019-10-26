import {model, Schema,} from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const estadoRutaModeloPersistencia = new Schema({
    nombre: {type: String, required: [true, 'El nombre es necesario']},
    codigo: {type: String, required: [true, 'El codigo es necesario']},
    color: {type: String, required: [true, 'El codigo es necesario']},
    estado: {type: Number, required: [true, 'El estdo es necesario'], default: 1}
});
estadoRutaModeloPersistencia.plugin(uniqueValidator, {message: '{PATH} debe de ser único'});

export const EstadoRutaModeloPersistencia = model('EstadoRutaModeloPersistencia', estadoRutaModeloPersistencia);

import {model, Schema,} from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const parametroModel = new Schema({
    codigo: {type: String, required: [true, 'El codigo es necesario']},
    valor: {type: String, required: [true, 'El valor es necesario']},
    creacionFecha: {type: Date},
    estado: {type: Number, required: [true, 'El estado es necesario']}
});
parametroModel.plugin(uniqueValidator, {message: '{PATH} debe de ser único'});

export const ParametroModel = model('ParametroModel', parametroModel);

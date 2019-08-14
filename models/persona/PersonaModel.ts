import {model, Schema,} from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const persona = new Schema({
    primerNombre: {type: String, required: [true, 'primerNombre es necesario']},
    segundoNombre: {type: String},
    primerApellido: {type: String, required: [true, 'primerApellido es necesario']},
    segundoApellido: {type: String},
    cedula: {type: String},
    sector: {required: [true, 'sector es necesario'], type: Schema.Types.ObjectId, ref: 'Sector'},
    fechaNacimiento: {type: Date, required: [true, 'El estado es necesario'], default: 1}
});
persona.plugin(uniqueValidator, {message: '{PATH} debe de ser único'});

export const Persona = model('Persona', persona);

import {model, Schema,} from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const tipoUsuario = new Schema({
    descripcion: {type: String, required: [true, 'la descripcion es necesario']},
    codigo: {type: String, required: [true, 'El código es necesario']},
    estado: {type: Number, required: [true, 'El estado es necesario'], default: 1}
});
tipoUsuario.plugin(uniqueValidator, {message: '{PATH} debe de ser único'});

export const TipoUsuario = model('TipoUsuario', tipoUsuario);

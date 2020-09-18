import {model, Schema,} from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const tipoArticulo = new Schema({
    nombre: {type: String, required: [true, 'El nombre es necesario']},
    descripcion: {type: String, required: [true, 'la descripcion es necesario']},
    codigo: {type: Number, unique: true, required: [true, 'El codigo es necesario']},
    estado: {type: Number, required: [true, 'El estado es necesario']}
});
tipoArticulo.plugin(uniqueValidator, {message: '{PATH} debe de ser único'});

export const TipoArticulo = model('TipoArticulo', tipoArticulo);

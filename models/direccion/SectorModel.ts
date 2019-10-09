import {model, Schema,} from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const sector = new Schema({
    descripcion: {type: String, required: [true, 'la descripcion es necesario']},
    codigo: {type: String, required: [true, 'El cófigo es necesario']},
    estado: {type: Number, required: [true, 'El estado es necesario'], default: 1},
});
sector.plugin(uniqueValidator, {message: '{PATH} debe de ser único'});

export const Sector = model('Sector', sector);

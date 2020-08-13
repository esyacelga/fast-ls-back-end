import {model, Schema,} from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const itemComentarioModel = new Schema({
    persona: {
        required: [true, 'El estado es necesario'],
        type: Schema.Types.ObjectId,
        ref: 'PersonaModeloPersistencia'
    },
    articulo: {type: Schema.Types.ObjectId, ref: 'Articulo'},
    comentario: {type: String},
    creacionFecha: {type: Date},
    estado: {type: Number, required: [true, 'El estado es necesario']}
});
itemComentarioModel.plugin(uniqueValidator, {message: '{PATH} debe de ser único'});

export const ItemComentarioModel = model('ItemComentarioModel', itemComentarioModel);

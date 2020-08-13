import {model, Schema,} from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const articulo = new Schema({
    descripcion: {type: String, required: [true, 'El descripcion es necesario']},
    unidadAlmacenada: {type: Number, required: [true, 'unidadAlmacenada es necesario']},
    unidadCosto: {type: Number, required: [true, 'unidadCosto es necesario']},
    articuloSegmento: {type: Schema.Types.ObjectId, ref: 'ArticuloSegmento'},
    fechaCreacion: {type: Date},
    portada: {type: String},
    img: [{
        type: String
    }],
    esServicio: {type: Boolean, default: false},
    conteoLike: {type: Number, default: 0},
    conteoDisLike: {type: Number, default: 0},
    permiteComentar: {type: Boolean, default: false},
    estado: {type: Number, required: [true, 'El estado es necesario']}
});
articulo.plugin(uniqueValidator, {message: '{PATH} debe de ser único'});

export const Articulo = model('Articulo', articulo);

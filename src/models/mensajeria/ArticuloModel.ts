import {model, Schema,} from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const articulo = new Schema({
    descripcion: {type: String, required: [true, 'La descripcion es necesario']},
    unidadAlmacenada: {type: Number, default: 0},
    unidadCosto: {type: Number, default: 0},
    articuloSegmento: {type: Schema.Types.ObjectId, ref: 'ArticuloSegmento'},
    fechaCreacion: {type: Date},
    portada: {type: String},
    img: [{
        type: String
    }],
    esBanner: {type: Boolean, default: false},
    esServicio: {type: Boolean, default: false},
    verObservacion: {type: Boolean, default: false},
    obsevacion: {type: String},
    conteoLike: {type: Number, default: 0},
    conteoDisLike: {type: Number, default: 0},
    conteoComentarios: {type: Number, default: 0},
    permiteComentar: {type: Boolean, default: false},
    estado: {type: Number, required: [true, 'El estado es necesario']}
});
articulo.plugin(uniqueValidator, {message: '{PATH} debe de ser único'});

export const Articulo = model('Articulo', articulo);

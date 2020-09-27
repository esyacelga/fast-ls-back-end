import {model, Schema,} from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const articuloSegmento = new Schema({
    descripcion: {type: String, required: [true, 'El descripcion es necesario']},
    tipoArticulo: {type: Schema.Types.ObjectId, ref: 'TipoArticulo'},
    esServicio: {type: Boolean},
    esServicioTransporte: {type: Boolean},
    estado: {type: Number, required: [true, 'El estado es necesario']},
    codigoParametro: {type: String},

});
articuloSegmento.plugin(uniqueValidator, {message: '{PATH} debe de ser único'});

export const ArticuloSegmento = model('ArticuloSegmento', articuloSegmento);

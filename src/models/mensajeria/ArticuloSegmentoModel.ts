import {model, Schema,} from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const articuloSegmento = new Schema({
    descripcion: { type: String, required: [true, 'El descripcion es necesario'] },
    tipoArticulo:{	type: Schema.Types.ObjectId,	ref: 'TipoArticulo' },
    estado: { type: Number, required: [true, 'El estado es necesario'] },
    esServicio:{ type: Boolean, required: [true, 'El estado es necesario'] },
});
articuloSegmento.plugin(uniqueValidator, {message: '{PATH} debe de ser único'});

export const ArticuloSegmento = model('ArticuloSegmento', articuloSegmento);

import {model, Schema,} from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const rutaModeloPersistencia = new Schema({
    sectorIncial: {
        type: Schema.Types.ObjectId,
        ref: 'Sector'
    },
    sectorFinal: {
        type: Schema.Types.ObjectId,
        ref: 'Sector'
    },
    finalizado:{type: Boolean},
    espacioTotal: {type: Boolean},
    espacioCompartido: {type: Boolean},
    estado: {type: Number, required: [true, 'El estado es necesario'], default: 1}
});
rutaModeloPersistencia.plugin(uniqueValidator, {message: '{PATH} debe de ser único'});
export const RutaModeloPersistencia = model('RutaModeloPersistencia', rutaModeloPersistencia);

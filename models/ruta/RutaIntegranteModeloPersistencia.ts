import {model, Schema,} from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const vehiculoModeloPersistencia = new Schema({
    tipoUsuarioPersona: {
        required: [true, 'La persona es necesaria'],
        type: Schema.Types.ObjectId,
        ref: 'TipoUsuarioPersona'
    },
    sectorIncial:{type: String},
    sectorFinal:{type: String},
    estado: {type: Number, required: [true, 'El estado es necesario'], default: 1},

    marca: {type: String},
    tipo: {type: String},
    imgs: [{
        type: String
    }],

});
vehiculoModeloPersistencia.plugin(uniqueValidator, {message: '{PATH} debe de ser único'});

export const VehiculoModeloPersistencia = model('VehiculoModeloPersistencia', vehiculoModeloPersistencia);

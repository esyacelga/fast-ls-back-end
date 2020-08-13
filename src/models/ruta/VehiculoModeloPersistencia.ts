import {model, Schema,} from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const vehiculoModeloPersistencia = new Schema({
    modelo: {type: String},
    color: {type: String},
    placa: {type: String, unique: true},
    marca: {type: String},
    tipo: {type: String},
    imgs: [{
        type: String
    }],
    estado: {type: Number, required: [true, 'El estado es necesario'], default: 1}
});
vehiculoModeloPersistencia.plugin(uniqueValidator, {message: '{PATH} debe de ser único'});

export const VehiculoModeloPersistencia = model('VehiculoModeloPersistencia', vehiculoModeloPersistencia);

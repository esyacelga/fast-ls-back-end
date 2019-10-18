import {model, Schema,} from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const disponibilidadModeloPersistencia = new Schema({
    tipoUsuarioPersona: {
        required: [true, 'La persona es necesario'],
        type: Schema.Types.ObjectId,
        ref: 'TipoUsuarioPersona'
    },
    vehiculo: {
        required: [true, 'La persona es necesario'],
        type: Schema.Types.ObjectId,
        ref: 'VehiculoModeloPersistencia'
    },
    numeroTurno: {type: Number},
    enTurno: {type: Number, required: [true, 'El estado del turno es necesario'], default: 1},
    estadoDiponibilidad: {type: String, required: [true, 'El estado es necesario']}
});
disponibilidadModeloPersistencia.plugin(uniqueValidator, {message: '{PATH} debe de ser único'});

export const DisponibilidadModeloPersistencia = model('DisponibilidadModeloPersistencia', disponibilidadModeloPersistencia);

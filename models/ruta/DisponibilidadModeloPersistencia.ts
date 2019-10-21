import {model, Schema,} from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const disponibilidadModeloPersistencia = new Schema({
    nombreAlias: {type: String},
    tipoUsuarioPersona: {
        required: [true, 'La persona es necesario'],
        type: Schema.Types.ObjectId,
        ref: 'TipoUsuarioPersona'
    },
    vehiculo: {
        required: [true, 'La persona es necesario'],
        type: Schema.Types.ObjectId,
        unique: true,
        ref: 'VehiculoModeloPersistencia'
    },
    numeroTurno: {type: Number},
    enTurno: {type: Boolean, default: true},
    estadoDiponibilidad: {type: Boolean, default: true}
});
disponibilidadModeloPersistencia.plugin(uniqueValidator, {message: '{PATH} debe de ser único'});

export const DisponibilidadModeloPersistencia = model('DisponibilidadModeloPersistencia', disponibilidadModeloPersistencia);

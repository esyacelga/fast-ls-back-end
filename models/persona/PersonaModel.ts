import {model, Schema,} from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const personaModeloPersistencia = new Schema({
    avatar: {
        type: String,
        default: 'av-1.png'
    },
    nombres: {type: String, required: [true, 'Los nombres son necesarios']},
    apellidos: {type: String, required: [true, 'Apellidos son necesarios']},
    identificacion: {type: String},
    correo: {type: String},
    sector: {required: [true, 'sector es necesario'], type: Schema.Types.ObjectId, ref: 'Sector'},
    fechaNacimiento: {type: Date}
});
personaModeloPersistencia.plugin(uniqueValidator, {message: '{PATH} debe de ser único'});

export const PersonaModeloPersistencia = model('PersonaModeloPersistencia', personaModeloPersistencia);

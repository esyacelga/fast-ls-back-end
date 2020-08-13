import {model, Schema,} from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const personaModeloPersistencia = new Schema({
    avatar: {
        type: String,
        default: 'av-1.png'
    },
    picture: {
        type: String,
    },
    google: {
        type: Boolean,
        default: false
    },
    nombres: {type: String},
    apellidos: {type: String},
    displayName: {type: String},
    identificacion: {type: String},
    correo: {type: String},
    sector: {type: Schema.Types.ObjectId, ref: 'Sector'},
    numeroTelefonoCelular: {type: String},
    numeroTelefonoConvencional: {type: String},
    fechaNacimiento: {type: Date},
    fechaCreacion: {type: Date},
    fechaModificacion: {type: Date},
});
personaModeloPersistencia.plugin(uniqueValidator, {message: '{PATH} debe de ser único'});

export const PersonaModeloPersistencia = model('PersonaModeloPersistencia', personaModeloPersistencia);

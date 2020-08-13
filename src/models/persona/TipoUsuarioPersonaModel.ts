import {model, Schema,} from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const tipoUsuarioPersona = new Schema({
    persona: {
        required: [true, 'El estado es necesario'],
        type: Schema.Types.ObjectId,
        ref: 'PersonaModeloPersistencia'
    },
    usuario: {required: [true, 'El estado es necesario'], type: Schema.Types.ObjectId, ref: 'UsuarioModel'},
    tipoUsuario: {required: [true, 'El estado es necesario'], type: Schema.Types.ObjectId, ref: 'TipoUsuario'},
    imagen: {type: String},
    estado: {type: Number, default: 1}
});
tipoUsuarioPersona.plugin(uniqueValidator, {message: '{PATH} debe de ser único'});


export const TipoUsuarioPersona = model('TipoUsuarioPersona', tipoUsuarioPersona);


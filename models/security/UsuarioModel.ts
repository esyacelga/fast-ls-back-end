import {model, Schema,} from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const usuarioModel = new Schema({
    playerId: {type: String},
    clave: {type: String},
    avatar: {
        type: String,
        default: 'av-1.png'
    },
    estado: {type: Number, required: [true, 'El estado es necesario'], default: 1}
});
usuarioModel.plugin(uniqueValidator, {message: '{PATH} debe de ser único'});

export const UsuarioModel = model('UsuarioModel', usuarioModel);

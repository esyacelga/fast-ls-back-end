import {model, Schema,} from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const usuario = new Schema({
    playerId: {type: String},
    avatar: {
        type: String,
        default: 'av-1.png'
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario']
    },
    estado: {type: Number, required: [true, 'El estado es necesario'], default: 1}
});
usuario.plugin(uniqueValidator, {message: '{PATH} debe de ser único'});

export const Usuario = model('Usuario', usuario);

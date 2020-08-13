import {Document, model, Schema} from 'mongoose';
import bcrypt from 'bcrypt';


const usuarioSchema = new Schema({

    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    playerId: {
        type: String,
    },
    avatar: {
        type: String,
        default: 'av-1.png'
    },

    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario']
    },
    password: {
        type: String,
    }

});


usuarioSchema.method('compararPassword', function (password: string = ''): boolean {

    if (bcrypt.compareSync(password, this.password)) {
        return true;
    } else {
        return false;
    }

});


interface IUsuario extends Document {
    nombre: string;
    email: string;
    password: string;
    avatar: string;
    playerId: string;

    compararPassword(password: string): boolean;
}


export const Usuario = model<IUsuario>('Usuario', usuarioSchema);

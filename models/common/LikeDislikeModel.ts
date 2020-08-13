import {model, Schema,} from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const likeDislikeModel = new Schema({
    persona: {
        required: [true, 'El estado es necesario'],
        type: Schema.Types.ObjectId,
        ref: 'PersonaModeloPersistencia'
    },
    articulo: {type: Schema.Types.ObjectId, ref: 'Articulo'},
    like: {type: Boolean},
    creacionFecha: {type: Date},
    modificacionFecha: {type: Date},
    estado: {type: Number, required: [true, 'El estado es necesario']}
});
likeDislikeModel.plugin(uniqueValidator, {message: '{PATH} debe de ser único'});

export const LikeDislikeModel = model('LikeDislikeModel', likeDislikeModel);

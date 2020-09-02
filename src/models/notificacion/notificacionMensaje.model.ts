import {model, Schema} from 'mongoose';

const notificacionMensajeModel = new Schema({
    articulo: {type: Schema.Types.ObjectId, ref: 'Articulo'},
    persona: {
        required: [true, 'El estado es necesario'],
        type: Schema.Types.ObjectId,
        ref: 'PersonaModeloPersistencia'
    },
    personaPrivado: {
        type: Schema.Types.ObjectId,
        ref: 'PersonaModeloPersistencia'
    },
    tipoNotificacion: {type: Number},
    estado: {
        type: Boolean,
        required: [true, 'El estado de la notificación es necesaria']
    },
    mensaje: {
        type: String,
    },
    idSegmento: {
        type: String,
    },
    nombreSegmento: {
        type: String,
    },
    like: {
        type: Boolean,
    },
    dislike: {
        type: Boolean,
    },
    created: {
        type: Date
    },
});


export const NotificacionMensajeModel = model('NotificacionMensaje', notificacionMensajeModel);

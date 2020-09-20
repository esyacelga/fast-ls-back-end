import {model, Schema} from 'mongoose';

const subscriptionModel = new Schema({
    auth: {
        type: String,
        required: [true, 'El titulo notificacion es necesario']
    },
    p256dh: {
        type: String,
        required: [true, 'El mensaje del titulo necesario']
    },
    creacionFecha: {
        type: Date, default: new Date()
    }
});


export const SubscriptionModel = model('SubscriptionModel', subscriptionModel);

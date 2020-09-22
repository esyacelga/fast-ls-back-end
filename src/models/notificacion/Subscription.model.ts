import {model, Schema} from 'mongoose';

const subscriptionModel = new Schema({
    auth: {
        type: String,
        required: [true, 'El auth  es necesario']
    },
    endpoint: {
        type: String,
        required: [true, 'El endpoint es necesario']
    },
    p256dh: {
        type: String,
        required: [true, 'El p256dh es necesario']
    },
    creacionFecha: {
        type: Date, default: new Date()
    }
});


export const SubscriptionModel = model('SubscriptionModel', subscriptionModel);

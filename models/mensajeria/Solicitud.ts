import {model, Schema} from "mongoose";

const solicitudCabecera = new Schema({
    usuario: {required: [true, 'El estado es necesario'], type: Schema.Types.ObjectId, ref: 'UsuarioModel'},
    fechaCreacion: {type: Date},
    solicitudDetalle: [{type: Schema.Types.ObjectId, ref: 'SolicitudDetalle'}],
    estado: {type: Number, required: [true, 'El estado es necesario']}
});

const solicitudDetalle = new Schema({
    cantidad: {type: Number},
    articulo: {type: Schema.Types.ObjectId, ref: 'Articulo'},
    estado: {type: Number, required: [true, 'El estado es necesario']}
});

export const SolicitudCabecera = model('SolicitudCabecera', solicitudCabecera);
export const SolicitudDetalle = model('SolicitudDetalle', solicitudDetalle);


/*
var mongoose = require('mongoose')
    , Schema = mongoose.Schema

var personSchema = Schema({
    _id: Schema.Types.ObjectId,
    name: String,
    age: Number,
    stories: [{type: Schema.Types.ObjectId, ref: 'Story'}]
});

var storySchema = Schema({
    _creator: {type: Schema.Types.ObjectId, ref: 'Person'},
    title: String,
    fans: [{type: Schema.Types.ObjectId, ref: 'Person'}]
});

var Story = mongoose.model('Story', storySchema);
var Person = mongoose.model('Person', personSchema);
*/

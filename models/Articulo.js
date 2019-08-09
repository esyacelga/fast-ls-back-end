var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;


var articulo = new Schema({
    descripcion: { type: String, required: [true, 'El descripcion es necesario'] },
    precioUnitario: { type: Number, required: [true, 'precioUnitario es necesario'] },
    cantidadDisponible: { type: Number, required: [true, 'cantidadDisponible es necesario'] },
    articuloSegmento:{	type: Schema.Types.ObjectId,	ref: 'AriculoSegmento' },
    imagen:{type: String, required: [true, 'La imagen es requerida']},
    estado: { type: Number, required: [true, 'El estado es necesario'] }
});

articulo.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });

module.exports = mongoose.model('Ariculo', articulo);

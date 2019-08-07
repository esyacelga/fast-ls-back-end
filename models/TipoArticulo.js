var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;


var tipoArticulo = new Schema({
    descripcion: { type: String, required: [true, 'la descripcion es necesario'] },
    codigo: { type: String, required: [true, 'El codigo es necesario'] },
    estado: { type: Number, required: [true, 'El estado es necesario'] }
});
tipoArticulo.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });
module.exports = mongoose.model('TipoArticulo', tipoArticulo);

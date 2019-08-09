var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;


var articuloSegemento = new Schema({
    descripcion: { type: String, required: [true, 'El nombre es necesario'] },
    codigo: { type: String, required: [true, 'El codigo es necesario'] },
    tipoArticulo:{	type: Schema.Types.ObjectId,	ref: 'TipoArticulo' },
    estado: { type: Number, required: [true, 'El estado es necesario'] }
});
articuloSegemento.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });
module.exports = mongoose.model('AriculoSegmento', articuloSegemento);

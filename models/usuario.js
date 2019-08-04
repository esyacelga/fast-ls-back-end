var mongoose = require('mongoose');
var schema = mongoose.Schema;

var usuarioSchema = new Schema({
    nombre: {type: String, require: [true, 'El nombre es necesario']},
    correo: {type: String, unique: true, require: [true, 'El correo es necesario']},
    correo: {type: String, require: [true, 'Contraseña es necesaria']},
    img: {type: String, require: false},
    role: {type: String, require: true, default: 'USER_ROL'},

});


module.exports = mongoose.model('Usuario', usuarioSchema);

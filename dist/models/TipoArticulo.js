"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
const tipoArticulo = new mongoose_1.Schema({
    descripcion: { type: String, required: [true, 'la descripcion es necesario'] },
    codigo: { type: String, unique: true, required: [true, 'El codigo es necesario'] },
    estado: { type: Number, required: [true, 'El estado es necesario'] }
});
tipoArticulo.plugin(mongoose_unique_validator_1.default, { message: '{PATH} debe de ser único' });
exports.TipoArticulo = mongoose_1.model('TipoArticulo', tipoArticulo);

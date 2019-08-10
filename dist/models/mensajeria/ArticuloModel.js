"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
const articulo = new mongoose_1.Schema({
    descripcion: { type: String, required: [true, 'El descripcion es necesario'] },
    unidadAlmacenada: { type: Number, required: [true, 'unidadAlmacenada es necesario'] },
    unidadCosto: { type: Number, required: [true, 'unidadCosto es necesario'] },
    articuloSegmento: { type: mongoose_1.Schema.Types.ObjectId, ref: 'ArticuloSegmento' },
    img: { type: String },
    estado: { type: Number, required: [true, 'El estado es necesario'] }
});
articulo.plugin(mongoose_unique_validator_1.default, { message: '{PATH} debe de ser único' });
exports.Articulo = mongoose_1.model('Articulo', articulo);

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
const articuloSegmento = new mongoose_1.Schema({
    descripcion: { type: String, required: [true, 'El descripcion es necesario'] },
    tipoArticulo: { type: mongoose_1.Schema.Types.ObjectId, ref: 'TipoArticulo' },
    estado: { type: Number, required: [true, 'El estado es necesario'] }
});
articuloSegmento.plugin(mongoose_unique_validator_1.default, { message: '{PATH} debe de ser único' });
exports.ArticuloSegmento = mongoose_1.model('ArticuloSegmento', articuloSegmento);

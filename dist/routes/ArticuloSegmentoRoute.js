"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ArticuloSegmentoService_1 = require("./service/ArticuloSegmentoService");
const articuloSegmentoRoute = express_1.Router();
/**
 * Obtiene todos
 */
articuloSegmentoRoute.get('/', ArticuloSegmentoService_1.ObtenerTodosArticuloSegmento);
/**
 * Crea un registro
 */
articuloSegmentoRoute.post('/', ArticuloSegmentoService_1.RegistrarArticuloSegmento);
/**
 * Actualiza un registro
 */
articuloSegmentoRoute.put('/', ArticuloSegmentoService_1.ActualizarArticuloSegmento);
exports.default = articuloSegmentoRoute;

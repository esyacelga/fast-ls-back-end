"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ArticuloService_1 = require("./service/ArticuloService");
const articuloRoute = express_1.Router();
/**
 * Obtiene todos
 */
articuloRoute.put('/obtenerTodos', ArticuloService_1.ObtenerTodos);
/**
 * Crea un registro
 */
articuloRoute.post('/', ArticuloService_1.Registrar);
/**
 * Actualiza un registro
 */
articuloRoute.put('/', ArticuloService_1.Actualizar);
exports.default = articuloRoute;

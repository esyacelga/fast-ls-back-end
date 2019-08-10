"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const TipoArticuloService_1 = require("./service/TipoArticuloService");
const tipoArticulo = express_1.Router();
/**
 * Obtiene todos
 */
tipoArticulo.put('/obtenerTodosTipoArticulo', TipoArticuloService_1.ObtenerTodos);
/**
 * Crea un registro
 */
tipoArticulo.post('/', TipoArticuloService_1.RegistrarTipoArticulo);
/**
 * Actualiza un registro
 */
tipoArticulo.put('/', TipoArticuloService_1.ActualizarTipoArticulo);
exports.default = tipoArticulo;

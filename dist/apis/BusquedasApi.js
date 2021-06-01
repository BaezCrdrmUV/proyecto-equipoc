"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.busquedasApi = void 0;
const express_1 = require("express");
const ServicioBusquedas_1 = require("../services/ServicioBusquedas");
const express_2 = __importDefault(require("express"));
//import {servicioAlbumes} from '../services/ServicioAlbumes';
class BusquedasApi {
    constructor() {
        this.app = express_2.default();
        this.router = express_1.Router();
        this.routes();
    }
    routes() {
        this.router.get('/buscarPorArtista', express_2.default.json(), this.buscarPorArtista);
        //this.router.put('/actualizar',express.json() ,this.actualizarAlbum);
        //this.router.get('/buscar',express.json() ,this.buscarAlbumes);
    }
    //
    async buscarPorArtista(req, res, nextFunction) {
        let respuesta;
        try {
            if (req.query.nombreArtista != undefined) {
                respuesta = await ServicioBusquedas_1.servicioBusquedas.buscarArtistaPorNombre(req.query.nombreArtista);
                if (respuesta.estatus == true) {
                    res.status(201);
                    res.send(respuesta);
                }
                else {
                    res.status(204);
                    res.send(respuesta);
                }
            }
        }
        catch (error) {
            res.send(respuesta);
        }
    }
}
exports.busquedasApi = new BusquedasApi().router;
//# sourceMappingURL=BusquedasApi.js.map
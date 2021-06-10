"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multimediaApi = void 0;
const express_1 = __importDefault(require("express"));
const ServicioPortadas_1 = require("../services/ServicioPortadas");
const ServicioCanciones_1 = require("../services/ServicioCanciones");
const fileUpload = require('express-fileupload');
let multer = require('multer');
class MultimediaApi {
    constructor() {
        this.router = express_1.default.Router();
        this.routes();
        this.upload = fileUpload();
    }
    routes() {
        this.router.post('/subirPortadaArtista', this.subirPortadaArtista); // ?ids=12345...,23426...,63464....
        this.router.post('/subirPortadaAlbum', this.subirPortadaAlbum);
        this.router.put('/actualizarPortadaAlbum', this.actualizarPortadaAlbum);
        this.router.put('/actualizarPortadaArtista', this.actualizarPortadaArtista);
        this.router.post('/subirCancion', this.subirCancion);
        this.router.get('/buscarPortadaId', this.buscarPortadaPorId);
        this.router.get('/buscarPortadaArtista', this.buscarPortadaArtista);
        this.router.get('/buscarPortadaAlbum', this.buscarPortadaAlbum);
        this.router.get('/buscarUrlCancion', this.buscarUrlCancion);
    }
    async subirPortadaArtista(req, res, nextFunction) {
        let respuesta;
        try {
            respuesta = await ServicioPortadas_1.servicioPortadas.subirPortadaArtista(req);
            res.send(respuesta);
        }
        catch (error) {
            res.send(respuesta);
        }
    }
    async subirPortadaAlbum(req, res, nextFunction) {
        let respuesta;
        try {
            respuesta = await ServicioPortadas_1.servicioPortadas.subirPordataAlbum(req);
            res.send(respuesta);
        }
        catch (error) {
            res.send(respuesta);
        }
    }
    async actualizarPortadaAlbum(req, res, nextFunction) {
        let respuesta;
        try {
            respuesta = await ServicioPortadas_1.servicioPortadas.actualizarPordataAlbum(req);
            res.send(respuesta);
        }
        catch (error) {
            res.send(respuesta);
        }
    }
    async actualizarPortadaArtista(req, res, nextFunction) {
        let respuesta;
        try {
            respuesta = await ServicioPortadas_1.servicioPortadas.actualizarPordataArtista(req);
            res.send(respuesta);
        }
        catch (error) {
            res.send(respuesta);
        }
    }
    async subirCancion(req, res, nextFunction) {
        let respuesta;
        try {
            respuesta = await ServicioCanciones_1.servicioCanciones.subirCancion(req);
            res.send(respuesta);
        }
        catch (error) {
            res.send(respuesta);
        }
    }
    async buscarPortadaPorId(req, res, nextFunction) {
        let respuesta;
        if (req.query.idPortada != (undefined || "")) {
            try {
                respuesta = await ServicioPortadas_1.servicioPortadas.buscarPortadaPorId(req.query.idPortada);
                res.send(respuesta);
            }
            catch (error) {
                res.send(respuesta);
            }
        }
    }
    async buscarPortadaAlbum(req, res, nextFunction) {
        let respuesta;
        if (req.query.idAlbum != (undefined || "")) {
            try {
                respuesta = await ServicioPortadas_1.servicioPortadas.buscarPortadaPorIdAlbum(req.query.idAlbum);
                res.send(respuesta);
            }
            catch (error) {
                res.send(respuesta);
            }
        }
    }
    async buscarPortadaArtista(req, res, nextFunction) {
        let respuesta;
        try {
            respuesta = await ServicioPortadas_1.servicioPortadas.buscarPortadaPorIdArtista(req.query.idArtista);
            res.send(respuesta);
        }
        catch (error) {
            res.send(respuesta);
        }
    }
    async buscarUrlCancion(req, res, nextFunction) {
        let respuesta;
        try {
            if (req.query.idCancion != undefined) {
                respuesta = await ServicioCanciones_1.servicioCanciones.buscarUrlDeCancion(req.query.idCancion);
                res.send(respuesta);
            }
        }
        catch (error) {
            res.send(respuesta);
        }
    }
}
exports.multimediaApi = new MultimediaApi().router;
//# sourceMappingURL=multimediaApi.js.map
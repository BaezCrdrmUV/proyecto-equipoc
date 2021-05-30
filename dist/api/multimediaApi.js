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
        this.router.post('/subirCancion', this.subirCancion);
        this.router.get('/buscarPortadaId/:idPortada', this.buscarPortadaPorId);
        this.router.get('/buscarPortadaArtista/:idArtista', this.buscarPortadaArtista);
        this.router.get('/buscarPortadaAlbum/:idAlbum', this.buscarPortadaAlbum);
        this.router.get('/buscarUrlCancion/:idCancion', this.buscarUrlCancion);
    }
    async subirPortadaArtista(req, res, nextFunction) {
        let respuesta;
        try {
            respuesta = await ServicioPortadas_1.servicioPortadas.subirPortadaArtista(req);
            if (respuesta.estatus == true) {
                res.status(201);
                res.send(respuesta);
            }
            else {
                res.status(204);
                res.send(respuesta);
            }
        }
        catch (error) {
            res.send(respuesta);
        }
    }
    async subirPortadaAlbum(req, res, nextFunction) {
        let respuesta;
        try {
            respuesta = await ServicioPortadas_1.servicioPortadas.subirPordataAlbum(req);
            if (respuesta.estatus == true) {
                res.status(201);
                res.send(respuesta);
            }
            else {
                res.status(204);
                res.send(respuesta);
            }
        }
        catch (error) {
            res.send(respuesta);
        }
    }
    async subirCancion(req, res, nextFunction) {
        let respuesta;
        try {
            respuesta = await ServicioCanciones_1.servicioCanciones.subirCancion(req);
            if (respuesta.estatus == true) {
                res.status(201);
                res.send(respuesta);
            }
            else {
                res.status(204);
                res.send(respuesta);
            }
        }
        catch (error) {
            res.send(respuesta);
        }
    }
    async buscarPortadaPorId(req, res, nextFunction) {
        let respuesta;
        try {
            respuesta = await ServicioPortadas_1.servicioPortadas.buscarPortadaPorId(req.body);
            if (respuesta.estatus == true) {
                res.status(201);
                res.send(respuesta);
            }
            else {
                res.status(204);
                res.send(respuesta);
            }
        }
        catch (error) {
            res.send(respuesta);
        }
    }
    async buscarPortadaAlbum(req, res, nextFunction) {
        let respuesta;
        try {
            respuesta = await ServicioPortadas_1.servicioPortadas.buscarPortadaPorIdAlbum(req.body);
            if (respuesta.estatus == true) {
                res.status(201);
                res.send(respuesta);
            }
        }
        catch (error) {
            res.send(respuesta);
        }
    }
    async buscarPortadaArtista(req, res, nextFunction) {
        let respuesta;
        try {
            respuesta = await ServicioPortadas_1.servicioPortadas.buscarPortadaPorIdArtista(req.body);
            if (respuesta.estatus == true) {
                res.status(201);
                res.send(respuesta);
            }
            else {
                res.status(204);
                res.send(respuesta);
            }
        }
        catch (error) {
            res.send(respuesta);
        }
    }
    async buscarUrlCancion(req, res, nextFunction) {
        let respuesta;
        try {
            if (req.query.idArtista != undefined) {
                respuesta = await ServicioCanciones_1.servicioCanciones.buscarUrlDeCancion(req.body);
                if (respuesta.estatus == true) {
                    res.status(201);
                    res.send(respuesta);
                }
                else {
                    res.status(204);
                    res.send(respuesta);
                }
            }
            else if (req.query.nombreArtista != undefined) {
                //respuesta =  await servicioArtistas.buscarArtistaPorNombre(req.query.nombreArtista);
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
exports.multimediaApi = new MultimediaApi().router;
//# sourceMappingURL=multimediaApi.js.map
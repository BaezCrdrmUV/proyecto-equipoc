"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.streamingApi = void 0;
const express_1 = require("express");
const express_2 = __importDefault(require("express"));
class StreamingApi {
    constructor() {
        this.app = express_2.default();
        this.router = express_1.Router();
        this.routes();
    }
    routes() {
        //this.app.use(express.json());
        //this.app.use(express.urlencoded({ extended: true }));
        this.router.post('/', function () {
            console.log("algo");
        }); // ?ids=12345...,23426...,63464....
        //this.router.put('/subirCancion' ,this.subirCancion);
        //this.router.get('/buscarPortadaArtista/:idArtista' ,this.buscarPortadaArtista);
        //this.router.get('/buscarPortadaAlbum/:idAlbum' ,this.buscarPortadaAlbum);
        //this.router.get('/buscarUrlCancion/:idCancion' ,this.buscarPortadaArtista);
    }
}
exports.streamingApi = new StreamingApi().router;
//# sourceMappingURL=streamingApi.js.map
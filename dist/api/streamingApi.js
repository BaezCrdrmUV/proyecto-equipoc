"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.streamingApi = void 0;
const express_1 = __importDefault(require("express"));
const ServicioStreaming_1 = require("../services/ServicioStreaming");
const fs = __importStar(require("fs"));
class StreamingApi {
    constructor() {
        this.router = express_1.default.Router();
        this.routes();
    }
    routes() {
        this.router.use(express_1.default.json());
        this.router.get('/artistas/:artista/:album/:cancion/dash/:archivo', this.reproducirCancion); // ?ids=12345...,23426...,63464....
    }
    async reproducirCancion(req, res, nextFunction) {
        let respuesta;
        try {
            if (req.params.artista != undefined && req.params.album != undefined && req.params.cancion != undefined && req.params.archivo != null) {
                respuesta = await ServicioStreaming_1.servicioStreaming.obtenerArchivoDeReproduccion(req.params.artista, req.params.album, req.params.cancion, req.params.archivo);
                if (respuesta.estatus == true) {
                    try {
                        let readStream = fs.createReadStream(respuesta.datos);
                        console.log("a punto de streamear");
                        readStream.pipe(res);
                    }
                    catch (excepcion) {
                        console.log("EXCEPCION " + excepcion);
                    }
                }
            }
        }
        catch (error) {
            res.send(respuesta);
        }
    }
}
exports.streamingApi = new StreamingApi().router;
//# sourceMappingURL=streamingApi.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestManager = void 0;
const axios_1 = __importDefault(require("axios"));
const MensajesManager_1 = require("./MensajesManager");
class RequestManager {
    async getRequest(url, paramsP = {}) {
        let axiosConfig = {
            method: 'get',
            url: url,
            responseType: 'json'
        };
        if (paramsP != null) {
            axiosConfig = {
                method: 'get',
                url: url,
                responseType: 'json',
                params: paramsP
            };
        }
        let respuestaFinal = {
            estatus: false,
            mensaje: "",
            datos: new Array(),
            errores: new Array()
        };
        let artistasA = new Array();
        try {
            let res = await axios_1.default(axiosConfig);
            if (res.data.datos.length > 0) {
                return MensajesManager_1.MensajesManager.crearMensajeDeExitoRequestServicio("consulta realizada con exito", res.data);
            }
            else {
                return MensajesManager_1.MensajesManager.crearMensajeDeErrorRequestServicio("No se obtuvieron resultados");
            }
        }
        catch (excepcion) {
            return MensajesManager_1.MensajesManager.crearMensajeDeErrorRequestServicio("No se obtuvieron resultados", excepcion);
        }
    }
}
exports.RequestManager = RequestManager;
//# sourceMappingURL=RequestManager.js.map
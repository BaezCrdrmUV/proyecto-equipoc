"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.servicioStreaming = exports.ServicioStreaming = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const global_1 = require("../config/global");
const MensajesManager_1 = require("../utilities/MensajesManager");
class ServicioStreaming {
    obtenerArchivoDeReproduccion(artista, album, cancion, archivo) {
        let indexMpd = path_1.default.join(global_1.rutaBaseCancionesYPortadas, artista, album, cancion, "dash", archivo);
        console.log("INDEX2MPD " + indexMpd);
        if (fs_1.default.existsSync(indexMpd)) {
            return MensajesManager_1.MensajesManager.crearMensajeDeExito("cancion obtenida con exito", indexMpd);
        }
        else {
            return MensajesManager_1.MensajesManager.crearMensajeDeError("No existe esa cancion", "No existe esa cancion");
        }
    }
}
exports.ServicioStreaming = ServicioStreaming;
exports.servicioStreaming = new ServicioStreaming();
//# sourceMappingURL=ServicioStreaming.js.map
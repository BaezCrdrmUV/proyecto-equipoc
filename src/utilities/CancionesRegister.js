"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CancionesRegister = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const global_1 = require("../config/global");
const path_1 = __importDefault(require("path"));
const MensajesManager_1 = require("./MensajesManager");
const child_process_1 = require("child_process");
const global_2 = require("../config/global");
class CancionesRegister {
    async guardarCancion(datosDeArchivo) {
        let rutaBaseDeGuardadoCancion = await this.crearRutaDeGuardadoCancion(datosDeArchivo);
        let nombreCancionConExtension = datosDeArchivo.nombreArchivoCancion + datosDeArchivo.formato;
        let rutaDeGuardadoFinal = path_1.default.join(rutaBaseDeGuardadoCancion.rutaDeGuardado, nombreCancionConExtension);
        let respuestaFinal = null;
        try {
            await fs_extra_1.default.writeFile(rutaDeGuardadoFinal, datosDeArchivo.cancion.data);
        }
        catch (excepcion) {
            respuestaFinal = MensajesManager_1.MensajesManager.crearMensajeDeErrorGuardadoFisico(excepcion, "Error al escribir el archivo");
            respuestaFinal.erroresDeGuardado.push(excepcion);
            return respuestaFinal;
        }
        return MensajesManager_1.MensajesManager.crearMensajeDeExitoDeGuardadoFisico("la cancion se escribio correctamente", rutaDeGuardadoFinal, rutaBaseDeGuardadoCancion.rutaDeGuardadoPublica);
    }
    async crearRutaDeGuardadoCancion(datosDeArchivo) {
        let rutaDeGuardado = path_1.default.join(global_1.rutaBaseCancionesYPortadas, datosDeArchivo.nombreArtista, datosDeArchivo.nombreAlbum, datosDeArchivo.nombreCancion);
        let rutaDeGuardadoPublica = path_1.default.join(global_1.rutaBaseAccesoPublicoPortadasYCanciones, "artistas", datosDeArchivo.nombreArtista, datosDeArchivo.nombreAlbum, datosDeArchivo.nombreCancion, "dash", "index.mpd");
        try {
            await fs_extra_1.default.mkdirs(rutaDeGuardado);
        }
        catch (excepcion) {
            return MensajesManager_1.MensajesManager.crearMensajeDeErrorGuardadoFisico(excepcion, "no se pudo crear la ruta de guardado");
        }
        return MensajesManager_1.MensajesManager.crearMensajeDeExitoDeGuardadoFisico("ruta creada exitosamente", rutaDeGuardado, rutaDeGuardadoPublica);
    }
    async borrarCancion(urlCancion) {
        fs_extra_1.default.remove(urlCancion);
    }
    segmentarCancionParaStreaming(urlCancion) {
        if (urlCancion != undefined) {
            let comandoDeEjecucion = '"' + global_2.rutaScriptDeSegmentacion + '"' + " " + '"' + urlCancion + '"';
            console.log("URLCANCION " + urlCancion);
            child_process_1.exec(comandoDeEjecucion, (err, stdout, stderr) => {
                if (err) {
                    console.log("ERR: " + err);
                }
                if (stderr) {
                    console.log("STDERR: " + stderr);
                }
                console.log("Resultado:" + stdout);
            });
        }
    }
    static convertirBytesAMegaBytes(bytes) {
        return (bytes / 1024) / 1024;
    }
    static convertirBytesAKiloBytes(bytes) {
        return bytes / 1024;
    }
}
exports.CancionesRegister = CancionesRegister;
//# sourceMappingURL=CancionesRegister.js.map
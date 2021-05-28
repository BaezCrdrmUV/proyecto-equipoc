"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesRegister = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const global_1 = require("../config/global");
const path_1 = __importDefault(require("path"));
const MensajesManager_1 = require("./MensajesManager");
class FilesRegister {
    async guardarPortadaArtistaEnFileSystem(datosDeArchivo) {
        let respuestaDeCreacionDeDirectorios = await this.crearRutaDeGuardadoPortadaArtista(datosDeArchivo);
        let nombreImagenConExtension = datosDeArchivo.nombreImagen + datosDeArchivo.formato;
        let rutaDeGuardadoFinal = path_1.default.join(respuestaDeCreacionDeDirectorios.rutaDeGuardado, nombreImagenConExtension);
        let respuestaFinal = null;
        try {
            await fs_extra_1.default.writeFile(rutaDeGuardadoFinal, datosDeArchivo.portada.data);
        }
        catch (excepcion) {
            respuestaFinal = MensajesManager_1.MensajesManager.crearMensajeDeErrorGuardadoFisico(excepcion, "Error al escribir el archivo");
            respuestaFinal.erroresDeGuardado.push(excepcion);
            return respuestaFinal;
        }
        return MensajesManager_1.MensajesManager.crearMensajeDeExitoDeGuardadoFisico("la portada se escribio correctamente", respuestaDeCreacionDeDirectorios.rutaDeGuardado);
    }
    async guardarPortadaAlbumEnFileSystem(datosDeArchivo) {
        let respuestaDeCreacionDeDirectorios = await this.crearRutaDeGuardadoPortadaAlbum(datosDeArchivo);
        let nombreImagenConExtension = datosDeArchivo.nombreImagen + datosDeArchivo.formato;
        let rutaDeGuardadoFinal = path_1.default.join(respuestaDeCreacionDeDirectorios.rutaDeGuardado, nombreImagenConExtension);
        let respuestaFinal = null;
        try {
            await fs_extra_1.default.writeFile(rutaDeGuardadoFinal, datosDeArchivo.portada.data);
        }
        catch (excepcion) {
            respuestaFinal = MensajesManager_1.MensajesManager.crearMensajeDeErrorGuardadoFisico(excepcion, "Error al escribir el archivo");
            respuestaFinal.erroresDeGuardado.push(excepcion);
            return respuestaFinal;
        }
        return MensajesManager_1.MensajesManager.crearMensajeDeExitoDeGuardadoFisico("la portada se escribio correctamente", respuestaDeCreacionDeDirectorios.rutaDeGuardado);
    }
    async crearRutaDeGuardadoPortadaArtista(datosDeArchivo) {
        let rutaDeGuardado = path_1.default.join(global_1.rutaBaseCancionesYPortadas, datosDeArchivo.nombreArtista, "portadas");
        try {
            await fs_extra_1.default.mkdirs(rutaDeGuardado);
        }
        catch (excepcion) {
            return MensajesManager_1.MensajesManager.crearMensajeDeErrorGuardadoFisico(excepcion, "no se crear la ruta de guardado");
        }
        return MensajesManager_1.MensajesManager.crearMensajeDeExitoDeGuardadoFisico("ruta creada exitosamente", rutaDeGuardado);
    }
    async crearRutaDeGuardadoPortadaAlbum(datosDeArchivo) {
        let rutaDeGuardado = path_1.default.join(global_1.rutaBaseCancionesYPortadas, datosDeArchivo.nombreArtista, datosDeArchivo.nombreAlbum, 'portadas');
        try {
            await fs_extra_1.default.mkdirs(rutaDeGuardado);
        }
        catch (excepcion) {
            return MensajesManager_1.MensajesManager.crearMensajeDeErrorGuardadoFisico(excepcion, "no se crear la ruta de guardado");
        }
        return MensajesManager_1.MensajesManager.crearMensajeDeExitoDeGuardadoFisico("ruta creada exitosamente", rutaDeGuardado);
    }
}
exports.FilesRegister = FilesRegister;
//# sourceMappingURL=FilesRegister.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortadasRegister = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const global_1 = require("../config/global");
const path_1 = __importDefault(require("path"));
const MensajesManager_1 = require("./MensajesManager");
class PortadasRegister {
    async guardarPortadaArtistaEnFileSystem(datosDeArchivo) {
        let respuestaDeCreacionDeDirectorios = await this.crearRutaDeGuardadoPortadaArtista(datosDeArchivo);
        let nombreImagenConExtension = datosDeArchivo.nombreDeImagen + datosDeArchivo.formato;
        let rutaDeGuardadoFinal = path_1.default.join(respuestaDeCreacionDeDirectorios.rutaDeGuardado, nombreImagenConExtension);
        respuestaDeCreacionDeDirectorios.rutaDeGuardadoPublica = path_1.default.join(respuestaDeCreacionDeDirectorios.rutaDeGuardadoPublica, nombreImagenConExtension);
        let respuestaFinal = null;
        try {
            await fs_extra_1.default.writeFile(rutaDeGuardadoFinal, datosDeArchivo.portada.data);
        }
        catch (excepcion) {
            respuestaFinal = MensajesManager_1.MensajesManager.crearMensajeDeErrorGuardadoFisico(excepcion, "Error al escribir el archivo");
            respuestaFinal.erroresDeGuardado.push(excepcion);
            return respuestaFinal;
        }
        return MensajesManager_1.MensajesManager.crearMensajeDeExitoDeGuardadoFisico("la portada se escribio correctamente", rutaDeGuardadoFinal, respuestaDeCreacionDeDirectorios.rutaDeGuardadoPublica);
    }
    async guardarPortadaAlbumEnFileSystem(datosDeArchivo) {
        let respuestaDeCreacionDeDirectorios = await this.crearRutaDeGuardadoPortadaAlbum(datosDeArchivo);
        let nombreImagenConExtension = datosDeArchivo.nombreDeImagen + datosDeArchivo.formato;
        let rutaDeGuardadoFinal = path_1.default.join(respuestaDeCreacionDeDirectorios.rutaDeGuardado, nombreImagenConExtension);
        //se agrega el nombre del archivo de portada a la ruta publica
        respuestaDeCreacionDeDirectorios.rutaDeGuardadoPublica = path_1.default.join(respuestaDeCreacionDeDirectorios.rutaDeGuardadoPublica, nombreImagenConExtension);
        let respuestaFinal = null;
        try {
            await fs_extra_1.default.writeFile(rutaDeGuardadoFinal, datosDeArchivo.portada.data);
        }
        catch (excepcion) {
            respuestaFinal = MensajesManager_1.MensajesManager.crearMensajeDeErrorGuardadoFisico(excepcion, "Error al escribir el archivo");
            respuestaFinal.erroresDeGuardado.push(excepcion);
            return respuestaFinal;
        }
        return MensajesManager_1.MensajesManager.crearMensajeDeExitoDeGuardadoFisico("la portada se escribio correctamente", rutaDeGuardadoFinal, respuestaDeCreacionDeDirectorios.rutaDeGuardadoPublica);
    }
    async crearRutaDeGuardadoPortadaArtista(datosDeArchivo) {
        let rutaDeGuardado = path_1.default.join(global_1.rutaBaseCancionesYPortadas, datosDeArchivo.nombreArtista, "portadas");
        let rutaDeGuardadoPublica = path_1.default.join(global_1.rutaBaseAccesoPublicoPortadasYCanciones, datosDeArchivo.nombreArtista, "portadas");
        try {
            await fs_extra_1.default.mkdirs(rutaDeGuardado);
        }
        catch (excepcion) {
            return MensajesManager_1.MensajesManager.crearMensajeDeErrorGuardadoFisico(excepcion, "no se crear la ruta de guardado");
        }
        return MensajesManager_1.MensajesManager.crearMensajeDeExitoDeGuardadoFisico("ruta creada exitosamente", rutaDeGuardado, rutaDeGuardadoPublica);
    }
    async crearRutaDeGuardadoPortadaAlbum(datosDeArchivo) {
        let rutaDeGuardado = path_1.default.join(global_1.rutaBaseCancionesYPortadas, datosDeArchivo.nombreArtista, datosDeArchivo.nombreAlbum, 'portadas');
        let rutaDeGuardadoPublica = path_1.default.join(global_1.rutaBaseAccesoPublicoPortadasYCanciones, datosDeArchivo.nombreArtista, datosDeArchivo.nombreAlbum, 'portadas');
        try {
            await fs_extra_1.default.mkdirs(rutaDeGuardado);
        }
        catch (excepcion) {
            return MensajesManager_1.MensajesManager.crearMensajeDeErrorGuardadoFisico(excepcion, "no se crear la ruta de guardado");
        }
        return MensajesManager_1.MensajesManager.crearMensajeDeExitoDeGuardadoFisico("ruta creada exitosamente", rutaDeGuardado, rutaDeGuardadoPublica);
    }
    async borrarPortada(urlPortada) {
        fs_extra_1.default.remove(urlPortada);
    }
}
exports.PortadasRegister = PortadasRegister;
//# sourceMappingURL=PortadasRegister.js.map
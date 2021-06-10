"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.servicioPortadas = void 0;
const PortadasRegister_1 = require("../utilities/PortadasRegister");
const MensajesManager_1 = require("../utilities/MensajesManager");
const PortadasRepository_1 = require("../bd/controllersBd/PortadasRepository");
const FormateadorEntradasDeRegistro_1 = require("../utilities/FormateadorEntradasDeRegistro");
let sharp = require('sharp');
class ServicioPortadas {
    async subirPortadaArtista(datosPortada) {
        let filesRegister = new PortadasRegister_1.PortadasRegister();
        let datosPreparados;
        let resultadoDeEscritura;
        if (datosPortada.body != null && datosPortada.files != null) {
            datosPreparados = FormateadorEntradasDeRegistro_1.FormateadorEntradasDeRegistro.prepararDatosParaGuardadoDePortadas(datosPortada);
            resultadoDeEscritura = await filesRegister.guardarPortadaArtistaEnFileSystem(datosPreparados.datosParaArchivo);
        }
        else {
            return MensajesManager_1.MensajesManager.crearMensajeDeErrorDeValidacion("el cuerpo de la peticion y el archivo de portada asociado deben contener valores");
        }
        if (resultadoDeEscritura.estatus == true) {
            let portadasRepository = new PortadasRepository_1.PortadasRepository();
            //se asigna la url de gaurdado al objeto que se guardara en bd
            datosPreparados.datosParaRegistroEnBd.urlDePortada = resultadoDeEscritura.rutaDeGuardado;
            datosPreparados.datosParaRegistroEnBd.urlPublicaDePortada = resultadoDeEscritura.rutaDeGuardadoPublica;
            let respuestaBd;
            respuestaBd = await portadasRepository.registrarPortada(datosPreparados.datosParaRegistroEnBd);
            if (respuestaBd.estatus == false) {
                console.log("ELIMINANDO PORTADA");
                await filesRegister.borrarPortada(resultadoDeEscritura.urlCancion);
                console.log("PORTADA ELMINADA");
            }
            return respuestaBd;
        }
        else {
            let erroresDeGuardadoFisico = resultadoDeEscritura.resultadoDeOperacion.erroresDeGuardado;
            return MensajesManager_1.MensajesManager.crearMensajeDeError(erroresDeGuardadoFisico, "Error al registrar la portada");
        }
    }
    async subirPordataAlbum(datosPortada) {
        let filesRegister = new PortadasRegister_1.PortadasRegister();
        let datosPreparados = FormateadorEntradasDeRegistro_1.FormateadorEntradasDeRegistro.prepararDatosParaGuardadoDePortadas(datosPortada);
        let resultadoDeEscritura = await filesRegister.guardarPortadaAlbumEnFileSystem(datosPreparados.datosParaArchivo);
        if (resultadoDeEscritura.estatus == true) {
            let portadasRepository = new PortadasRepository_1.PortadasRepository();
            //se asigna la url de guardado al objeto que se guardara en bd
            datosPreparados.datosParaRegistroEnBd.urlDePortada = resultadoDeEscritura.rutaDeGuardado;
            datosPreparados.datosParaRegistroEnBd.urlPublicaDePortada = resultadoDeEscritura.rutaDeGuardadoPublica;
            let respuestaBd;
            respuestaBd = await portadasRepository.registrarPortada(datosPreparados.datosParaRegistroEnBd);
            if (respuestaBd.estatus == false) {
                console.log("ELIMINANDO PORTADA");
                await filesRegister.borrarPortada(resultadoDeEscritura.urlCancion);
                console.log("PORTADA ELMINADA");
            }
            return respuestaBd;
        }
        else {
            let erroresDeGuardadoFisico = resultadoDeEscritura.resultadoDeOperacion.erroresDeGuardado;
            return MensajesManager_1.MensajesManager.crearMensajeDeError(erroresDeGuardadoFisico, "Error al registrar la portada");
        }
    }
    async actualizarPordataAlbum(datosPortada) {
        let filesRegister = new PortadasRegister_1.PortadasRegister();
        console.log("ACTUALIZANDO PORTADA ");
        let datosPreparados = FormateadorEntradasDeRegistro_1.FormateadorEntradasDeRegistro.prepararDatosParaActualizadoDePortadas(datosPortada);
        let resultadoDeEscritura = await filesRegister.guardarPortadaAlbumEnFileSystem(datosPreparados.datosParaArchivo);
        if (resultadoDeEscritura.estatus == true) {
            let portadasRepository = new PortadasRepository_1.PortadasRepository();
            //se asigna la url de guardado al objeto que se guardara en bd
            datosPreparados.datosParaRegistroEnBd.urlDePortada = resultadoDeEscritura.rutaDeGuardado;
            datosPreparados.datosParaRegistroEnBd.urlPublicaDePortada = resultadoDeEscritura.rutaDeGuardadoPublica;
            let respuestaBd;
            respuestaBd = await portadasRepository.actualizarPortada(datosPreparados.datosParaRegistroEnBd);
            if (respuestaBd.estatus == false) {
                console.log("ELIMINANDO PORTADA");
                await filesRegister.borrarPortada(resultadoDeEscritura.urlCancion);
                console.log("PORTADA ELMINADA");
            }
            return respuestaBd;
        }
        else {
            let erroresDeGuardadoFisico = resultadoDeEscritura.resultadoDeOperacion.erroresDeGuardado;
            return MensajesManager_1.MensajesManager.crearMensajeDeError(erroresDeGuardadoFisico, "Error al registrar la portada");
        }
    }
    async actualizarPordataArtista(datosPortada) {
        let filesRegister = new PortadasRegister_1.PortadasRegister();
        console.log("ACTUALIZANDO PORTADA ");
        let datosPreparados = FormateadorEntradasDeRegistro_1.FormateadorEntradasDeRegistro.prepararDatosParaActualizadoDePortadas(datosPortada);
        let resultadoDeEscritura = await filesRegister.guardarPortadaArtistaEnFileSystem(datosPreparados.datosParaArchivo);
        if (resultadoDeEscritura.estatus == true) {
            let portadasRepository = new PortadasRepository_1.PortadasRepository();
            //se asigna la url de guardado al objeto que se guardara en bd
            datosPreparados.datosParaRegistroEnBd.urlDePortada = resultadoDeEscritura.rutaDeGuardado;
            datosPreparados.datosParaRegistroEnBd.urlPublicaDePortada = resultadoDeEscritura.rutaDeGuardadoPublica;
            let respuestaBd;
            respuestaBd = await portadasRepository.actualizarPortada(datosPreparados.datosParaRegistroEnBd);
            if (respuestaBd.estatus == false) {
                console.log("ELIMINANDO PORTADA");
                await filesRegister.borrarPortada(resultadoDeEscritura.urlCancion);
                console.log("PORTADA ELMINADA");
            }
            return respuestaBd;
        }
        else {
            let erroresDeGuardadoFisico = resultadoDeEscritura.resultadoDeOperacion.erroresDeGuardado;
            return MensajesManager_1.MensajesManager.crearMensajeDeError(erroresDeGuardadoFisico, "Error al registrar la portada");
        }
    }
    async buscarPortadaPorId(idPortada) {
        console.log("ID PORTADA 1" + idPortada);
        let portadasRepository = new PortadasRepository_1.PortadasRepository();
        let respuestaBd;
        try {
            respuestaBd = await portadasRepository.obtenerPortadaPorId(idPortada);
        }
        catch (excepcion) {
            return MensajesManager_1.MensajesManager.crearMensajeDeError(excepcion, "error al consultar la portada");
        }
        return respuestaBd;
    }
    async buscarPortadaPorIdAlbum(idAlbum) {
        console.log("ID PORTADA ALBUM 1 " + idAlbum);
        let portadasRepository = new PortadasRepository_1.PortadasRepository();
        let respuestaBd;
        try {
            respuestaBd = await portadasRepository.obtenerPortadaPorIdAlbum(idAlbum);
        }
        catch (excepcion) {
            return MensajesManager_1.MensajesManager.crearMensajeDeError(excepcion, "error al consultar la portada");
        }
        return respuestaBd;
    }
    async buscarPortadaPorIdArtista(idArtista) {
        console.log("ID PORTADA ALBUM 1 " + idArtista);
        let portadasRepository = new PortadasRepository_1.PortadasRepository();
        let respuestaBd;
        try {
            respuestaBd = await portadasRepository.obtenerPortadaPorIdArtista(idArtista);
        }
        catch (excepcion) {
            return MensajesManager_1.MensajesManager.crearMensajeDeError(excepcion, "error al consultar la portada");
        }
        return respuestaBd;
    }
}
exports.servicioPortadas = new ServicioPortadas();
//# sourceMappingURL=ServicioPortadas.js.map
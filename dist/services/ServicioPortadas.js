"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.servicioPortadas = void 0;
const PortadasRegister_1 = require("../utilities/PortadasRegister");
const global_1 = require("../config/global");
const MensajesManager_1 = require("../utilities/MensajesManager");
const PortadasRepository_1 = require("../bd/controllersBd/PortadasRepository");
let sharp = require('sharp');
class ServicioPortadas {
    async subirPortadaArtista(datosPortada) {
        let filesRegister = new PortadasRegister_1.PortadasRegister();
        let datosPreparados = this.prepararDatosParaGuardadoDePortadas(datosPortada);
        let resultadoDeEscritura = await filesRegister.guardarPortadaArtistaEnFileSystem(datosPreparados.datosParaArchivo);
        if (resultadoDeEscritura.estatus == true) {
            let portadasRepository = new PortadasRepository_1.PortadasRepository();
            //se asigna la url de gaurdado al objeto que se guardara en bd
            datosPreparados.datosParaRegistroEnBd.urlCancion = resultadoDeEscritura.rutaDeGuardado;
            let respuestaBd;
            try {
                respuestaBd = await portadasRepository.registrarPortada(datosPreparados.datosParaRegistroEnBd);
                if (respuestaBd.estatus == false) {
                    console.log("ELIMINANDO PORTADA");
                    await filesRegister.borrarPortada(resultadoDeEscritura.urlCancion);
                    console.log("PORTADA ELMINADA");
                }
            }
            catch (excepcion) {
                console.log("EXCEPCION: " + excepcion);
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
        let datosPreparados = this.prepararDatosParaGuardadoDePortadas(datosPortada);
        let resultadoDeEscritura = await filesRegister.guardarPortadaAlbumEnFileSystem(datosPreparados.datosParaArchivo);
        if (resultadoDeEscritura.estatus == true) {
            /*  TO DO
            llamar registro en bd y armar respuesta
            final con base en el resultado de ambas operaciones
         */
            filesRegister.borrarPortada(resultadoDeEscritura.rutaDeGuardado);
            return resultadoDeEscritura;
        }
        else {
            return resultadoDeEscritura;
        }
    }
    buscarPortadaPorId(idPortada) {
    }
    buscarPortadaPorIdArtista(idArtista) {
    }
    buscarPortadaPorIdAlbum(idAlbum) {
    }
    prepararDatosParaGuardadoDePortadas(datosPortada) {
        let datosParaArchivo = {
            nombreImagen: global_1.nombrePredeterminadoDePortadas,
            formato: "." + datosPortada.files.portada.mimetype.split("/")[1],
            nombreArtista: datosPortada.body.nombreArtista,
            nombreAlbum: datosPortada.body.nombreAlbum,
            portada: datosPortada.files.portada
        };
        let datosParaRegistroEnBd = {
            fkIdArtista: datosPortada.body.fkIdArtista,
            fkIdAlbum: datosPortada.body.fkIdAlbum,
            nombreImagen: global_1.nombrePredeterminadoDePortadas,
            formato: datosParaArchivo.formato,
            urlCancion: datosPortada.body.urlDePortada,
            fkIdEstatus: parseInt(datosPortada.body.fkIdEstatus)
        };
        let datosPreparados = {
            datosParaArchivo,
            datosParaRegistroEnBd
        };
        return datosPreparados;
    }
    manejadorDeError(error, info) {
        console.log(error);
        console.log(info);
    }
}
exports.servicioPortadas = new ServicioPortadas();
//# sourceMappingURL=ServicioPortadas.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.servicioPortadas = void 0;
const FilesRegister_1 = require("../utilities/FilesRegister");
const global_1 = require("../config/global");
class ServicioPortadas {
    async subirPortadaArtista(datosPortada) {
        let filesRegister = new FilesRegister_1.FilesRegister();
        let datosPreparados = this.prepararDatosParaGuardadoDePortadas(datosPortada);
        let resultadoDeEscritura = await filesRegister.guardarPortadaArtistaEnFileSystem(datosPreparados.datosParaArchivo);
        if (resultadoDeEscritura.estatus == true) {
            /*  TO DO
            llamar registro en bd y armar respuesta
            final con base en el resultado de ambas operaciones
         */
            return resultadoDeEscritura;
        }
        else {
            return resultadoDeEscritura;
        }
    }
    async subirPordataAlbum(datosPortada) {
        let filesRegister = new FilesRegister_1.FilesRegister();
        let datosPreparados = this.prepararDatosParaGuardadoDePortadas(datosPortada);
        let resultadoDeEscritura = await filesRegister.guardarPortadaAlbumEnFileSystem(datosPreparados.datosParaArchivo);
        if (resultadoDeEscritura.estatus == true) {
            /*  TO DO
            llamar registro en bd y armar respuesta
            final con base en el resultado de ambas operaciones
         */
            return resultadoDeEscritura;
        }
        else {
            return resultadoDeEscritura;
        }
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
            urlDePortada: datosPortada.body.urlDePortada,
            fkIdEstatus: datosPortada.body.fkIdEstatus
        };
        let datosPreparados = {
            datosParaArchivo,
            datosParaRegistroEnBd
        };
        return datosPreparados;
    }
}
exports.servicioPortadas = new ServicioPortadas();
//# sourceMappingURL=ServicioPortadas.js.map
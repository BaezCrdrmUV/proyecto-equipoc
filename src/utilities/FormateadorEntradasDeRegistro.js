"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormateadorEntradasDeRegistro = void 0;
const global_1 = require("../config/global");
const global_2 = require("../config/global");
const CancionesRegister_1 = require("../utilities/CancionesRegister");
class FormateadorEntradasDeRegistro {
    static prepararDatosParaGuardadoDePortadas(datosPortada) {
        let datosParaArchivo = {
            nombreDeImagen: global_1.nombrePredeterminadoDePortadas,
            formato: "." + datosPortada.files.portada.mimetype.split("/")[1],
            nombreArtista: datosPortada.body.nombreArtista,
            nombreAlbum: datosPortada.body.nombreAlbum,
            portada: datosPortada.files.portada
        };
        let datosParaRegistroEnBd = {
            fkIdArtista: datosPortada.body.fkIdArtista,
            fkIdAlbum: datosPortada.body.fkIdAlbum,
            nombreDeImagen: global_1.nombrePredeterminadoDePortadas,
            formato: datosParaArchivo.formato,
            urlDePortada: datosPortada.body.urlDePortada,
            urlPublicaDePortada: "",
            fkIdEstatus: parseInt(datosPortada.body.fkIdEstatus)
        };
        let datosPreparados = {
            datosParaArchivo,
            datosParaRegistroEnBd
        };
        return datosPreparados;
    }
    static prepararDatosParaActualizadoDePortadas(datosPortada) {
        let datosParaArchivo = {
            nombreDeImagen: global_1.nombrePredeterminadoDePortadas,
            formato: "." + datosPortada.files.portada.mimetype.split("/")[1],
            nombreArtista: datosPortada.body.nombreArtista,
            nombreAlbum: datosPortada.body.nombreAlbum,
            portada: datosPortada.files.portada
        };
        let datosParaRegistroEnBd = {
            id: datosPortada.body.id,
            fkIdArtista: datosPortada.body.fkIdArtista,
            fkIdAlbum: datosPortada.body.fkIdAlbum,
            nombreDeImagen: global_1.nombrePredeterminadoDePortadas,
            formato: datosParaArchivo.formato,
            urlDePortada: datosPortada.body.urlDePortada,
            urlPublicaDePortada: "",
            fkIdEstatus: parseInt(datosPortada.body.fkIdEstatus)
        };
        let datosPreparados = {
            datosParaArchivo,
            datosParaRegistroEnBd
        };
        return datosPreparados;
    }
    static prepararDatosParaGuardadoDeCanciones(datosCancion) {
        let datosParaArchivo = {
            nombreArchivoCancion: global_2.nombrePredeterminadoDeCanciones,
            formato: "." + datosCancion.files.cancion.name.split(".")[1],
            nombreArtista: datosCancion.body.nombreArtista,
            nombreAlbum: datosCancion.body.nombreAlbum,
            nombreCancion: datosCancion.body.nombreCancion,
            cancion: datosCancion.files.cancion
        };
        if (datosCancion.body.fkIdEstatus == undefined || datosCancion.body.fkIdEstatus === "") {
            datosCancion.body.fkIdEstatus = 1;
        }
        if (datosCancion.body.fkIdPortada == (undefined || "")) {
            datosCancion.body.fkIdPortada = null;
        }
        let datosParaRegistroEnBd = {
            fkIdCancion: datosCancion.body.fkIdCancion,
            fkIdPortada: datosCancion.body.fkIdPortada,
            nombreDelArchivo: global_2.nombrePredeterminadoDeCanciones,
            tamanoEnMb: CancionesRegister_1.CancionesRegister.convertirBytesAKiloBytes(datosParaArchivo.cancion.size),
            formato: datosParaArchivo.formato,
            codigoIsrc: datosCancion.body.codigoIsrc,
            urlCancion: datosCancion.body.urlCancion,
            urlPublicaCancion: datosCancion.body.urlPublicaCancion,
            fkIdEstatus: parseInt(datosCancion.body.fkIdEstatus)
        };
        let datosPreparados = {
            datosParaArchivo,
            datosParaRegistroEnBd
        };
        return datosPreparados;
    }
}
exports.FormateadorEntradasDeRegistro = FormateadorEntradasDeRegistro;
//# sourceMappingURL=FormateadorEntradasDeRegistro.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArchivosPortadasParser = void 0;
const ArchivoPortada_1 = require("../bd/entity/ArchivoPortada");
class ArchivosPortadasParser {
    static jsonToArchivosPortadas(archivoPortadaJson) {
        let archivoDePortada = new ArchivoPortada_1.ArchivoPortada();
        archivoDePortada.id = archivoPortadaJson.id,
            archivoDePortada.fkIdArtista = archivoPortadaJson.fkIdArtista;
        archivoDePortada.fkIdAlbum = archivoPortadaJson.fkIdAlbum;
        archivoDePortada.nombreDeImagen = archivoPortadaJson.nombreImagen;
        archivoDePortada.formato = archivoPortadaJson.formato;
        archivoDePortada.urlDePortada = archivoPortadaJson.urlCancion;
        archivoDePortada.fkIdEstatus = archivoPortadaJson.fkIdEstatus;
        return archivoDePortada;
    }
    static archivoPortadaToJson(archivoPortada) {
        let archivoPortadaJson = {
            fkIdArtista: archivoPortada.fkIdArtista,
            fkIdAlbum: archivoPortada.fkIdAlbum,
            nombreImagen: archivoPortada.nombreDeImagen,
            formato: archivoPortada.formato,
            urlCancion: archivoPortada.urlDePortada,
            fkIdEstatus: archivoPortada.fkIdEstatus
        };
        return archivoPortadaJson;
    }
}
exports.ArchivosPortadasParser = ArchivosPortadasParser;
//# sourceMappingURL=ArchivosPortadasParser.js.map
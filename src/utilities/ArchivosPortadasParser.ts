import {ArchivoPortada} from "../bd/entity/ArchivoPortada";


export class ArchivosPortadasParser{

    static jsonToArchivosPortadas(archivoPortadaJson):ArchivoPortada{
       
        let archivoDePortada = new ArchivoPortada();
        archivoDePortada.id = archivoPortadaJson.id,
        archivoDePortada.fkIdArtista = archivoPortadaJson.fkIdArtista; 
        archivoDePortada.fkIdAlbum = archivoPortadaJson.fkIdAlbum;
        archivoDePortada.nombreImagen = archivoPortadaJson.nombreImagen;
        archivoDePortada.formato = archivoPortadaJson.formato;
        archivoDePortada.urlDePortada = archivoPortadaJson.urlCancion;
        archivoDePortada.fkIdEstatus = archivoPortadaJson.fkIdEstatus;
        return archivoDePortada;
    }

    static archivoPortadaToJson(archivoPortada:ArchivoPortada){
        let archivoPortadaJson ={
            fkIdArtista:archivoPortada.fkIdArtista,
            fkIdAlbum:archivoPortada.fkIdAlbum,
            nombreImagen:archivoPortada.nombreImagen,
            formato:archivoPortada.formato,
            urlCancion:archivoPortada.urlDePortada,
            fkIdEstatus:archivoPortada.fkIdEstatus
            
        }
        return archivoPortadaJson;
    }

}

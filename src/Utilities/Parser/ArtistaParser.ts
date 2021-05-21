import { Album } from "../../bd/entity/Album";
import {Artista} from "../../bd/entity/Artista";
import {AlbumParser} from "./AlbumesParser";


export class ArtistaParser{

    static jsonToArtista(datosArtista):Artista{
       
        let artista = new Artista();
        artista.id = datosArtista.id;
        artista.nombre = datosArtista.nombre;
        artista.nombreArtistico = datosArtista.nombreArtistico;
        artista.anoDeNacimiento = datosArtista.fechaDeNacimiento;
        artista.web = datosArtista.web;
        artista.fkIdEstatus = datosArtista.fkIdEstatus;
        artista.nacionalidad = datosArtista.nacionalidad;
        if(datosArtista.albumes != (null || undefined)){
            datosArtista.albumes.forEach(album => {
                let albumParsed = AlbumParser.jsonToAlbum(album);
                artista.albumes.push(albumParsed);
            });
        }
       
        return artista;
    }

    static artistaToJson(artista:Artista){
        let artistaJson ={
                id:artista.id,
                nombre:artista.nombre,
                nombreArtistico:artista.nombreArtistico,
                anoDeNacimiento:artista.anoDeNacimiento,
                web:artista.web,
                fkIdEstatus:artista.fkIdEstatus,
                nacionalidad:artista.nacionalidad,
                albumes: artista.albumes 
            }

            return artistaJson;
        }    
}

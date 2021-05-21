import { Artista } from "../../bd/entity/Artista";
import {Cancion} from "../../bd/entity/Cancion";


export class CancionParser{

    static jsonToCancion(cancionJson):Cancion{
       
        let cancion = new Cancion();
        cancion.id = cancionJson.id,
        cancion.fkIdAlbum = cancionJson.fkIdAlbum;
        cancion.titulo = cancionJson.titulo; 
        cancion.numeroDeTrack = cancionJson.numeroDeTrack;
        cancion.genero = cancionJson.genero;
        cancion.duracion = cancionJson.duracion;
        cancion.contenidoExplicito = cancionJson.contenidoExplicito;
        cancion.album = cancionJson.album;

        return cancion;
    }

    static cancionToJson(cancion:Cancion){
        let cancionJson ={
            id:cancion.id,
            fkIdAlbum:cancion.fkIdAlbum, 
            titulo: cancion.titulo,
            numeroDeTrack: cancion.numeroDeTrack, 
            genero: cancion.genero, 
            duracion: cancion.duracion, 
            contenidoExplicito: 0,
            fkIdEstatus:cancion.fkIdEstatus,
            album:cancion.album
        }

        return cancionJson;
    }

}

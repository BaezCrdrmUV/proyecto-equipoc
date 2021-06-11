import {getConnection,getRepository,getConnectionManager,createConnection,Like} from "typeorm";
import {Album} from "../entity/Album";
import {AlbumParser} from "../../Utilities/Parser/AlbumesParser";
import {Cancion} from "../entity/Cancion";
import {Artista} from "../entity/Artista";
import {MensajesManager} from "../../Utilities/MensajesManager/MensajesManager";
import {v4 as uuidv4} from "uuid";
import {validateOrReject} from "class-validator";
import { isUndefined } from "util";

export class AlbumesRepository {

    public  async  crearAlbum(album:Album):Promise<any>{
  
         
        try{
        
            album.id = uuidv4();
            album.fkIdArtista = album.fkIdArtista; 
            album.titulo = album.titulo;
            album.duracion = album.duracion;
            album.numeroDeTracks = album.numeroDeTracks;
            album.companiaProductora = album.companiaProductora;
            album.tipoDeAlbum = album.tipoDeAlbum;
            album.anoDeLanzamiento = album.anoDeLanzamiento;
            album.fkIdEstatus=1;
            try{
                validateOrReject(album);
            }catch(excepcionDeValidacion){
                return MensajesManager.crearMensajeDeErrorDeValidacion(excepcionDeValidacion);
            }
            const albumRegistrado =await getConnection().manager.save(album);
         
        }catch(excepcion){
           MensajesManager.crearMensajeDeError(excepcion);
        }

        return MensajesManager.crearMensajeDeExito("album creado con exito");
    }

    public async actualizarAlbum (albumP:Album):Promise<any>{
        let album;    
        try{
          
            console.log("CONEXION CREADA");
            console.log("ID ALBUM "+albumP.id);
            album =await getRepository(Album).findOneOrFail(albumP.id);
            console.log("BSUQUEDA REALIZADA");
            if(album == null){
                console.log("BUSQUEDA NULA");
                return MensajesManager.crearMensajeDeErrorDeValidacion(null);
            }
            console.log("COMIENZA ASIGNACION");
            album.fkIdArtista = albumP.fkIdArtista; 
            album.titulo = albumP.titulo;
            album.duracion = albumP.duracion;
            album.numeroDeTracks = albumP.numeroDeTracks;
            album.companiaProductora = albumP.companiaProductora;
            album.tipoDeAlbum = albumP.tipoDeAlbum;
            album.anoDeLanzamiento = albumP.anoDeLanzamiento;
            album.fkIdEstatus = albumP.fkIdEstatus;
            console.log("TERMINA ASIGNACION");
            try{
                console.log("VALICACION");
                await validateOrReject(album);
            }catch(excepcionDeValidacion){
                console.log("FALLO LA VALIDACION");
                return MensajesManager.crearMensajeDeErrorDeValidacion(excepcionDeValidacion);
            }
            await getRepository(Album).save(album);
            console.log("GUARDADO EXITOSO");
        }catch(excepcion){
            console.log("FALLO EL GUARDADO");
            return MensajesManager.crearMensajeDeError(excepcion);
        }

        return MensajesManager.crearMensajeDeExito("album actualizado con exito");
    }

    public async obtenerAlbumPorId(idAlbum:string):Promise<any>{
        let album;
        try{
            
            console.log("ID ALBUM: "+idAlbum);
            console.log("SE CREA CONEXION");
          
            album = await getRepository(Album).findOneOrFail({where:{id:idAlbum}});
            console.log("VALOR DEL ALBUM"+album);
            if(album == undefined){
                console.log("EL RESULTADO ES NULL")
                return MensajesManager.crearMensajeDeErrorDeValidacion(null);
            }
            console.log("SE SALTO EL IF");
            
        }catch(excepcion){
            console.log("HUBO EXCEPCION: ");
            return MensajesManager.crearMensajeDeError(excepcion);
        }
        
        return MensajesManager.crearMensajeDeExito("consulta exitosa",album);

    }

    public async obtenerAlbumPorNombre(nombreAlbum : string,cancionesOmitidas,numeroDeCancionesEsperadas):Promise<any>{
        let albumes = null;
        
        try{
            
            albumes = await getRepository(Album).find({where:{titulo:Like("%"+nombreAlbum+"%")}, 
                                                            skip:cancionesOmitidas,
                                                            take:numeroDeCancionesEsperadas});
            if(albumes == undefined ||albumes.length == 0){
                return MensajesManager.crearMensajeDeErrorDeValidacion(null);
            }
        }catch(excepcion){
            return MensajesManager.crearMensajeDeError(excepcion);
        }
        return MensajesManager.crearMensajeDeExito("consulta exitosa",albumes);

    }

    public async obtenerAlbumesPorIdArtista(idArtista:string,cancionesOmitidas,numeroDeCancionesEsperadas):Promise<any>{
        let albumesDeArtista
        
        try{
            albumesDeArtista = await getRepository(Album).find({where:{fkIdArtista:idArtista},
                                                                        skip:cancionesOmitidas,
                                                                        take:numeroDeCancionesEsperadas});
            if(albumesDeArtista == null || albumesDeArtista.length == 0){
                return MensajesManager.crearMensajeDeErrorDeValidacion(null);
            }
        }catch(excepcion){
                return MensajesManager.crearMensajeDeError(excepcion);
        }
    
        return MensajesManager.crearMensajeDeExito("consulta exitosa",albumesDeArtista);
    }

   
}


import {getConnection,getRepository,getConnectionManager,createConnection, Like} from "typeorm";
import {Artista} from "../entity/Artista";
import {Album} from "../entity/Album";
import {v4 as uuidv4} from "uuid";
import {validateOrReject} from "class-validator";
import {MensajesManager} from "../../Utilities/MensajesManager/MensajesManager";

export class ArtistasRepository {

    public  async  crearArtista(datosartista:Artista):Promise<any>{
          
        try{
            let  artista = new Artista()
            artista.id = uuidv4();
	        artista.nombre = datosartista.nombre;
            artista.nombreArtistico = datosartista.nombreArtistico;
            artista.anoDeNacimiento = datosartista.anoDeNacimiento;
            artista.nacionalidad = datosartista.nacionalidad;
            artista.web = datosartista.web;
            artista.fkIdEstatus = 1;
            try{
                await validateOrReject(artista);
            }catch(excepcionDeValidacion){
                
                return MensajesManager.crearMensajeDeErrorDeValidacion(excepcionDeValidacion);
            }
            const user =await getConnection().manager.save(artista);
            
        }catch(excepcion){
           
           return MensajesManager.crearMensajeDeError(excepcion);
        }
        return MensajesManager.crearMensajeDeExito("artista registrado con exito");
    }

    public async actualizarArtista (artistaP:Artista):Promise<any>{
        try{
            
            const artista =await getRepository(Artista).findOne(artistaP.id);
            if(artista == null){
                return MensajesManager.crearMensajeDeErrorDeValidacion(null);
            }
            artista.nombre = artistaP.nombre;
            artista.nombreArtistico = artistaP.nombreArtistico;
            artista.anoDeNacimiento = artistaP.anoDeNacimiento;
            artista.web = artistaP.web;
            artista.nacionalidad = artistaP.nacionalidad;
            artista.fkIdEstatus = artistaP.fkIdEstatus;
            try{
                await validateOrReject(artista);
            }catch(excepcionesDeValidacion){ 
                return MensajesManager.crearMensajeDeErrorDeValidacion(excepcionesDeValidacion);
            }
            await getRepository(Artista).save(artistaP);
        }catch(excepcion){
            return MensajesManager.crearMensajeDeErrorDeValidacion(excepcion);
        }
        return MensajesManager.crearMensajeDeExito("datos modificados con exito")

    }

    public async buscarArtistaPorId(idArtista:string):Promise<any>{
        
        
        let artista;
        try{
            
            artista = await getRepository(Artista).findOneOrFail({where:{id:idArtista}});
            if(artista == (null|| undefined)){
                return MensajesManager.crearMensajeDeErrorDeValidacion(null);
            }            
        }catch(excepcion){
            
            return MensajesManager.crearMensajeDeError(excepcion);
        
        }
    
        return MensajesManager.crearMensajeDeExito("consulta exitosa",artista);

    }

    public async buscarArtistaPorNombre(nombreArtista:string):Promise<any>{
        
       
        let artistas = null;
        let ar = [];
    
        try{
            
            artistas = await getRepository(Artista).find({nombreArtistico:Like("%"+nombreArtista+"%")});
            if(artistas == null || artistas.length == 0){
                return MensajesManager.crearMensajeDeErrorDeValidacion(null);
            }
        }catch(excepcion){
            getConnection().close();
            return MensajesManager.crearMensajeDeErrorDeValidacion(excepcion);
        }
       
       
        return MensajesManager.crearMensajeDeExito("consulta realizada con exito",artistas);

    }


   
}


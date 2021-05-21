import {getConnection,getRepository,getConnectionManager,createConnection,In,Like} from "typeorm";
import {Cancion} from "../entity/Cancion";
import {CancionParser} from "../../Utilities/Parser/CancionParser";
import {v4 as uuidv4} from "uuid";
import {MensajesManager} from "../../Utilities/MensajesManager/MensajesManager";

export class CancionesRepository {

    public  async  crearCancion(cancionJson):Promise<any>{
  
         
        try{
            await createConnection();
            
            let  cancion =  CancionParser.jsonToCancion(cancionJson);

            cancion.id =  uuidv4();
            cancion.fkIdAlbum = cancionJson.fkIdAlbum;
            cancion.titulo = cancionJson.titulo; 
            cancion.numeroDeTrack = cancionJson.numeroDeTrack;
            cancion.genero = cancionJson.genero;
            cancion.duracion = cancionJson.duracion;
            cancion.contenidoExplicito = cancionJson.contenidoExplicito;
            cancion.fkIdEstatus = cancionJson.estado;
            const cancionRegistrada =await getConnection().manager.save(cancion);
            
           
        }catch(excepcion){
            return MensajesManager.crearMensajeDeError(excepcion);
        }finally{
            getConnection().close();
        } 
        return MensajesManager.crearMensajeDeExito("cancion guardada exitosamente");
    }

    public async actualizarCancion (cancionP:Cancion):Promise<any>{
            
        try{
            await createConnection();
            const cancion =await getRepository(Cancion).findOne(cancionP.id);
            if(cancion == null){
                return MensajesManager.crearMensajeDeErrorDeValidacion(null);
            }
            cancion.id = cancionP.id,
            cancion.fkIdAlbum = cancionP.fkIdAlbum;
            cancion.titulo = cancionP.titulo; 
            cancion.numeroDeTrack = cancionP.numeroDeTrack;
            cancion.genero = cancionP.genero;
            cancion.duracion = cancionP.duracion;
            cancion.contenidoExplicito = cancionP.contenidoExplicito;
            cancion.fkIdEstatus = cancionP.fkIdEstatus;

            await getRepository(Cancion).save(cancion);
           
        }catch(excepcion){
            return MensajesManager.crearMensajeDeError(excepcion);
        } 
        return MensajesManager.crearMensajeDeExito("cancion actualizada exitosamente: ");
    }

    public async obtenerTodasLasCanciones(cancionesOmitidas:number,numeroDeCancionesEsperadas:number):Promise<any>{
        let canciones;

        try{
            await createConnection();
            canciones = getRepository(Cancion).find({skip:cancionesOmitidas,
                                                    take:numeroDeCancionesEsperadas});
            if(canciones == undefined || canciones.length == 0){
                return MensajesManager.crearMensajeDeErrorDeValidacion(null);
            }
            
        }catch(excepcion){
            return MensajesManager.crearMensajeDeError(excepcion);
        }
        return MensajesManager.crearMensajeDeExito("consulta exitosa");
    }

    public async obtenerCancionPorId(idCancion:string):Promise<any>{
        let cancion;
        try{   
            await createConnection();
            cancion = await getRepository(Cancion).findOneOrFail({where:{id:idCancion}});
            if(cancion == undefined){
                return MensajesManager.crearMensajeDeErrorDeValidacion(null);
            }
        }catch(excepcion){
                return MensajesManager.crearMensajeDeError(excepcion);
        }
        return MensajesManager.crearMensajeDeExito("Consulta realizada con exito",cancion);
    }

    public async obtenerCancionPorNombre(nombreCancion:string,
                                        cancionesOmitidas:number,
                                        numeroDeCancionesEsperadas:number):Promise<any>{
        let canciones;
        try{   
            await createConnection();
            canciones = await getRepository(Cancion).find({where:{titulo:Like("%"+nombreCancion+"%")},
                                                                  skip:cancionesOmitidas,
                                                                  take:numeroDeCancionesEsperadas
                                                          });

            if(canciones == undefined || canciones.length == 0){
                return MensajesManager.crearMensajeDeErrorDeValidacion(null);
            }
        }catch(excepcion){
                return MensajesManager.crearMensajeDeError(excepcion);
        }
        return MensajesManager.crearMensajeDeExito("consulta realizada con exito",canciones);
    }

    public async obtenerCancionPorAlbum(idAlbum:string,
                                        cancionesOmitidas:number,
                                        numeroDeCancionesEsperadas:number):Promise<any>{
        let canciones;
        try{   
            await createConnection();
            canciones = await getRepository(Cancion).find({where:{fkIdAlbum:idAlbum},
                                                                  skip:cancionesOmitidas,
                                                                  take:numeroDeCancionesEsperadas
                                                          });
            if(canciones == undefined || canciones.length ==0){
                return MensajesManager.crearMensajeDeErrorDeValidacion(null);
            }
        }catch(excepcion){
                return MensajesManager.crearMensajeDeError(excepcion);
        }
        return MensajesManager.crearMensajeDeExito("consulta realizada con exito",canciones);
    }

    public async obtenerCancionesDeListaDeReproduccion(idCanciones:string[]):Promise<any>{
        let canciones;
        try{   
            await createConnection();
            canciones = await getRepository(Cancion).find({id:In(idCanciones)});
            if(canciones == undefined || canciones.length == 0){
                return MensajesManager.crearMensajeDeErrorDeValidacion(null);
            }
        }catch(excepcion){
            return MensajesManager.crearMensajeDeError(excepcion);
        }
        return MensajesManager.crearMensajeDeExito("consulta realizada con exito");
    }
}


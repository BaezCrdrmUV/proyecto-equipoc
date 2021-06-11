import {getConnection,getRepository,getConnectionManager,createConnection,In,Like} from "typeorm";
import {Cancion} from "../entity/Cancion";
import {CancionesListasDeReproduccion} from "../entity/cancionesListasDeReproduccion"
import {CancionParser} from "../../Utilities/Parser/CancionParser";
import {v4 as uuidv4} from "uuid";
import {MensajesManager} from "../../Utilities/MensajesManager/MensajesManager";
import {validateOrReject} from "class-validator";

export class CancionesRepository {
//comentario
    public  async  agregarCancion(cancionListaDeRerpoduccion):Promise<any>{
  
         
        try{
            let  cancionEnLista =  await getConnection().manager.create(CancionesListasDeReproduccion,cancionListaDeRerpoduccion);

            cancionEnLista.id =  uuidv4();
           
            try{
                validateOrReject(cancionEnLista);
            }catch(excepcionDeValidacion){
                return MensajesManager.crearMensajeDeErrorDeValidacion(excepcionDeValidacion);
            }
            const cancionRegistradaEnLista =await getConnection().manager.save(cancionEnLista);
            
           
        }catch(excepcion){
            return MensajesManager.crearMensajeDeError(excepcion);
        }
        return MensajesManager.crearMensajeDeExito("cancion guardada exitosamente");
    }

    public async eliminarCancion (cancionEnListaDeReproduccionP:CancionesListasDeReproduccion):Promise<any>{
        
        try{
           
            const cancionEnListaDeReproduccion =await getRepository(CancionesListasDeReproduccion).findOne({where:{fkIdCancion:cancionEnListaDeReproduccionP.fkIdCancion,
                                                                                    fkIdListaDeReproduccion:cancionEnListaDeReproduccionP.fkIdListaDeReproduccion}});
            if(cancionEnListaDeReproduccion == null){
                return MensajesManager.crearMensajeDeErrorDeValidacion(null);
            }
            cancionEnListaDeReproduccion.fkIdEstatus = 2;
           
            try{
                validateOrReject(cancionEnListaDeReproduccion);
            }catch(excepcionDeValidacion){
                return MensajesManager.crearMensajeDeErrorDeValidacion(excepcionDeValidacion);
            }

            await getRepository(CancionesListasDeReproduccion).save(cancionEnListaDeReproduccion);
           
        }catch(excepcion){
            return MensajesManager.crearMensajeDeError(excepcion);
        } 
        return MensajesManager.crearMensajeDeExito("cancion actualizada exitosamente: ");
    }

   
    
    
    public async obtenerCancionesDeListaDeReproduccion(idLista:string):Promise<any>{
        let canciones;
        try{   
           
            canciones = await getRepository(CancionesListasDeReproduccion).find({fkIdListaDeReproduccion:idLista});
            if(canciones == undefined || canciones.length == 0){
                return MensajesManager.crearMensajeDeErrorDeValidacion(null);
            }
        }catch(excepcion){
            return MensajesManager.crearMensajeDeError(excepcion);
        }
        return MensajesManager.crearMensajeDeExito("consulta realizada con exito");
    }
}


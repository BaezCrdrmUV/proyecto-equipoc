import {getConnection,getRepository,getConnectionManager,createConnection,In,Like} from "typeorm";
import {Cancion} from "../entity/Cancion";
import {CancionesListasDeReproduccion} from "../entity/CancionesListasDeReproduccion"
import {CancionParser} from "../../Utilities/Parser/CancionParser";
import {v4 as uuidv4} from "uuid";
import {MensajesManager} from "../../Utilities/MensajesManager/MensajesManager";
import {validateOrReject} from "class-validator";

export class CancionesListasDeReproduccionRepository {
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

    public async eliminarCancion (cancionEnListaDeReproduccionP):Promise<any>{
        process.on('unhandledRejection',function (error){
            console.log(error);
        });
        
        try{
           
            let cancionEnListaDeReproduccion : CancionesListasDeReproduccion =await getRepository(CancionesListasDeReproduccion).findOneOrFail({where:{fkIdCancion:cancionEnListaDeReproduccionP.fkIdCancion,
                                                                                    fkIdListaDeReproduccion:cancionEnListaDeReproduccionP.fkIdListaDeReproduccion,fkIdEstatus:1}});
            
            console.log("OBJETO "+ cancionEnListaDeReproduccion);
            console.log("ID "+cancionEnListaDeReproduccion.id)
            console.log("IDLISTA "+cancionEnListaDeReproduccion.fkIdListaDeReproduccion);
            console.log("IDCANCION "+cancionEnListaDeReproduccion.fkIdCancion);
            console.log("ESTATUS "+cancionEnListaDeReproduccion.fkIdEstatus);
            if(cancionEnListaDeReproduccion == null){
                return MensajesManager.crearMensajeDeErrorDeValidacion(null);
            }
            console.log("APUNTO DE ASIGNAR EL ESTATUS");
            cancionEnListaDeReproduccion.fkIdEstatus = 2;
            console.log("ESTATUS ASIGNADO");
            try{
                console.log("APUNTO DE VALIDAR");
                validateOrReject(cancionEnListaDeReproduccion);
                console.log("VALIDADO CORRECTAMENTE");
            }catch(excepcionDeValidacion){
                console.log("HUBO EXCEPCION");
                return MensajesManager.crearMensajeDeErrorDeValidacion(excepcionDeValidacion);
            }
            console.log("APUNTO DE EJECUTAR EL BORRADO");
            await getRepository(CancionesListasDeReproduccion).save(cancionEnListaDeReproduccion);
            console.log("SE EJECUTO EL BORRADO");
        }catch(excepcion){
            console.log("EXCEPCION AL BORRAR");
            return MensajesManager.crearMensajeDeError(excepcion);
        } 
        console.log("BORRADO EXITOSO");
        return MensajesManager.crearMensajeDeExito("tu cancion se ha eliminado de la lista ");
    }

   
    
    
    public async obtenerCancionesDeListaDeReproduccion(idLista:string):Promise<any>{
        let canciones;
        let idsCanciones = [];
        try{   
           
            canciones = await getRepository(CancionesListasDeReproduccion).find({fkIdListaDeReproduccion:idLista});
            if(canciones == undefined || canciones.length == 0){
                return MensajesManager.crearMensajeDeErrorDeValidacion(null);
            }
            canciones.forEach(registroCancionesListas => {
                idsCanciones.push(registroCancionesListas.fkIdCancion);
            });
        }catch(excepcion){
            return MensajesManager.crearMensajeDeError(excepcion);
        }
        return MensajesManager.crearMensajeDeExito("consulta realizada con exito",idsCanciones);
    }
}


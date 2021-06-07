import {getConnection,getRepository,getConnectionManager,createConnection,Like} from "typeorm";
import {ArchivoCancion} from "../entity/ArchivoCancion";
import {MensajesManager} from "../../utilities/MensajesManager";
import {v4 as uuidv4} from "uuid";
import {validateOrReject} from "class-validator";


export class CancionesRepository {

    public  async  registrarCancion(cancion):Promise<any>{
     process.on('unhandledRejection',function (error){

         console.log(error);
     });
        
        let cancionRegistrada; 
    
        try{
 
           cancion.id = uuidv4();
           let archivoCancionBd :ArchivoCancion = await getConnection().manager.create(ArchivoCancion,cancion);
           console.log("ARCHIVO CANCION: "+archivoCancionBd);
            try{
                console.log("INICIA VALIDACION");
                await validateOrReject(archivoCancionBd);
                console.log("VALICACION CORRECTA");
            }catch(excepcionDeValidacion){
                console.log("EXCEPCION EN VALIDACION");
                return MensajesManager.crearMensajeDeErrorDeValidacion(excepcionDeValidacion);
            }
            console.log("A PUNTO DE REGISTRAR");
              cancionRegistrada =await getConnection().manager.save(archivoCancionBd);
            console.log("REGISTRO CORRECTO: "+cancionRegistrada);
        }catch(excepcion){
            console.log("EXCEPCION AL REGISTRAR: "+excepcion);
           return MensajesManager.crearMensajeDeError(excepcion,"no se pudo registrar en la portada");
        }
        console.log("A PUNTO DE ENVIAR MENSJAE DE EXITO");
        return MensajesManager.crearMensajeDeExito("portada registrada con exito",cancionRegistrada);
    }

    public async actualizarCancion (cancionP:ArchivoCancion):Promise<any>{
        let cancion;    
        try{
          
            console.log("CONEXION CREADA");
            console.log("ID ALBUM "+cancionP.id);
            cancion =await getRepository(ArchivoCancion).findOneOrFail(cancionP.id);
            console.log("BSUQUEDA REALIZADA");
            if(cancion == null){
                console.log("BUSQUEDA NULA");
                return MensajesManager.crearMensajeDeErrorDeValidacion(null);
            }
            console.log("COMIENZA ASIGNACION");
            cancion.fkIdCancion = cancionP.fkIdCancion,
            cancion.fkIdPortada = cancionP.fkIdPortada,
            cancion.nombreDelArchivo = cancionP.nombreDelArchivo,
            cancion.tamanoEnMb = cancionP.tamanoEnMb,
            cancion.formato = cancionP.formato,
            cancion.codigoIsrc = cancionP.codigoIsrc,
            cancion.urlCancion = cancionP.urlCancion,
            cancion.fkIdEstatus = cancionP.fkIdEstatus
            console.log("TERMINA ASIGNACION");
            try{
                console.log("VALICACION");
                await validateOrReject(cancion);
            }catch(excepcionDeValidacion){
                console.log("FALLO LA VALIDACION");
                return MensajesManager.crearMensajeDeErrorDeValidacion(excepcionDeValidacion);
            }
            await getRepository(ArchivoCancion).save(cancion);
            console.log("GUARDADO EXITOSO");
        }catch(excepcion){
            console.log("FALLO EL GUARDADO");
            return MensajesManager.crearMensajeDeError(excepcion,"No se ha podido actualizar la portada");
        }

        return MensajesManager.crearMensajeDeExito("portada actualizado con exito");
    }

   

    public async obtenerUrlCancion(IdCancion : string):Promise<any>{
        let cancion = null;
        
        try{
            
            cancion = await getRepository(ArchivoCancion).find({where:{id:IdCancion}});
            if(cancion == undefined ||cancion.length == 0){
                return MensajesManager.crearMensajeDeErrorDeValidacion(null);
            }
        }catch(excepcion){
            return MensajesManager.crearMensajeDeError(excepcion,"Hubo un error al consultar la portada");
        }
        return MensajesManager.crearMensajeDeExito("consulta exitosa",cancion.urlCancion);

    }

   


}
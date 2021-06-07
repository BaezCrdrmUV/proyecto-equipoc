import {getConnection,getRepository,getConnectionManager,createConnection,Like} from "typeorm";
import {ArchivoPortada} from "../entity/ArchivoPortada";
import {MensajesManager} from "../../utilities/MensajesManager";
import {v4 as uuidv4} from "uuid";
import {validateOrReject} from "class-validator";
import { ArchivosPortadasParser } from "../../utilities/ArchivosPortadasParser";

export class PortadasRepository {

    public  async  registrarPortada(portada):Promise<any>{
     process.on('unhandledRejection',function (error){

         console.log(error);
     });
        
        let portadaRegistrada; 
    
        try{
 
           portada.id = uuidv4();
           let archivoPortadaBd = await getConnection().manager.create(ArchivoPortada,portada);
            try{
                console.log("INICIA VALIDACION");
                await validateOrReject(archivoPortadaBd);
                console.log("VALICACION CORRECTA");
            }catch(excepcionDeValidacion){
                console.log("EXCEPCION EN VALIDACION");
                return MensajesManager.crearMensajeDeErrorDeValidacion(excepcionDeValidacion);
            }
            console.log("A PUNTO DE REGISTRAR");
              portadaRegistrada =await getConnection().manager.save(archivoPortadaBd);
            console.log("REGISTRO CORRECTO: "+portadaRegistrada);
        }catch(excepcion){
            console.log("EXCEPCION AL REGISTRAR: "+excepcion);
           return MensajesManager.crearMensajeDeError(excepcion,"no se pudo registrar en la portada");
        }
        console.log("A PUNTO DE ENVIAR MENSJAE DE EXITO");
        return MensajesManager.crearMensajeDeExito("portada registrada con exito",portadaRegistrada);
    }

    public async actualizarPortada (portadaP:ArchivoPortada):Promise<any>{
        let portada;    
        try{
          
            console.log("CONEXION CREADA");
            console.log("ID ALBUM "+portadaP.id);
            portada =await getRepository(ArchivoPortada).findOneOrFail(portadaP.id);
            console.log("BSUQUEDA REALIZADA");
            if(portada == null){
                console.log("BUSQUEDA NULA");
                return MensajesManager.crearMensajeDeErrorDeValidacion(null);
            }
            console.log("COMIENZA ASIGNACION");
            portada.fkIdArtista = portadaP.fkIdArtista; 
            portada.fkIdAlbum = portadaP.fkIdAlbum;
            portada.formato = portadaP.formato;
            portada.nombreImagen = portadaP.nombreDeImagen;
            portada.urlCancion = portadaP.urlDePortada;
            portada.fkIdEstatus = portadaP.fkIdEstatus;
            console.log("TERMINA ASIGNACION");
            try{
                console.log("VALICACION");
                await validateOrReject(portada);
            }catch(excepcionDeValidacion){
                console.log("FALLO LA VALIDACION");
                return MensajesManager.crearMensajeDeErrorDeValidacion(excepcionDeValidacion);
            }
            await getRepository(ArchivoPortada).save(portada);
            console.log("GUARDADO EXITOSO");
        }catch(excepcion){
            console.log("FALLO EL GUARDADO");
            return MensajesManager.crearMensajeDeError(excepcion,"No se ha podido actualizar la portada");
        }

        return MensajesManager.crearMensajeDeExito("portada actualizado con exito");
    }

    public async obtenerPortadaPorId(idPortada:string):Promise<any>{
        console.log("ID PORTADA 2: "+idPortada);
        let portada;
        try{
            
            console.log("ID ALBUM: "+idPortada);
            console.log("SE CREA CONEXION");
          
            portada = await getRepository(ArchivoPortada).findOneOrFail({where:{id:idPortada}});
            console.log("VALOR DEL ALBUM"+portada);
            if(portada == undefined){
                console.log("EL RESULTADO ES NULL")
                return MensajesManager.crearMensajeDeErrorDeValidacion(null);
            }
            console.log("SE SALTO EL IF");
            
        }catch(excepcion){
            console.log("HUBO EXCEPCION: ");
            return MensajesManager.crearMensajeDeError(excepcion,"ha ocurrido un error al consultar la portada");
        }
        
        return MensajesManager.crearMensajeDeExito("consulta exitosa",portada);

    }

    public async obtenerPortadaPorIdAlbum(IdAlbum : string):Promise<any>{
        let portada = null;
        
        try{
            
            portada = await getRepository(ArchivoPortada).find({where:{fkIdAlbum:IdAlbum}});
            if(portada == undefined ||portada.length == 0){
                return MensajesManager.crearMensajeDeErrorDeValidacion(null);
            }
        }catch(excepcion){
            return MensajesManager.crearMensajeDeError(excepcion,"Hubo un error al consultar la portada");
        }
        return MensajesManager.crearMensajeDeExito("consulta exitosa",portada);

    }

    public async obtenerPortadaPorIdArtista(IdArtista : string):Promise<any>{
        let portada = null;
        
        try{
            
            portada = await getRepository(ArchivoPortada).find({where:{fkIdArtista:IdArtista}});
            if(portada == undefined ||portada.length == 0){
                return MensajesManager.crearMensajeDeErrorDeValidacion(null);
            }
        }catch(excepcion){
            return MensajesManager.crearMensajeDeError(excepcion,"Hubo un error al consultar la portada");
        }
        return MensajesManager.crearMensajeDeExito("consulta exitosa",portada);

    }

    


}
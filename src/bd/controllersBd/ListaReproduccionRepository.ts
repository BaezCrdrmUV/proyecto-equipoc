import {getConnection,getRepository,getConnectionManager,createConnection, Like,} from "typeorm";
import {ListaReproduccion} from "../entity/ListaReproduccion";
import {ListaParser} from "../../Utilities/Parser/ListaReproduccionParser";
import {MensajesManager} from "../../Utilities/MensajesManager/MensajesManager";
import {v4 as uuidv4} from "uuid";
import {validateOrReject} from "class-validator";

export class ListaReproduccionRepository {

    public  async  crearLista(listaJson):Promise<any>{
        
        let cancionRegistrada;
         
        try{
            await createConnection();
            
            let  lista =  ListaParser.jsonToLista(listaJson);

            lista.id =  uuidv4();
            lista.nombre = listaJson.nombre;
            lista.numeroDeTracks = listaJson.numeroDeTracks;
            lista.fkIdEstatus = listaJson.fkIdEstatus;
            lista.fkIdUsuario = listaJson.fkIdUsuario;


            cancionRegistrada =await getConnection().manager.save(lista);
           
        }catch(excepcion){
            return MensajesManager.crearMensajeDeError(excepcion);
        } 
        return  MensajesManager.crearMensajeDeExito("lista registrada con exito",cancionRegistrada);
    }

    public async actualizarLista (listap:ListaReproduccion):Promise<any>{
         let lista;
        
        try{
            await createConnection();
            lista =await getRepository(ListaReproduccion).findOne(listap.id);
           
            if(lista == null){
                return MensajesManager.crearMensajeDeErrorDeValidacion(null);
            }
            lista.id = listap.id;
            lista.nombre = listap.nombre;
            lista.numeroDeTracks = listap.numeroDeTracks;
            lista.fkIdEstatus = listap.fkIdEstatus;
            lista.fkIdUsuario = lista.fkIdUsuario;

            lista = await getRepository(ListaReproduccion).save(lista);
         
        }catch(excepcion){
            return MensajesManager.crearMensajeDeError(excepcion);
        }
            return MensajesManager.crearMensajeDeExito("lista registrada con exito",lista); 
    }


    public async obtenerListaPorId(idlista:string):Promise<any>{
        let lista;
        try{   
            await createConnection();
            lista = await getRepository(ListaReproduccion).findOneOrFail({where:{id:idlista}});
            
        
        }catch(excepcion){
                return MensajesManager.crearMensajeDeError(excepcion);
        }
        return MensajesManager.crearMensajeDeExito("consulta realizada con exito",lista);
    }

    public async obtenerListaPorNombre(nombreLista:string):Promise<any>{
        let listas;
        try{   
            await createConnection();
            listas = await getRepository(ListaReproduccion).find({where:{nombre:Like("%"+nombreLista+"%")}});
        }catch(excepcion){
                return MensajesManager.crearMensajeDeError(excepcion);
        }
        return MensajesManager.crearMensajeDeExito("consulta realizada con exito",listas);
    }

  

   
}


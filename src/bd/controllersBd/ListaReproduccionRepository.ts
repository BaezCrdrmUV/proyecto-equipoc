import {getConnection,getRepository,getConnectionManager,createConnection, Like,} from "typeorm";
import {ListaReproduccion} from "../entity/ListaReproduccion";
import {ListaParser} from "../../Utilities/Parser/ListaReproduccionParser";
import {MensajesManager} from "../../Utilities/MensajesManager/MensajesManager";
import {v4 as uuidv4} from "uuid";
import {validateOrReject} from "class-validator";

export class ListaReproduccionRepository {

    public  async  crearLista(listaJson){
  
         
        try{
            await createConnection();
            
            let  lista =  ListaParser.jsonToLista(listaJson);

            lista.id =  uuidv4();
            lista.nombre = listaJson.nombre;
            lista.numeroDeTracks = listaJson.numeroDeTracks;
            lista.fkIdEstatus = listaJson.fkIdEstatus;
            lista.fkIdUsuario = listaJson.fkIdEstatus;


            const cancionRegistrada =await getConnection().manager.save(lista);
            console.log("cancion guardada exitosamente: "+cancionRegistrada.nombre);
        }catch(excepcion){
            console.log(excepcion);
        } 
    }

    public async actualizarLista (listap:ListaReproduccion):Promise<ListaReproduccion>{
            
        try{
            await createConnection();
            const lista =await getRepository(ListaReproduccion).findOne(listap.id);
            if(lista == null){
                return null;
            }
            lista.id = listap.id;
            lista.nombre = listap.nombre;
            lista.numeroDeTracks = listap.numeroDeTracks;
            lista.fkIdEstatus = listap.fkIdEstatus;
            lista.fkIdUsuario = lista.fkIdUsuario;

            await getRepository(ListaReproduccion).save(lista);
            console.log("lista de reproduccion actualizada exitosamente: "+lista.nombre);
        }catch(excepcion){
            console.log(excepcion);
        } 
    }


    public async obtenerListaPorId(idlista:string):Promise<ListaReproduccion>{
        let lista;
        try{   
            await createConnection();
            lista = await getRepository(ListaReproduccion).findOneOrFail({where:{id:idlista}});
        
        }catch(excepcion){
                console.log(excepcion);
        }
        return lista;
    }

    public async obtenerListaPorNombre(nombreLista:string):Promise<ListaReproduccion[]>{
        let listas;
        try{   
            await createConnection();
            listas = await getRepository(ListaReproduccion).find({where:{nombre:Like("%"+nombreLista+"%")}});
        }catch(excepcion){
                console.log(excepcion);
        }
        return listas;
    }

  

   
}


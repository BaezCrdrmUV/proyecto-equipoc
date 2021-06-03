import axios from "axios";
import {RequestManager} from "../utilities/RequestManager";
import {rutaServicioBusquedaCanciones,rutaServicioBusquedaPortadas, rutaServicioLogin, rutaServicioRegistrar} from "../config/datosConexion";
import {MensajesManager} from "../utilities/MensajesManager";


export class ServiciosSuscripcion {
    


    public async  RegistrarUsuario(Usuario){
      
         let respuestaFinal =  {
           estatus:false,
           personaEncontrada:Object,
           errores:new Array()
         };
         let requestManager = new RequestManager();
        
         let usuarioCnsultado = await requestManager.getRequest(rutaServicioRegistrar,Usuario);
         if(usuarioCnsultado.estatus == true){
             
           try{
            usuarioCnsultado = await requestManager.getRequest(rutaServicioRegistrar,Usuario);
         
            
           }catch(excepcion){
               return MensajesManager.crearMensajeDeError("error al registrar el usuario",excepcion);
           }
        }
                  
           return  MensajesManager.crearMensajeDeExito("Usuario registrado con exito",usuarioCnsultado.datos);
     }

}



export let suscripcionService = new ServiciosSuscripcion();
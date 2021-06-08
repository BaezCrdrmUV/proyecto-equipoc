import axios from "axios";
import {RequestManager} from "../utilities/RequestManager";
import {rutaServicioBusquedaCanciones,rutaServicioBusquedaPortadas, rutaServicioLogin, rutaServicioRegistrar,rutaServicioActualizarUsuario} from "../config/datosConexion";
import {MensajesManager} from "../utilities/MensajesManager";


export class ServiciosSuscripcion {
    


    public async  RegistrarUsuario(Usuario){
      
         let respuestaFinal =  {
           estatus:false,
           personaEncontrada:Object,
           errores:new Array()
         };
         let requestManager = new RequestManager();
        
         let usuarioCnsultado = await requestManager.postRequest(rutaServicioRegistrar,Usuario);
         if(usuarioCnsultado.estatus == true){
             
           try{
            return usuarioCnsultado;
         
            
           }catch(excepcion){
               return MensajesManager.crearMensajeDeError("error al registrar el usuario",excepcion);
           }
        }
                  
           return  MensajesManager.crearMensajeDeExito("Usuario registrado con exito");
     }



     public async  ActualizarUsuario(Usuario){
      
      let respuestaFinal =  {
        estatus:false,
        personaEncontrada:Object,
        errores:new Array()
      };
      let requestManager = new RequestManager();
     
      let usuarioConsultado = await requestManager.getRequest(rutaServicioActualizarUsuario,Usuario);
      if(usuarioConsultado.estatus == true){
          
        try{
         usuarioConsultado = await requestManager.getRequest(rutaServicioActualizarUsuario,Usuario);
      
         
        }catch(excepcion){
            return MensajesManager.crearMensajeDeError("error al actualizar el usuario",excepcion);
        }
     }
               
        return  MensajesManager.crearMensajeDeExito("Usuario actualizado con exito");
  }

}










export let suscripcionService = new ServiciosSuscripcion();
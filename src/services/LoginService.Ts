import axios from "axios";
import {RequestManager} from "../utilities/RequestManager";
import {rutaServicioBusquedaCanciones,rutaServicioBusquedaPortadas, rutaServicioLogin} from "../config/datosConexion";
import {MensajesManager} from "../utilities/MensajesManager";


export class LoginService {
    


    public async  HacerLogin(Usuario){
      
         let respuestaFinal =  {
           estatus:false,
           personaEncontrada:Object,
           errores:new Array()
         };
         let requestManager = new RequestManager();
         let usuarioCnsultado = await requestManager.getRequest(rutaServicioLogin,Usuario);
       
         if(usuarioCnsultado.estatus == true){
             
           try{
            
               usuarioCnsultado = await requestManager.getRequest(rutaServicioLogin,usuarioCnsultado);
            
           }catch(excepcion){
               return MensajesManager.crearMensajeDeError("error al consultar los datos",excepcion);
           }
         }          
           return  MensajesManager.crearMensajeDeExito("UsuarioEncontrado consultados con exito",usuarioCnsultado.datos);
     }

}



export let Loginservice = new LoginService();
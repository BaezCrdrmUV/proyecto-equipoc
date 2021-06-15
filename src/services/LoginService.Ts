import axios from "axios";
import {RequestManager} from "../utilities/RequestManager";
import {rutaServicioLogin} from "../config/datosConexion";
import {MensajesManager} from "../utilities/MensajesManager";


export class LoginService {
    


    public async  HacerLogin(Usuario){
      
         let respuestaFinal =  {
           estatus:false,
           personaEncontrada:Object,
           errores:new Array()
         };
         let requestManager = new RequestManager();
         let usuarioCnsultado = await requestManager.postRequest(rutaServicioLogin,Usuario);
       
         if(usuarioCnsultado.estatus == true){
             
          
            return MensajesManager.crearMensajeDeExito("Inicio de sesion exitoso",usuarioCnsultado.datos);
           
         }          
           return  usuarioCnsultado.datos;
     }

}



export let Loginservice = new LoginService();
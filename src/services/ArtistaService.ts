import axios from "axios";
import {RequestManager} from "../utilities/RequestManager";
import {rutaRegistrarArtista,rutaActualizarArtista} from "../config/datosConexionMusica";
import {MensajesManager} from "../utilities/MensajesManager";



class ArtistaService{


    public async  RegistrarArtista(Usuario){
      
        let respuestaFinal =  {
          estatus:false,
          personaEncontrada:Object,
          errores:new Array()
        };
        let requestManager = new RequestManager();
       
        let usuarioCnsultado = await requestManager.postRequest(rutaRegistrarArtista,Usuario);
        if(usuarioCnsultado.estatus == true){
            
          try{
           return usuarioCnsultado;
        
           
          }catch(excepcion){
              return MensajesManager.crearMensajeDeError("error al registrar el usuario",excepcion);
          }
       }
                 
          return  MensajesManager.crearMensajeDeExito("Usuario registrado con exito");
    }


    public async  ActualizarArtista(Usuario){
      
        let respuestaFinal =  {
          estatus:false,
          personaEncontrada:Object,
          errores:new Array()
        };
        let requestManager = new RequestManager();
       
        let usuarioConsultado = await requestManager.putRequest(rutaActualizarArtista,Usuario);
        if(usuarioConsultado.estatus == true){
            
          
          try{
     
            return usuarioConsultado;
           
          }catch(excepcion){
              return MensajesManager.crearMensajeDeError("error al actualizar el usuario",excepcion);
          }
       }
                 
          return  MensajesManager.crearMensajeDeExito("Usuario actualizado con exito");
    }






}
export let artistaService = new ArtistaService();
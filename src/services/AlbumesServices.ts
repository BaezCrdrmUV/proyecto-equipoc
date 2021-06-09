import axios from "axios";
import {RequestManager} from "../utilities/RequestManager";
import {rutaRegistrarAlbum, rutaActualizarAlbum, rutaBuscarAlbum} from "../config/datosConexion";
import {MensajesManager} from "../utilities/MensajesManager";

class AlbumesService{


    public async  RegistrarAlbum(album){
      
        let respuestaFinal =  {
          estatus:false,
          personaEncontrada:Object,
          errores:new Array()
        };
        let requestManager = new RequestManager();
       
        let albumConsultado = await requestManager.postRequest(rutaRegistrarAlbum,album);
        if(albumConsultado.estatus == true){
            
          try{
           return albumConsultado;
        
           
          }catch(excepcion){
              return MensajesManager.crearMensajeDeError("error al registrar el album",excepcion);
          }
       }
                 
          return  MensajesManager.crearMensajeDeExito("album registrado con exito");
    }



    public async  ActualizarAlbum(album){
      
        let respuestaFinal =  {
          estatus:false,
          personaEncontrada:Object,
          errores:new Array()
        };
        let requestManager = new RequestManager();
       
        let albumConsultado = await requestManager.putRequest(rutaActualizarAlbum,album);
        if(albumConsultado.estatus == true){
            
          
          try{
     
            return albumConsultado;
           
          }catch(excepcion){
              return MensajesManager.crearMensajeDeError("error al actualizar el usuario",excepcion);
          }
       }
                 
          return  MensajesManager.crearMensajeDeExito("Usuario actualizado con exito");
    }





    public async  buscarAlbum(album){
      
        let respuestaFinal =  {
          estatus:false,
          personaEncontrada:Object,
          errores:new Array()
        };
        let requestManager = new RequestManager();
       
        let albumConsultado = await requestManager.getRequest(rutaBuscarAlbum,album);
        if(albumConsultado.estatus == true){
            
          
          try{
     
            return albumConsultado;
           
          }catch(excepcion){
              return MensajesManager.crearMensajeDeError("No se puede encontrar el album",excepcion);
          }
       }
                 
          return  MensajesManager.crearMensajeDeExito("album enconrado con exito",albumConsultado);
    }






}

export let albumService = new AlbumesService();
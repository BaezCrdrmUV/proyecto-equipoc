import axios, { AxiosRequestConfig } from "axios";
import { MensajesManager } from "./MensajesManager";

export class RequestManager {

    public async getRequest(url,paramsP ={}){
        let axiosConfig: AxiosRequestConfig ={
            method: 'get',
            url: url,
            responseType: 'json'
        }

        if(paramsP != null){
            axiosConfig = {
                method: 'get',
                url: url,
                responseType: 'json',
                params :paramsP
            }
        }
        
        let respuestaFinal = {
            estatus:false,
            mensaje :"",
            datos:new Array(),
            errores:new Array()
        }
        let artistasA = new Array();  
        
       try{
          let res =await axios(axiosConfig);
         
          if(res.data.datos.length > 0){
              return MensajesManager.crearMensajeDeExitoRequestServicio("consulta realizada con exito",res.data);
          }else{
            return MensajesManager.crearMensajeDeErrorRequestServicio("No se obtuvieron resultados");
          }
          
      }catch(excepcion){
        return MensajesManager.crearMensajeDeErrorRequestServicio("No se obtuvieron resultados",excepcion);
      }
    }

}
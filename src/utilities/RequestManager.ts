import axios, { AxiosRequestConfig } from "axios";
import { MensajesManager } from "./MensajesManager";

export class RequestManager {

    public async postRequest(url,bodyP ={}){
        let axiosConfig: AxiosRequestConfig ={
            method: 'post',
            url: url,
            data:bodyP,
            responseType: 'json'
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
              return MensajesManager.crearMensajeDeExitoRequestServicio("transaccion realizada con exito",res.data);
          }else{
            return MensajesManager.crearMensajeDeErrorRequestServicio("Error la transaccion resultados");
          }
          
      }catch(excepcion){
        return MensajesManager.crearMensajeDeErrorRequestServicio("No se obtuvieron resultados",excepcion);
      }
    }


    public async putRequest(url,bodyP ={}){
        let axiosConfig: AxiosRequestConfig ={
            method: 'put',
            url: url,
            data:bodyP,
            responseType: 'json'
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
              return MensajesManager.crearMensajeDeExitoRequestServicio("transaccion realizada con exito",res.data);
          }else{
            return MensajesManager.crearMensajeDeErrorRequestServicio("Error la transaccion resultados");
          }
          
      }catch(excepcion){
        return MensajesManager.crearMensajeDeErrorRequestServicio("No se obtuvieron resultados",excepcion);
      }
    }



    public async getRequest(url,paramsP ={},body={}){
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
            
            if(body != null){
                axiosConfig = {
                    method: 'get',
                    url: url,
                    responseType: 'json',
                    params :paramsP,
                    data:body
                }
                } 
        } else{
        if(body != null){
            axiosConfig = {
                method: 'get',
                url: url,
                responseType: 'json',
                data:body
            }
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
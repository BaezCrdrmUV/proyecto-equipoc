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
        let res;
       try{
        res =await axios(axiosConfig);
         
          if(res.data != undefined){
              return MensajesManager.crearMensajeDeExito("operacion registrada  con exito",res.data);
          }else{
            return MensajesManager.crearMensajeDeErrorRequestServicio("Error la transaccion resultados");
          }
          
      }catch(excepcion){
        return MensajesManager.crearMensajeDeErrorRequestServicio("No se obtuvieron resultados",excepcion);
      }
    }

    public async postFormRequest(url,form){
        let axiosConfig: AxiosRequestConfig ={
            method: 'post',
            url: url,
            data:form,
            headers:form.getHeaders(),
            responseType: 'json'
        }       
        let respuestaFinal = {
            estatus:false,
            mensaje :"",
            datos:new Array(),
            errores:new Array()
        }
        let artistasA = new Array();  
        let res;
       try{
        res =await axios(axiosConfig);
         
          if(res.data != undefined){
              return MensajesManager.crearMensajeDeExito("operacion registrada  con exito",res.data);
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
        let res;
       try{
          res =await axios(axiosConfig);
         
          if(res.data != undefined){
              return  MensajesManager.crearMensajeDeExito("datos actualizados con exito",res.data);
          }else{
            return MensajesManager.crearMensajeDeErrorRequestServicio("No se obtuvieron resultados");
          }
          
      }catch(excepcion){
        return MensajesManager.crearMensajeDeErrorRequestServicio("Error al realizar la transaccion",excepcion);
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
         
          if(res.data.length > 0 || res.data != undefined ){
            if(res.data.estatus == undefined){
                return MensajesManager.crearMensajeDeExito("Consulta exitosa",res.data);
            }  
            return res.data;
          }else{
            return MensajesManager.crearMensajeDeErrorRequestServicio("No se obtuvieron resultados");
          }
          
      }catch(excepcion){
        return MensajesManager.crearMensajeDeErrorRequestServicio("No se obtuvieron resultados",excepcion);
      }
    

}
}
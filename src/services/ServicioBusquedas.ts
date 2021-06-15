//import {getConnection,getRepository,getConnectionManager,createConnection} from "typeorm";
//import {Album} from "../bd/entity/Album";
//import {AlbumParser} from "../Utilities/Parser/AlbumesParser";
//import {AlbumesRepository} from "../bd/controllersBd/AlbumesRepository";
//import {AlbumParser} from "../../Parser/AlbumesParser";
//import {Cancion} from "../../entity/Cancion";
//import {Artista} from "../../entity/Artista";
//import {v4 as uuidv4} from "uuid";
import axios from "axios";
import {RequestManager} from "../utilities/RequestManager";
import {rutaBuscarCancion,rutaServicioBuscarArtista,rutaBuscarAlbum} from "../config/datosConexionMusica";
import {rutaBuscarPortadaArtista,rutaBuscarPortadaAlbum} from "../config/datosConexionMultimeda";
import {MensajesManager} from "../utilities/MensajesManager";
//const axios = require('axios').default;

export class ServicioBusquedas {

    
  public async buscarMusicaPorArtista(){
    
  }
  private async obtenerPortadas(artistaOAlbumesConsultados,requestManager,rutaPortada,params):Promise<any>{
    try{
        if(artistaOAlbumesConsultados.datos.length != undefined){
          for(let i=0;i<artistaOAlbumesConsultados.datos.length ;i++){
            
              let respuestaPortadaConsultada = await requestManager.getRequest(rutaPortada,params);
              artistaOAlbumesConsultados.datos[i].portada = respuestaPortadaConsultada.datos[0].urlPublicaDePortada;
          }
        }else{
        
            let respuestaPortadaConsultada = await requestManager.getRequest(rutaBuscarPortadaAlbum,params);
            if(respuestaPortadaConsultada.estatus == false){
              artistaOAlbumesConsultados.datos.portada = "NoEncontrada";
            }else{
              artistaOAlbumesConsultados.datos.portada = respuestaPortadaConsultada.datos.urlPublicaDePortada;
            }
           
        }
      
    }catch(excepcion){
        return MensajesManager.crearMensajeDeError("error al consultar los datos",excepcion);
    }
  }
  public async  buscarArtistaPorNombre(nombreArtistaP){
       let params = {
         nombreArtista: nombreArtistaP
       } 
        let respuestaFinal =  {
          estatus:false,
          datos:new Array(),
          errores:new Array()
        };
        let requestManager = new RequestManager();
        let artistasConsultados = await requestManager.getRequest(rutaServicioBuscarArtista,params);
      
        if(artistasConsultados.estatus == true){
          
          try{
            let paramsPortada = {
              idArtista: artistasConsultados.datos[0].id
            } 
            await this.obtenerPortadas(artistasConsultados,requestManager,rutaBuscarPortadaArtista,paramsPortada);
            /*
            for(let i=0;i<artistasConsultados.datos.length ;i++){
              let paramsPortada = {
                idArtista: artistasConsultados.datos[0].id
              } 
              let respuestaPortadaConsultada = await requestManager.getRequest(rutaBuscarPortadaArtista,paramsPortada);
              artistasConsultados.datos[i].portada = respuestaPortadaConsultada.datos[0].urlPublicaDePortada;
            }
            */
          }catch(excepcion){
              return MensajesManager.crearMensajeDeError("error al consultar los datos",excepcion);
          }
        }          
          return  MensajesManager.crearMensajeDeExito("artstas consultados con exito",artistasConsultados.datos);
    }

    public async  buscarArtistaPorId(idArtistaP){
      let params = {
        idArtista: idArtistaP
      } 
       let respuestaFinal =  {
         estatus:false,
         datos:new Array(),
         errores:new Array()
       };
       let requestManager = new RequestManager();
       let artistasConsultados = await requestManager.getRequest(rutaServicioBuscarArtista,params);
     
       if(artistasConsultados.estatus == true){
         
         try{
          let paramsPortada = {
            idArtista: artistasConsultados.datos.id
          } 
          await this.obtenerPortadas(artistasConsultados,requestManager,rutaBuscarPortadaArtista,paramsPortada)
          /* 
          for(let i=0;i<artistasConsultados.datos.length ;i++){
             let paramsPortada = {
               idArtista: artistasConsultados.datos[0].id
             } 
             let respuestaPortadaConsultada = await requestManager.getRequest(rutaBuscarPortadaArtista,paramsPortada);
             artistasConsultados.datos[i].portada = respuestaPortadaConsultada.datos[0].urlPublicaDePortada;
           }
           */
          
         }catch(excepcion){
             return MensajesManager.crearMensajeDeError("error al consultar los datos",excepcion);
         }
       }          
         return  MensajesManager.crearMensajeDeExito("artstas consultados con exito",artistasConsultados.datos);
   }

   public async  buscarAlbumPorNombre(nombreAlbumP){
    let params = {
      titulo: nombreAlbumP
    } 
     let respuestaFinal =  {
       estatus:false,
       datos:new Array(),
       errores:new Array()
     };
     let requestManager = new RequestManager();
     let albumesConsultados = await requestManager.getRequest(rutaBuscarAlbum,params);
   
     if(albumesConsultados.estatus == true){
      let paramsPortada = {
        idAlbum: albumesConsultados.datos[0].id
      } 
       try{
        await this.obtenerPortadas(albumesConsultados,requestManager,rutaBuscarPortadaAlbum,albumesConsultados)
        /* 
        for(let i=0;i<artistasConsultados.datos.length ;i++){
           let paramsPortada = {
             idArtista: artistasConsultados.datos[0].id
           } 
           let respuestaPortadaConsultada = await requestManager.getRequest(rutaBuscarPortadaAlbum,paramsPortada);
           artistasConsultados.datos[i].portada = respuestaPortadaConsultada.datos[0].urlPublicaDePortada;
         }
         */
       }catch(excepcion){
           return MensajesManager.crearMensajeDeError("error al consultar los datos",excepcion);
       }
     }          
       return  MensajesManager.crearMensajeDeExito("artstas consultados con exito",albumesConsultados.datos);
 }

 public async  buscarAlbumPorId(idAlbumP){
  let params = {
    id: idAlbumP
  } 
   let respuestaFinal =  {
     estatus:false,
     datos:new Array(),
     errores:new Array()
   };
   let requestManager = new RequestManager();
   let albumesConsultados = await requestManager.getRequest(rutaBuscarAlbum,params);
 
   if(albumesConsultados.estatus == true){
     
     try{
      let paramsPortada = {
        idAlbum: albumesConsultados.datos.id
      } 
      // las portadas se agigan dentro de ste metodo auque no recuperemos el valor devuelto
      await this.obtenerPortadas(albumesConsultados,requestManager,rutaBuscarPortadaAlbum,albumesConsultados);
      /*
      for(let i=0;i<artistasConsultados.datos.length ;i++){
         let paramsPortada = {
           idArtista: artistasConsultados.datos[0].id
         } 
         let respuestaPortadaConsultada = await requestManager.getRequest(rutaBuscarPortadaAlbum,paramsPortada);
         artistasConsultados.datos[i].portada = respuestaPortadaConsultada.datos[0].urlPublicaDePortada;
       }
       */
     }catch(excepcion){
         return MensajesManager.crearMensajeDeError("error al consultar los datos",excepcion);
     }
   }          
     return  MensajesManager.crearMensajeDeExito("artstas consultados con exito",albumesConsultados.datos);
}



    /*
    public async obtenerAlbumPorId(idAlbum){
        let resultadoDeOperacion;
        try{
            let repositorioAlbum = new AlbumesRepository();
            resultadoDeOperacion = await repositorioAlbum.obtenerAlbumPorId(idAlbum);
            console.log("MENSAJE EN SERVICIO: " +resultadoDeOperacion.mensaje);
            console.log("DATOS EN SERVICIO: "+ resultadoDeOperacion.datos.titulo);
            console.log("VALIDACION : "+ resultadoDeOperacion.erroresDeValidacion);
            console.log("ERRORES :"+resultadoDeOperacion.erroresDeGuardado);
            return resultadoDeOperacion;   
        }catch(errores){
            console.log("errores: "+ errores);
        }
       return resultadoDeOperacion;

    }

    public async obtenerAlbumPorNombre(tituloAlbum,resultadosOmitidos = 0,numeroDeResultadosEsperados = 10){
        let resultadoDeOperacion;
        try{
            let repositorioAlbum = new AlbumesRepository();
            resultadoDeOperacion = await repositorioAlbum.obtenerAlbumPorNombre(tituloAlbum,resultadosOmitidos,numeroDeResultadosEsperados);
            console.log(resultadoDeOperacion.mensaje);
            console.log(resultadoDeOperacion.datos);
            console.log(resultadoDeOperacion.erroresDeValidacion);
            console.log(resultadoDeOperacion.erroresDeGuardado);
            return resultadoDeOperacion;   
        }catch(errores){
            console.log("errores: "+ errores);
        }
       return resultadoDeOperacion;
    }

    public async obtenerAlbumesPorIdArtista(idArtista,resultadosOmitidos,numeroDeResultadosEsperados){
        let resultadoDeOperacion;
        try{
            let repositorioAlbum = new AlbumesRepository();
            resultadoDeOperacion = await repositorioAlbum.obtenerAlbumesPorIdArtista(idArtista,resultadosOmitidos,numeroDeResultadosEsperados);
            console.log(resultadoDeOperacion.mensaje);
            console.log(resultadoDeOperacion.datos);
            console.log(resultadoDeOperacion.erroresDeValidacion);
            console.log(resultadoDeOperacion.erroresDeGuardado);
            return resultadoDeOperacion;   
        }catch(errores){
            console.log("errores: "+ errores);
        }
       return resultadoDeOperacion;
    }
    */
}

export let servicioBusquedas = new ServicioBusquedas();



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
import {rutaServicioBusquedaCanciones,rutaServicioBusquedaPortadas} from "../config/datosConexion";
import {MensajesManager} from "../utilities/MensajesManager";
//const axios = require('axios').default;

export class ServicioBusquedas {

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
        let artistasConsultados = await requestManager.getRequest(rutaServicioBusquedaCanciones,params);
      
        if(artistasConsultados.estatus == true){
            
          try{
            for(let i=0;i<artistasConsultados.datos.length -1;i++){
              artistasConsultados[i].portada = await requestManager.getRequest(rutaServicioBusquedaPortadas,artistasConsultados[i].id);
            }
          }catch(excepcion){
              return MensajesManager.crearMensajeDeError("error al consultar los datos",excepcion);
          }
        }          
          return  MensajesManager.crearMensajeDeExito("artstas consultados con exito",artistasConsultados.datos);
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



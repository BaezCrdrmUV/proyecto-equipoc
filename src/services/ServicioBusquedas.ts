//import {getConnection,getRepository,getConnectionManager,createConnection} from "typeorm";
//import {Album} from "../bd/entity/Album";
//import {AlbumParser} from "../Utilities/Parser/AlbumesParser";
//import {AlbumesRepository} from "../bd/controllersBd/AlbumesRepository";
//import {AlbumParser} from "../../Parser/AlbumesParser";
//import {Cancion} from "../../entity/Cancion";
//import {Artista} from "../../entity/Artista";
//import {v4 as uuidv4} from "uuid";
import axios from "axios";
import { RequestManager } from "../utilities/RequestManager";
import { rutaBuscarCancion, rutaServicioBuscarArtista, rutaBuscarAlbum, rutaObtenerCancionesListaDeReproduccion } from "../config/datosConexionMusica";
import { rutaBuscarPortadaArtista, rutaBuscarPortadaAlbum, rutaBuscarUrlCancion } from "../config/datosConexionMultimeda";
import { MensajesManager } from "../utilities/MensajesManager";
//const axios = require('axios').default;

export class ServicioBusquedas {

  BUSQUEDA_ID_ARTISTA: number = 1;
  BUSQUEDA_ID_ALBUM: number = 2;
  BUESUQEDA_ID_CANCION: number = 3;
  BUESUQEDA_CANCIONES_LISTA_REPRODUCCION: number = 4




  public async buscarArtistaPorNombre(nombreArtistaP) {
    let params = {
      nombreArtista: nombreArtistaP
    }
    let respuestaFinal = {
      estatus: false,
      datos: new Array(),
      errores: new Array()
    };
    let requestManager = new RequestManager();
    let artistasConsultados = await requestManager.getRequest(rutaServicioBuscarArtista, params);

    if (artistasConsultados.estatus == true) {

      try {

        //await this.obtenerPortadas(artistasConsultados,requestManager,rutaBuscarPortadaArtista,this.BUSQUEDA_ID_ARTISTA);
        let paramsPortada = {
          idArtista: artistasConsultados.datos[0].id
        }
        if (artistasConsultados.datos.length != undefined) {
          for (let i = 0; i < artistasConsultados.datos.length; i++) {

            let respuestaPortadaConsultada = await requestManager.getRequest(rutaBuscarPortadaArtista, paramsPortada);
            artistasConsultados.datos[i].portada = respuestaPortadaConsultada.datos[0].urlPublicaDePortada;
          }
        } else {

          let respuestaPortadaConsultada = await requestManager.getRequest(rutaBuscarPortadaArtista, paramsPortada);
          artistasConsultados.datos.portada = respuestaPortadaConsultada[0].datos.urlPublicaDePortada;
        }
      } catch (excepcion) {
        return MensajesManager.crearMensajeDeError("error al consultar los datos", excepcion);
      }
    } else {
      return MensajesManager.crearMensajeDeError("Sin resultados", "sin resultados");
    }
    return MensajesManager.crearMensajeDeExito("artstas consultados con exito", artistasConsultados.datos);
  }

  public async buscarArtistaPorId(idArtistaP) {
    let params = {
      idArtista: idArtistaP
    }
    let respuestaFinal = {
      estatus: false,
      datos: new Array(),
      errores: new Array()
    };
    let requestManager = new RequestManager();
    let artistasConsultados = await requestManager.getRequest(rutaServicioBuscarArtista, params);

    if (artistasConsultados.estatus == true) {

      try {
        let paramsPortada = {
          idArtista: artistasConsultados.datos.id
        }
        //await this.obtenerPortadas(artistasConsultados,requestManager,rutaBuscarPortadaArtista,this.BUSQUEDA_ID_ARTISTA)

        if (artistasConsultados.datos.length != undefined) {
          for (let i = 0; i < artistasConsultados.datos.length; i++) {
            let paramsPortada = {
              idArtista: artistasConsultados.datos[0].id
            }
            let respuestaPortadaConsultada = await requestManager.getRequest(rutaBuscarPortadaArtista, paramsPortada);
            artistasConsultados.datos[i].portada = respuestaPortadaConsultada.datos[0].urlPublicaDePortada;
          }
        } else {
          let respuestaPortadaConsultada = await requestManager.getRequest(rutaBuscarPortadaArtista, paramsPortada);
          artistasConsultados.datos.portada = respuestaPortadaConsultada.datos[0].urlPublicaDePortada;
        }
      } catch (excepcion) {
        return MensajesManager.crearMensajeDeError("error al consultar los datos", excepcion);
      }
    } else {
      return MensajesManager.crearMensajeDeError("Sin resultados", "sin resultados");
    }
    return MensajesManager.crearMensajeDeExito("artstas consultados con exito", artistasConsultados.datos);
  }

  public async buscarAlbumPorNombre(nombreAlbumP) {
    let params = {
      titulo: nombreAlbumP
    }
    let respuestaFinal = {
      estatus: false,
      datos: new Array(),
      errores: new Array()
    };
    let requestManager = new RequestManager();
    let albumesConsultados = await requestManager.getRequest(rutaBuscarAlbum, params);

    if (albumesConsultados.estatus == true) {
      let paramsPortada = {
        idAlbum: albumesConsultados.datos[0].id
      }
      try {
        //await this.obtenerPortadas(albumesConsultados,requestManager,rutaBuscarPortadaAlbum,this.BUSQUEDA_ID_ALBUM)
        if (albumesConsultados.datos.length != undefined) {
          for (let i = 0; i < albumesConsultados.datos.length; i++) {

            let respuestaPortadaConsultada = await requestManager.getRequest(rutaBuscarPortadaAlbum, paramsPortada);
            albumesConsultados.datos[i].portada = respuestaPortadaConsultada.datos[0].urlPublicaDePortada;
          }
        } else {
          let respuestaPortadaConsultada = await requestManager.getRequest(rutaBuscarPortadaAlbum, paramsPortada);
          albumesConsultados.datos.portada = respuestaPortadaConsultada.datos[0].urlPublicaDePortada;
        }
      } catch (excepcion) {
        return MensajesManager.crearMensajeDeError("error al consultar los datos", excepcion);
      }
    } else {
      return MensajesManager.crearMensajeDeError("Sin resultados", "sin resultados");
    }
    return MensajesManager.crearMensajeDeExito("artstas consultados con exito", albumesConsultados.datos);
  }

  public async buscarAlbumPorId(idAlbumP) {
    let params = {
      id: idAlbumP
    }
    let respuestaFinal = {
      estatus: false,
      datos: new Array(),
      errores: new Array()
    };
    let requestManager = new RequestManager();
    let albumesConsultados = await requestManager.getRequest(rutaBuscarAlbum, params);

    if (albumesConsultados.estatus == true) {

      try {
        let paramsPortada = {
          idAlbum: albumesConsultados.datos.id
        }
        // las portadas se agigan dentro de ste metodo auque no recuperemos el valor devuelto
        //await this.obtenerPortadas(albumesConsultados,requestManager,rutaBuscarPortadaAlbum,this.BUSQUEDA_ID_ALBUM);
        if (albumesConsultados.datos.length != undefined) {
          for (let i = 0; i < albumesConsultados.datos.length; i++) {

            let respuestaPortadaConsultada = await requestManager.getRequest(rutaBuscarPortadaAlbum, paramsPortada);
            albumesConsultados.datos[i].portada = respuestaPortadaConsultada.datos[0].urlPublicaDePortada;
          }
        } else {
          let respuestaPortadaConsultada = await requestManager.getRequest(rutaBuscarPortadaAlbum, paramsPortada);
          albumesConsultados.datos.portada = respuestaPortadaConsultada.datos[0].urlPublicaDePortada;
        }
      } catch (excepcion) {
        return MensajesManager.crearMensajeDeError("error al consultar los datos", excepcion);
      }
    } else {
      return MensajesManager.crearMensajeDeError("Sin resultados", "sin resultados");
    }
    return MensajesManager.crearMensajeDeExito("artstas consultados con exito", albumesConsultados.datos);
  }

  public async buscarTodasLasCanciones() {
    let params = {
      todas: true
    }
    let paramsAlbumes = {
      id: ""
    }
    let paramsArtistas = {
      idArtista: ""
    }
    let paramsPortada = {
      idAlbum: ""
    }
    let paramsArchivoCancion = {
      idCancion: ""
    }

    let cancionCompleta = {
      idCancion: "",
      fkIdAlbum: "",
      nombreAlbum: "",
      idArtista: "",
      nombreArtista: "",
      urlPortada: "",
      tituloCancion: "",
      duracion: "",
      numeroDeTrack: "",
      urlDeCancion: ""
    }
    let respuestaFinal = {
      estatus: false,
      datos: new Array(),
      errores: new Array()
    };

    let requestManager = new RequestManager();
    let cancionesConsultadas = await requestManager.getRequest(rutaBuscarCancion, params);
    let cancionesCompletas = new Array();
    if (cancionesConsultadas.estatus == true) {
      try {
        for (let i = 0; i < cancionesConsultadas.datos.length; i++) {
          paramsAlbumes.id = cancionesConsultadas.datos[i].fkIdAlbum;
          let albumConsultado = await requestManager.getRequest(rutaBuscarAlbum, paramsAlbumes);
          paramsArtistas.idArtista = albumConsultado.datos.fkIdArtista;
          paramsPortada.idAlbum = albumConsultado.datos.id;
          paramsArchivoCancion.idCancion = cancionesConsultadas.datos[i].id;
          let artistaConsultado = await requestManager.getRequest(rutaServicioBuscarArtista, paramsArtistas);
          let portadaConsultada = await requestManager.getRequest(rutaBuscarPortadaAlbum, paramsPortada);
          let archivoCancionConsultado = await requestManager.getRequest(rutaBuscarUrlCancion, paramsArchivoCancion);
          cancionCompleta.idCancion = cancionesConsultadas.datos[i].id;
          cancionCompleta.fkIdAlbum = cancionesConsultadas.datos[i].fkIdAlbum;
          cancionCompleta.tituloCancion = cancionesConsultadas.datos[i].titulo;
          cancionCompleta.duracion = cancionesConsultadas.datos[i].duracion;
          cancionCompleta.numeroDeTrack = cancionesConsultadas.datos[i].numeroDeTrack;
          cancionCompleta.idArtista = albumConsultado.datos.fkIdArtista;
          cancionCompleta.nombreAlbum = albumConsultado.datos.titulo;
          cancionCompleta.nombreArtista = artistaConsultado.datos.nombreArtistico;
          cancionCompleta.urlPortada = portadaConsultada.datos[0].urlPublicaDePortada;
          cancionCompleta.urlDeCancion = archivoCancionConsultado.datos;
          cancionesCompletas.push(cancionCompleta);
        }
      } catch (excepcion) {
        return MensajesManager.crearMensajeDeError("error al consultar los datos", excepcion);
      }
    } else {
      return MensajesManager.crearMensajeDeError("Sin resultados", "sin resultados");
    }
    return MensajesManager.crearMensajeDeExito("artstas consultados con exito", cancionesCompletas);
  }


  public async buscarCancionPorNombre(nombreAlbum) {

    let params = {
      titulo: nombreAlbum
    }
    let paramsAlbumes = {
      id: ""
    }
    let paramsArtistas = {
      idArtista: ""
    }
    let paramsPortada = {
      idAlbum: ""
    }
    let paramsArchivoCancion = {
      idCancion: ""
    }

    let cancionCompleta = {
      idCancion: "",
      fkIdAlbum: "",
      nombreAlbum: "",
      idArtista: "",
      nombreArtista: "",
      urlPortada: "",
      tituloCancion: "",
      duracion: "",
      numeroDeTrack: "",
      urlDeCancion: ""
    }


    let requestManager = new RequestManager();
    let cancionesConsultadas = await requestManager.getRequest(rutaBuscarCancion, params);
    let cancionesCompletas = new Array();
    if (cancionesConsultadas.estatus == true) {
      try {
        for (let i = 0; i < cancionesConsultadas.datos.length; i++) {
          paramsAlbumes.id = cancionesConsultadas.datos[i].fkIdAlbum;
          let albumConsultado = await requestManager.getRequest(rutaBuscarAlbum, paramsAlbumes);
          paramsArtistas.idArtista = albumConsultado.datos.fkIdArtista;
          paramsPortada.idAlbum = albumConsultado.datos.id;
          paramsArchivoCancion.idCancion = cancionesConsultadas.datos[i].id;
          let artistaConsultado = await requestManager.getRequest(rutaServicioBuscarArtista, paramsArtistas);
          let portadaConsultada = await requestManager.getRequest(rutaBuscarPortadaAlbum, paramsPortada);
          let archivoCancionConsultado = await requestManager.getRequest(rutaBuscarUrlCancion, paramsArchivoCancion);
          cancionCompleta.idCancion = cancionesConsultadas.datos[i].id;
          cancionCompleta.fkIdAlbum = cancionesConsultadas.datos[i].fkIdAlbum;
          cancionCompleta.tituloCancion = cancionesConsultadas.datos[i].titulo;
          cancionCompleta.duracion = cancionesConsultadas.datos[i].duracion;
          cancionCompleta.numeroDeTrack = cancionesConsultadas.datos[i].numeroDeTrack;
          cancionCompleta.idArtista = albumConsultado.datos.fkIdArtista;
          cancionCompleta.nombreAlbum = albumConsultado.datos.titulo;
          cancionCompleta.nombreArtista = artistaConsultado.datos.nombreArtistico;
          cancionCompleta.urlPortada = portadaConsultada.datos[0].urlPublicaDePortada;
          cancionCompleta.urlDeCancion = archivoCancionConsultado.datos;
          cancionesCompletas.push(cancionCompleta);
        }
      } catch (excepcion) {
        return MensajesManager.crearMensajeDeError("error al consultar los datos", excepcion);
      }
    } else {
      return MensajesManager.crearMensajeDeError("Sin resultados", "sin resultados");
    }
    return MensajesManager.crearMensajeDeExito("artstas consultados con exito", cancionesCompletas);
  }

  public async buscarCancionPorId(idCancion) {

    let params = {
      id: idCancion
    }
    let paramsAlbumes = {
      id: ""
    }
    let paramsArtistas = {
      idArtista: ""
    }
    let paramsPortada = {
      idAlbum: ""
    }
    let paramsArchivoCancion = {
      idCancion: ""
    }

    let cancionCompleta = {
      idCancion: "",
      fkIdAlbum: "",
      nombreAlbum: "",
      idArtista: "",
      nombreArtista: "",
      urlPortada: "",
      tituloCancion: "",
      duracion: "",
      numeroDeTrack: "",
      urlDeCancion: ""
    }

    let requestManager = new RequestManager();
    let cancionesConsultadas = await requestManager.getRequest(rutaBuscarCancion, params);
    let cancionesCompletas = new Array();
    if (cancionesConsultadas.estatus == true) {
      try {

        paramsAlbumes.id = cancionesConsultadas.datos.fkIdAlbum;
        let albumConsultado = await requestManager.getRequest(rutaBuscarAlbum, paramsAlbumes);
        paramsArtistas.idArtista = albumConsultado.datos.fkIdArtista;
        paramsPortada.idAlbum = albumConsultado.datos.id;
        paramsArchivoCancion.idCancion = cancionesConsultadas.datos.id;
        let artistaConsultado = await requestManager.getRequest(rutaServicioBuscarArtista, paramsArtistas);
        let portadaConsultada = await requestManager.getRequest(rutaBuscarPortadaAlbum, paramsPortada);
        let archivoCancionConsultado = await requestManager.getRequest(rutaBuscarUrlCancion, paramsArchivoCancion);
        cancionCompleta.idCancion = cancionesConsultadas.datos.id;
        cancionCompleta.fkIdAlbum = cancionesConsultadas.datos.fkIdAlbum;
        cancionCompleta.tituloCancion = cancionesConsultadas.datos.titulo;
        cancionCompleta.duracion = cancionesConsultadas.datos.duracion;
        cancionCompleta.numeroDeTrack = cancionesConsultadas.datos.numeroDeTrack;
        cancionCompleta.idArtista = albumConsultado.datos.fkIdArtista;
        cancionCompleta.nombreAlbum = albumConsultado.datos.titulo;
        cancionCompleta.nombreArtista = artistaConsultado.datos.nombreArtistico;
        cancionCompleta.urlPortada = portadaConsultada.datos[0].urlPublicaDePortada;
        cancionCompleta.urlDeCancion = archivoCancionConsultado.datos;
        cancionesCompletas.push(cancionCompleta);

      } catch (excepcion) {
        return MensajesManager.crearMensajeDeError("error al consultar los datos", excepcion);
      }
    } else {
      return MensajesManager.crearMensajeDeError("Sin resultados", "sin resultados");
    }
    return MensajesManager.crearMensajeDeExito("artstas consultados con exito", cancionesCompletas);
  }

  public async buscarCancionPorAlbumId(idAlbumP) {

    let params = {
      idAlbum: idAlbumP
    }
    let paramsAlbumes = {
      id: ""
    }
    let paramsArtistas = {
      idArtista: ""
    }
    let paramsPortada = {
      idAlbum: ""
    }
    let paramsArchivoCancion = {
      idCancion: ""
    }

    let cancionCompleta = {
      idCancion: "",
      fkIdAlbum: "",
      nombreAlbum: "",
      idArtista: "",
      nombreArtista: "",
      urlPortada: "",
      tituloCancion: "",
      duracion: "",
      numeroDeTrack: "",
      urlDeCancion: ""
    }

    let requestManager = new RequestManager();
    let cancionesConsultadas = await requestManager.getRequest(rutaBuscarCancion, params);
    let cancionesCompletas = new Array();
    if (cancionesConsultadas.estatus == true) {
      try {
        for (let i = 0; i < cancionesConsultadas.datos.length; i++) {
          paramsAlbumes.id = cancionesConsultadas.datos[i].fkIdAlbum;
          let albumConsultado = await requestManager.getRequest(rutaBuscarAlbum, paramsAlbumes);
          paramsArtistas.idArtista = albumConsultado.datos.fkIdArtista;
          paramsPortada.idAlbum = albumConsultado.datos.id;
          paramsArchivoCancion.idCancion = cancionesConsultadas.datos[i].id;
          let artistaConsultado = await requestManager.getRequest(rutaServicioBuscarArtista, paramsArtistas);
          let portadaConsultada = await requestManager.getRequest(rutaBuscarPortadaAlbum, paramsPortada);
          let archivoCancionConsultado = await requestManager.getRequest(rutaBuscarUrlCancion, paramsArchivoCancion);
          cancionCompleta.idCancion = cancionesConsultadas.datos[i].id;
          cancionCompleta.fkIdAlbum = cancionesConsultadas.datos[i].fkIdAlbum;
          cancionCompleta.tituloCancion = cancionesConsultadas.datos[i].titulo;
          cancionCompleta.duracion = cancionesConsultadas.datos[i].duracion;
          cancionCompleta.numeroDeTrack = cancionesConsultadas.datos[i].numeroDeTrack;
          cancionCompleta.idArtista = albumConsultado.datos.fkIdArtista;
          cancionCompleta.nombreAlbum = albumConsultado.datos.titulo;
          cancionCompleta.nombreArtista = artistaConsultado.datos.nombreArtistico;
          cancionCompleta.urlPortada = portadaConsultada.datos[0].urlPublicaDePortada;
          cancionCompleta.urlDeCancion = archivoCancionConsultado.datos;
          cancionesCompletas.push(cancionCompleta);
        }
      } catch (excepcion) {
        return MensajesManager.crearMensajeDeError("error al consultar los datos", excepcion);
      }
    } else {
      return MensajesManager.crearMensajeDeError("Sin resultados", "sin resultados");
    }
    return MensajesManager.crearMensajeDeExito("artstas consultados con exito", cancionesCompletas);
  }

  public async buscarCancionesListaDeReproduccion(idListaP) {

    let paramsListaDeReproduccion = {
      idLista: idListaP
    }

    let params = {
      idCanciones: ""
    }

    let paramsAlbumes = {
      id: ""
    }
    let paramsArtistas = {
      idArtista: ""
    }
    let paramsPortada = {
      idAlbum: ""
    }
    let paramsArchivoCancion = {
      idCancion: ""
    }

    let cancionCompleta = {
      idCancion: "",
      fkIdAlbum: "",
      nombreAlbum: "",
      idArtista: "",
      nombreArtista: "",
      urlPortada: "",
      tituloCancion: "",
      duracion: "",
      numeroDeTrack: "",
      urlDeCancion: ""
    }

    let requestManager = new RequestManager();
    let cancionesCompletas = new Array();
    let cancionesDeListaDeReproduccion = await requestManager.getRequest(rutaObtenerCancionesListaDeReproduccion, paramsListaDeReproduccion);
    
    if (cancionesDeListaDeReproduccion.estatus == true) {
      let stringConIdsCancionesHelp = "";
      cancionesDeListaDeReproduccion.datos.forEach(idCancion => {
        stringConIdsCancionesHelp += idCancion + ",";
      });
      let stringConIdsCanciones = stringConIdsCancionesHelp.substring(0, stringConIdsCancionesHelp.length - 1);
      params.idCanciones = stringConIdsCanciones;
      let cancionesConsultadas = await requestManager.getRequest(rutaBuscarCancion, params);
      try {
        for (let i = 0; i < cancionesConsultadas.datos.length; i++) {
          paramsAlbumes.id = cancionesConsultadas.datos[i].fkIdAlbum;
          let albumConsultado = await requestManager.getRequest(rutaBuscarAlbum, paramsAlbumes);
          paramsArtistas.idArtista = albumConsultado.datos.fkIdArtista;
          paramsPortada.idAlbum = albumConsultado.datos.id;
          paramsArchivoCancion.idCancion = cancionesConsultadas.datos[i].id;
          let artistaConsultado = await requestManager.getRequest(rutaServicioBuscarArtista, paramsArtistas);
          let portadaConsultada = await requestManager.getRequest(rutaBuscarPortadaAlbum, paramsPortada);
          let archivoCancionConsultado = await requestManager.getRequest(rutaBuscarUrlCancion, paramsArchivoCancion);
          cancionCompleta.idCancion = cancionesConsultadas.datos[i].id;
          cancionCompleta.fkIdAlbum = cancionesConsultadas.datos[i].fkIdAlbum;
          cancionCompleta.tituloCancion = cancionesConsultadas.datos[i].titulo;
          cancionCompleta.duracion = cancionesConsultadas.datos[i].duracion;
          cancionCompleta.numeroDeTrack = cancionesConsultadas.datos[i].numeroDeTrack;
          cancionCompleta.idArtista = albumConsultado.datos.fkIdArtista;
          cancionCompleta.nombreAlbum = albumConsultado.datos.titulo;
          cancionCompleta.nombreArtista = artistaConsultado.datos.nombreArtistico;
          cancionCompleta.urlPortada = portadaConsultada.datos[0].urlPublicaDePortada;
          cancionCompleta.urlDeCancion = archivoCancionConsultado.datos;
          cancionesCompletas.push(cancionCompleta);
        }
      } catch (excepcion) {
        return MensajesManager.crearMensajeDeError("error al consultar los datos", excepcion);
      }
    } else {
      return MensajesManager.crearMensajeDeError("Sin resultados", "sin resultados");
    }
    return MensajesManager.crearMensajeDeExito("artstas consultados con exito", cancionesCompletas);
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



import {getConnection,getRepository,getConnectionManager,createConnection} from "typeorm";
import {Album} from "../bd/entity/Album";
import {AlbumParser} from "../Utilities/Parser/AlbumesParser";
import {AlbumesRepository} from "../bd/controllersBd/AlbumesRepository";
//import {AlbumParser} from "../../Parser/AlbumesParser";
//import {Cancion} from "../../entity/Cancion";
//import {Artista} from "../../entity/Artista";
//import {v4 as uuidv4} from "uuid";
export class ServicioAlbumes {

    public  async  crearAlbum(datosalbum){
        let  albumParseado = AlbumParser.jsonToAlbum(datosalbum);
        let resultadoDeOperacion;
        try{
            let repositorioAlbum = new AlbumesRepository();
            resultadoDeOperacion = await repositorioAlbum.crearAlbum(albumParseado);
            console.log(resultadoDeOperacion.mensaje);
            console.log(resultadoDeOperacion.erroresDeValidacion);
            console.log(resultadoDeOperacion.erroresDeGuardado);
            return resultadoDeOperacion;   
        }catch(errores){
            console.log("errores: "+ errores);
        }
       return resultadoDeOperacion;
     
    }

    public async actualizarAlbum (albumP){
        let  albumParseado = AlbumParser.jsonToAlbum(albumP);
        let resultadoDeOperacion;
        try{
            let repositorioAlbum = new AlbumesRepository();
            resultadoDeOperacion = await repositorioAlbum.actualizarAlbum(albumParseado);
            console.log("SERVICIO ALBUMES: "+resultadoDeOperacion);
            return resultadoDeOperacion;   
        }catch(errores){
            console.log("errores: "+ errores);
        }
       return resultadoDeOperacion;
     
    }

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
}

export let servicioAlbumes = new ServicioAlbumes();



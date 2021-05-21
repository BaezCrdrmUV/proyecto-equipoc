import {getConnection,getRepository,getConnectionManager,createConnection} from "typeorm";
import {Album} from "../bd/entity/Album";
//import {AlbumParser} from "../../Parser/AlbumesParser";
//import {Cancion} from "../../entity/Cancion";
import {Artista} from "../bd/entity/Artista";
import {v4 as uuidv4} from "uuid";
import {ArtistaParser} from "../Utilities/Parser/ArtistaParser";
import {ArtistasRepository} from "../bd/controllersBd/ArtistasRepository";

class ServicioArtistas {

    public async registrarArtista (artista): Promise<any>{
        let  artistaParseado = ArtistaParser.jsonToArtista(artista);
        let resultadoDeOperacion;
        try{
            let repositorioArtistas = new ArtistasRepository();
            resultadoDeOperacion = await repositorioArtistas.crearArtista(artistaParseado);
            console.log(resultadoDeOperacion.mensaje);
            console.log(resultadoDeOperacion.erroresDeValidacion);
            console.log(resultadoDeOperacion.erroresDeGuardado);
            return resultadoDeOperacion;   
        }catch(errores){
            console.log("errores: "+ errores);
        }
       return resultadoDeOperacion;
    }

    public async actualizarArtista (artista){
        let  artistaParseado = ArtistaParser.jsonToArtista(artista);
        let resultadoDeOperacion;
        try{
            let repositorioArtistas = new ArtistasRepository();
            resultadoDeOperacion = await repositorioArtistas.actualizarArtista(artistaParseado);
            console.log(resultadoDeOperacion.mensaje);
            console.log(resultadoDeOperacion.erroresDeValidacion);
            console.log(resultadoDeOperacion.erroresDeGuardado);
            return resultadoDeOperacion;   
        }catch(errores){
            console.log("errores: "+ errores);
        }
       return resultadoDeOperacion;
       
    }

    public async buscarArtistaPorId(idArtista){
      
        let resultadoDeOperacion;
        try{
            let repositorioArtistas = new ArtistasRepository();
            resultadoDeOperacion = await repositorioArtistas.buscarArtistaPorId(idArtista);
            console.log(resultadoDeOperacion);
            return resultadoDeOperacion;   
        }catch(errores){
            console.log("errores: "+ errores);
        }
       return resultadoDeOperacion;

    }

    public async buscarArtistaPorNombre(nombreArtista){
        let resultadoDeOperacion;
        try{
            let repositorioArtistas = new ArtistasRepository();
            resultadoDeOperacion = await repositorioArtistas.buscarArtistaPorNombre(nombreArtista);
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

export let servicioArtistas = new ServicioArtistas();


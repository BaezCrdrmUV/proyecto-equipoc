import {getConnection,getRepository,getConnectionManager,createConnection} from "typeorm";
import {Cancion} from "../bd/entity/Cancion";
import {CancionParser} from "../Utilities/Parser/CancionParser";
import {CancionesRepository} from "../bd/controllersBd/CancionesRepository";

export class ServicioCanciones {

    public  async  crearCancion(datoscancion){
        let  cancionParseado = CancionParser.jsonToCancion(datoscancion);
        let resultadoDeOperacion;
        try{
            let repositorioCancion = new CancionesRepository();
            resultadoDeOperacion = await repositorioCancion.crearCancion(cancionParseado);
            console.log(resultadoDeOperacion.mensaje);
            console.log(resultadoDeOperacion.erroresDeValidacion);
            console.log(resultadoDeOperacion.erroresDeGuardado);
            return resultadoDeOperacion;   
        }catch(errores){
            console.log("errores: "+ errores);
        }
       return resultadoDeOperacion;
     
    }

    public async actualizarCancion (cancionP){
        let  cancionParseado = CancionParser.jsonToCancion(cancionP);
        let resultadoDeOperacion;
        try{
            let repositorioCancion = new CancionesRepository();
            resultadoDeOperacion = await repositorioCancion.actualizarCancion(cancionParseado);
            console.log("SERVICIO CANCIONES: "+resultadoDeOperacion);
            return resultadoDeOperacion;   
        }catch(errores){
            console.log("errores: "+ errores);
        }
       return resultadoDeOperacion;
     
    }

    public async obtenerTodasLasCanciones(resultadosOmitidos = 0,numeroDeResultadosEsperados = 10){
        let resultadoDeOperacion;
        try{
            let repositorioCancion = new CancionesRepository();
            resultadoDeOperacion = await repositorioCancion.obtenerTodasLasCanciones(resultadosOmitidos,numeroDeResultadosEsperados);
            console.log("MENSAJE EN SERVICIO: " +resultadoDeOperacion.mensaje);
            console.log("DATOS EN SERVICIO: "+ resultadoDeOperacion.datos);
            console.log("VALIDACION : "+ resultadoDeOperacion.erroresDeValidacion);
            console.log("ERRORES :"+resultadoDeOperacion.erroresDeGuardado);
            return resultadoDeOperacion;   
        }catch(errores){
            console.log("errores: "+ errores);
        }
       return resultadoDeOperacion;
    }

    public async obtenerCancionPorId(idCancion){
        let resultadoDeOperacion;
        try{
            let repositorioCancion = new CancionesRepository();
            resultadoDeOperacion = await repositorioCancion.obtenerCancionPorId(idCancion);
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

    public async obtenerCancionPorNombre(tituloCancion,resultadosOmitidos = 0,numeroDeResultadosEsperados = 10){
        let resultadoDeOperacion;
        try{
            let repositorioCancion = new CancionesRepository();
            resultadoDeOperacion = await repositorioCancion.obtenerCancionPorNombre(tituloCancion,resultadosOmitidos,numeroDeResultadosEsperados);
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

    public async obtenerCancionPorAlbum(idAlbum,resultadosOmitidos = 0,numeroDeResultadosEsperados = 10){
        let resultadoDeOperacion;
        try{
            let repositorioCancion = new CancionesRepository();
            resultadoDeOperacion = await repositorioCancion.obtenerCancionPorAlbum(idAlbum,resultadosOmitidos,numeroDeResultadosEsperados);
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

    public async obtenerCancionesDeListaDeReproduccion(idsCanciones){
        let resultadoDeOperacion;
        try{
            let repositorioCancion = new CancionesRepository();
            resultadoDeOperacion = await repositorioCancion.obtenerCancionesDeListaDeReproduccion(idsCanciones);
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

export let servicioCanciones = new ServicioCanciones();



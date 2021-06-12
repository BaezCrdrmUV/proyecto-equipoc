import {getConnection,getRepository,getConnectionManager,createConnection} from "typeorm";
import {ListaReproduccion} from "../bd/entity/ListaReproduccion";
import {v4 as uuidv4} from "uuid";
import {ListaParser} from "../Utilities/Parser/ListaReproduccionParser";
import {ListaReproduccionRepository} from "../bd/controllersBd/ListaReproduccionRepository";
import {CancionesListasDeReproduccionRepository} from "../bd/controllersBd/CancionesListasDeReproduccionRepository";
 class ServiciosListaReproduccion {


public async registrarListaReproduccion (lista): Promise<any>{
    let  listaParseado = ListaParser.ListaToJson(lista);
    let resultadoDeOperacion;
    try{
        let repositorioListas = new ListaReproduccionRepository();
        resultadoDeOperacion = await repositorioListas.crearLista(listaParseado);
        console.log(resultadoDeOperacion.mensaje);
        console.log(resultadoDeOperacion.erroresDeValidacion);
        console.log(resultadoDeOperacion.erroresDeGuardado);
        return resultadoDeOperacion;   
    }catch(errores){
        console.log("errores: "+ errores);
    }
   return resultadoDeOperacion;
}

public async actualizarListaReproduccion (lista){
    
    let  listaParseado = ListaParser.jsonToLista(lista);
    
    
    let resultadoDeOperacion;
    try{
        let repositorioLista = new ListaReproduccionRepository();
        resultadoDeOperacion = await repositorioLista.actualizarLista(listaParseado);
        console.log(resultadoDeOperacion.mensaje);
        console.log(resultadoDeOperacion.erroresDeValidacion);
        console.log(resultadoDeOperacion.erroresDeGuardado);
        return resultadoDeOperacion;   
    }catch(errores){
        console.log("errores: "+ errores);
    }
   return resultadoDeOperacion;
   
}

public async agregarCancion(cancionListaDeReproduccion){
    
    let resultadoDeOperacion;
    try{
        let repositorioLista = new CancionesListasDeReproduccionRepository();
        resultadoDeOperacion = await repositorioLista.agregarCancion(cancionListaDeReproduccion);
        console.log(resultadoDeOperacion.mensaje);
        console.log(resultadoDeOperacion.erroresDeValidacion);
        console.log(resultadoDeOperacion.erroresDeGuardado);
        return resultadoDeOperacion;   
    }catch(errores){
        console.log("errores: "+ errores);
    }
   return resultadoDeOperacion;   
}

public async eliminarCancion(cancionListaDeReproduccion){
    
    let resultadoDeOperacion;
    try{
        let repositorioLista = new CancionesListasDeReproduccionRepository();
        resultadoDeOperacion = await repositorioLista.eliminarCancion(cancionListaDeReproduccion);
        console.log(resultadoDeOperacion.mensaje);
        console.log(resultadoDeOperacion.erroresDeValidacion);
        console.log(resultadoDeOperacion.erroresDeGuardado);
        return resultadoDeOperacion;   
    }catch(errores){
        console.log("errores: "+ errores);
    }
   return resultadoDeOperacion;   
}
public async buscarListaReproduccionPorNombre(nombreLista){
  
    let resultadoDeOperacion;
    try{
        let repositorioLista = new ListaReproduccionRepository();
        resultadoDeOperacion = await repositorioLista.obtenerListaPorNombre (nombreLista);
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

public async buscarListaReproduccionPorId(idLista){
    let resultadoDeOperacion;
    try{
        let repositorioLista = new ListaReproduccionRepository();
        resultadoDeOperacion = await repositorioLista.obtenerListaPorId(idLista);
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
public async obtenerCancionesDeListaDeReproduccion(idLista:string){
    let resultadoDeOperacion;
    console.log("ID LISTA SERVICIO: "+idLista);
    try{
        let repositorioLista = new CancionesListasDeReproduccionRepository();
        resultadoDeOperacion = await repositorioLista.obtenerCancionesDeListaDeReproduccion(idLista);
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
export let serviciosListas = new ServiciosListaReproduccion()
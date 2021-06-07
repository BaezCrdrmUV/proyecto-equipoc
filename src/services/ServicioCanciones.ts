import {CancionesRepository} from "../bd/controllersBd/CancionesRepository";
import {CancionesRegister} from "../utilities/CancionesRegister";
import {nombrePredeterminadoDePortadas} from "../config/global";
import { MensajesManager } from "../utilities/MensajesManager";
import {nombrePredeterminadoDeCanciones} from "../config/global";
import {FormateadorEntradasDeRegistro} from "../utilities/FormateadorEntradasDeRegistro";
import path from 'path';
import { runInNewContext } from "vm";
export class ServicioCanciones{
    
    public async subirCancion(datosCancion):Promise<any>{
        let cancionesRegister = new CancionesRegister();
        let datosPreparados;
        let resultadoDeEscritura
        if(datosCancion.body !=null && datosCancion.files != null){
            datosPreparados = FormateadorEntradasDeRegistro.prepararDatosParaGuardadoDeCanciones(datosCancion);
            resultadoDeEscritura =await cancionesRegister.guardarCancion(datosPreparados.datosParaArchivo);
        }else{
           return MensajesManager.crearMensajeDeErrorDeValidacion("el cuerpo de la peticion y el archivo de cancion asociado debe contener valores")
        }
        
        if(resultadoDeEscritura.estatus == true){
            let cancionesRepository = new CancionesRepository();
            //se asigna la url de gaurdado al objeto que se guardara en bd
            datosPreparados.datosParaRegistroEnBd.urlCancion = resultadoDeEscritura.rutaDeGuardado;
            console.log("RUTA ARRAY : "+ resultadoDeEscritura.rutaDeGuardado.split(path.sep+"original.mp3"));
            let rutasSeparada = resultadoDeEscritura.rutaDeGuardado.split(path.sep+"original.mp3");
            let rutaDeSegmentacion = rutasSeparada[0];
            console.log("RUTA DE SEGMENTACION" +rutaDeSegmentacion);
            cancionesRegister.segmentarCancionParaStreaming(rutaDeSegmentacion);
            let respuestaBd;
            respuestaBd = await cancionesRepository.registrarCancion(datosPreparados.datosParaRegistroEnBd);
            if(respuestaBd.estatus == false){
                console.log("ELIMINANDO CANCION");
                await cancionesRegister.borrarCancion(resultadoDeEscritura.urlCancion);
                console.log("CANCION ELMINADA");
            }
            return respuestaBd;
            
        }else {
            let erroresDeGuardadoFisico =resultadoDeEscritura.resultadoDeOperacion.erroresDeGuardado;
            return MensajesManager.crearMensajeDeError(erroresDeGuardadoFisico,"Error al registrar la cancion");
        }
        
    }
    public async buscarUrlDeCancion(idCancion):Promise<any>{
        if(idCancion != undefined){
            let cancionesRepository = new CancionesRepository();
            let respuesta = await cancionesRepository.obtenerUrlCancion(idCancion);
            return respuesta;
    }
}
   
   
}
export let servicioCanciones = new ServicioCanciones()
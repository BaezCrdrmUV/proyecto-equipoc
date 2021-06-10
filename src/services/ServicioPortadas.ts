import {PortadasRegister} from "../utilities/PortadasRegister";
import {nombrePredeterminadoDePortadas} from "../config/global";
import { MensajesManager } from "../utilities/MensajesManager";
import {PortadasRepository} from "../bd/controllersBd/PortadasRepository";
import {FormateadorEntradasDeRegistro} from "../utilities/FormateadorEntradasDeRegistro"
let sharp = require('sharp');
class ServicioPortadas{

    public async subirPortadaArtista(datosPortada):Promise<any>{
        let filesRegister = new PortadasRegister();
        let datosPreparados;
        let resultadoDeEscritura;
        if(datosPortada.body !=null && datosPortada.files != null){
            datosPreparados = FormateadorEntradasDeRegistro.prepararDatosParaGuardadoDePortadas(datosPortada);
            resultadoDeEscritura =await filesRegister.guardarPortadaArtistaEnFileSystem(datosPreparados.datosParaArchivo);
        }else{
           return MensajesManager.crearMensajeDeErrorDeValidacion("el cuerpo de la peticion y el archivo de portada asociado deben contener valores")
        }
       
        if(resultadoDeEscritura.estatus == true){
            let portadasRepository = new PortadasRepository();
            //se asigna la url de gaurdado al objeto que se guardara en bd
            datosPreparados.datosParaRegistroEnBd.urlDePortada = resultadoDeEscritura.rutaDeGuardado;
            datosPreparados.datosParaRegistroEnBd.urlPublicaDePortada = resultadoDeEscritura.rutaDeGuardadoPublica;
            let respuestaBd;
        
            respuestaBd = await portadasRepository.registrarPortada(datosPreparados.datosParaRegistroEnBd);
            if(respuestaBd.estatus == false){
                console.log("ELIMINANDO PORTADA");
                await filesRegister.borrarPortada(resultadoDeEscritura.urlCancion);
                console.log("PORTADA ELMINADA");
            }
          
            return respuestaBd;
        }else {
            let erroresDeGuardadoFisico =resultadoDeEscritura.resultadoDeOperacion.erroresDeGuardado;
            return MensajesManager.crearMensajeDeError(erroresDeGuardadoFisico,"Error al registrar la portada");
        }
        
    }
    public async subirPordataAlbum(datosPortada):Promise<any>{
        let filesRegister = new PortadasRegister();
        let datosPreparados = FormateadorEntradasDeRegistro.prepararDatosParaGuardadoDePortadas(datosPortada);
        let resultadoDeEscritura =await filesRegister.guardarPortadaAlbumEnFileSystem(datosPreparados.datosParaArchivo);
        if(resultadoDeEscritura.estatus == true){
            let portadasRepository = new PortadasRepository();
            //se asigna la url de guardado al objeto que se guardara en bd
            datosPreparados.datosParaRegistroEnBd.urlDePortada = resultadoDeEscritura.rutaDeGuardado;
            datosPreparados.datosParaRegistroEnBd.urlPublicaDePortada = resultadoDeEscritura.rutaDeGuardadoPublica;
            let respuestaBd;
            respuestaBd = await portadasRepository.registrarPortada(datosPreparados.datosParaRegistroEnBd);
            if(respuestaBd.estatus == false){
                console.log("ELIMINANDO PORTADA");
                await filesRegister.borrarPortada(resultadoDeEscritura.urlCancion);
                console.log("PORTADA ELMINADA");
            }
            return respuestaBd;
        }else {
            let erroresDeGuardadoFisico =resultadoDeEscritura.resultadoDeOperacion.erroresDeGuardado;
            return MensajesManager.crearMensajeDeError(erroresDeGuardadoFisico,"Error al registrar la portada");
        }
    }

    public async actualizarPordataAlbum(datosPortada):Promise<any>{
        let filesRegister = new PortadasRegister();
        console.log("ACTUALIZANDO PORTADA ");
        let datosPreparados = FormateadorEntradasDeRegistro.prepararDatosParaActualizadoDePortadas(datosPortada);
        let resultadoDeEscritura =await filesRegister.guardarPortadaAlbumEnFileSystem(datosPreparados.datosParaArchivo);
        if(resultadoDeEscritura.estatus == true){
            let portadasRepository = new PortadasRepository();
            //se asigna la url de guardado al objeto que se guardara en bd
            datosPreparados.datosParaRegistroEnBd.urlDePortada = resultadoDeEscritura.rutaDeGuardado;
            datosPreparados.datosParaRegistroEnBd.urlPublicaDePortada = resultadoDeEscritura.rutaDeGuardadoPublica;
            let respuestaBd;
            respuestaBd = await portadasRepository.actualizarPortada(datosPreparados.datosParaRegistroEnBd);
            if(respuestaBd.estatus == false){
                console.log("ELIMINANDO PORTADA");
                await filesRegister.borrarPortada(resultadoDeEscritura.urlCancion);
                console.log("PORTADA ELMINADA");
            }
            return respuestaBd;
        }else {
            let erroresDeGuardadoFisico =resultadoDeEscritura.resultadoDeOperacion.erroresDeGuardado;
            return MensajesManager.crearMensajeDeError(erroresDeGuardadoFisico,"Error al registrar la portada");
        }
    }

    public async actualizarPordataArtista(datosPortada):Promise<any>{
        let filesRegister = new PortadasRegister();
        console.log("ACTUALIZANDO PORTADA ");
        let datosPreparados = FormateadorEntradasDeRegistro.prepararDatosParaActualizadoDePortadas(datosPortada);
        let resultadoDeEscritura =await filesRegister.guardarPortadaArtistaEnFileSystem(datosPreparados.datosParaArchivo);
        if(resultadoDeEscritura.estatus == true){
            let portadasRepository = new PortadasRepository();
            //se asigna la url de guardado al objeto que se guardara en bd
            datosPreparados.datosParaRegistroEnBd.urlDePortada = resultadoDeEscritura.rutaDeGuardado;
            datosPreparados.datosParaRegistroEnBd.urlPublicaDePortada = resultadoDeEscritura.rutaDeGuardadoPublica;
            let respuestaBd;
            respuestaBd = await portadasRepository.actualizarPortada(datosPreparados.datosParaRegistroEnBd);
            if(respuestaBd.estatus == false){
                console.log("ELIMINANDO PORTADA");
                await filesRegister.borrarPortada(resultadoDeEscritura.urlCancion);
                console.log("PORTADA ELMINADA");
            }
            return respuestaBd;
        }else {
            let erroresDeGuardadoFisico =resultadoDeEscritura.resultadoDeOperacion.erroresDeGuardado;
            return MensajesManager.crearMensajeDeError(erroresDeGuardadoFisico,"Error al registrar la portada");
        }
    }

    public async buscarPortadaPorId(idPortada:string):Promise<any>{
        console.log("ID PORTADA 1"+idPortada);
        let portadasRepository = new PortadasRepository();
        let respuestaBd;    
        try{
            respuestaBd = await portadasRepository.obtenerPortadaPorId(idPortada);
        }catch(excepcion){
            return MensajesManager.crearMensajeDeError( excepcion,"error al consultar la portada");
        }
        return respuestaBd;
    }
    public async buscarPortadaPorIdAlbum(idAlbum):Promise<any>{
        console.log("ID PORTADA ALBUM 1 "+idAlbum);
        let portadasRepository = new PortadasRepository();
        let respuestaBd;    
        try{
            respuestaBd = await portadasRepository.obtenerPortadaPorIdAlbum(idAlbum);
        }catch(excepcion){
            return MensajesManager.crearMensajeDeError( excepcion,"error al consultar la portada");
        }
        return respuestaBd;
    }
    
    public async buscarPortadaPorIdArtista(idArtista){
        console.log("ID PORTADA ALBUM 1 "+idArtista);
        let portadasRepository = new PortadasRepository();
        let respuestaBd;    
        try{
            respuestaBd = await portadasRepository.obtenerPortadaPorIdArtista(idArtista);
        }catch(excepcion){
            return MensajesManager.crearMensajeDeError( excepcion,"error al consultar la portada");
        }
        return respuestaBd;
    }
}
export let servicioPortadas = new ServicioPortadas()
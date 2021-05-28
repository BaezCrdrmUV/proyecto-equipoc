import fse from 'fs-extra';
import fs from 'fs';
import {rutaBaseCancionesYPortadas} from "../config/global";
import path from 'path';
import { MensajesManager } from './MensajesManager';
import { AnyAaaaRecord } from 'dns';
export class FilesRegister{


   
   public async guardarPortadaArtistaEnFileSystem(datosDeArchivo){
        let respuestaDeCreacionDeDirectorios =await this.crearRutaDeGuardadoPortadaArtista(datosDeArchivo);
        let nombreImagenConExtension = datosDeArchivo.nombreImagen+datosDeArchivo.formato;
        let rutaDeGuardadoFinal = path.join(respuestaDeCreacionDeDirectorios.rutaDeGuardado,nombreImagenConExtension);
        let respuestaFinal = null;
        try {
               await fse.writeFile(rutaDeGuardadoFinal,datosDeArchivo.portada.data);
        }catch(excepcion){
          respuestaFinal = MensajesManager.crearMensajeDeErrorGuardadoFisico(excepcion,"Error al escribir el archivo");
          respuestaFinal.erroresDeGuardado.push(excepcion);
          return respuestaFinal;
        }
        return MensajesManager.crearMensajeDeExitoDeGuardadoFisico("la portada se escribio correctamente",respuestaDeCreacionDeDirectorios.rutaDeGuardado);
       
   }
   public async guardarPortadaAlbumEnFileSystem(datosDeArchivo):Promise<any>{
     let respuestaDeCreacionDeDirectorios =await this.crearRutaDeGuardadoPortadaAlbum(datosDeArchivo);
        let nombreImagenConExtension = datosDeArchivo.nombreImagen+datosDeArchivo.formato;
        let rutaDeGuardadoFinal = path.join(respuestaDeCreacionDeDirectorios.rutaDeGuardado,nombreImagenConExtension);
        let respuestaFinal = null;
        try {
               await fse.writeFile(rutaDeGuardadoFinal,datosDeArchivo.portada.data);
        }catch(excepcion){
          respuestaFinal = MensajesManager.crearMensajeDeErrorGuardadoFisico(excepcion,"Error al escribir el archivo");
          respuestaFinal.erroresDeGuardado.push(excepcion);
          return respuestaFinal;
        }
        return MensajesManager.crearMensajeDeExitoDeGuardadoFisico("la portada se escribio correctamente",respuestaDeCreacionDeDirectorios.rutaDeGuardado);
     }


    private async crearRutaDeGuardadoPortadaArtista(datosDeArchivo):Promise<any>{
               
       
       let rutaDeGuardado = path.join(rutaBaseCancionesYPortadas,datosDeArchivo.nombreArtista,"portadas");
       try{
            await fse.mkdirs(rutaDeGuardado);
       }catch(excepcion){
          
          return MensajesManager.crearMensajeDeErrorGuardadoFisico(excepcion,"no se crear la ruta de guardado");
       }     
       

       return  MensajesManager.crearMensajeDeExitoDeGuardadoFisico("ruta creada exitosamente",rutaDeGuardado);
    }
    private async crearRutaDeGuardadoPortadaAlbum(datosDeArchivo):Promise<any>{
           
        let rutaDeGuardado = path.join(rutaBaseCancionesYPortadas,datosDeArchivo.nombreArtista,datosDeArchivo.nombreAlbum,'portadas');
        try{
             await fse.mkdirs(rutaDeGuardado);
        }catch(excepcion){
          return MensajesManager.crearMensajeDeErrorGuardadoFisico(excepcion,"no se crear la ruta de guardado");
        } 
        return  MensajesManager.crearMensajeDeExitoDeGuardadoFisico("ruta creada exitosamente",rutaDeGuardado);
     }


}
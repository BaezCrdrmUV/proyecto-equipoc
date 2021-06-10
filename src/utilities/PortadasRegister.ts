import fse from 'fs-extra';
import fs from 'fs';
import {rutaBaseAccesoPublicoPortadasYCanciones,rutaBaseCancionesYPortadas} from "../config/global";
import path from 'path';
import { MensajesManager } from './MensajesManager';

export class PortadasRegister{


   
   public async guardarPortadaArtistaEnFileSystem(datosDeArchivo){
        let respuestaDeCreacionDeDirectorios =await this.crearRutaDeGuardadoPortadaArtista(datosDeArchivo);
        let nombreImagenConExtension = datosDeArchivo.nombreDeImagen+datosDeArchivo.formato;
        let rutaDeGuardadoFinal = path.join(respuestaDeCreacionDeDirectorios.rutaDeGuardado,nombreImagenConExtension);
        respuestaDeCreacionDeDirectorios.rutaDeGuardadoPublica = path.join(respuestaDeCreacionDeDirectorios.rutaDeGuardadoPublica,nombreImagenConExtension);
        let respuestaFinal = null;
        try {
               await fse.writeFile(rutaDeGuardadoFinal,datosDeArchivo.portada.data);
        }catch(excepcion){
          respuestaFinal = MensajesManager.crearMensajeDeErrorGuardadoFisico(excepcion,"Error al escribir el archivo");
          respuestaFinal.erroresDeGuardado.push(excepcion);
          return respuestaFinal;
        }
        return MensajesManager.crearMensajeDeExitoDeGuardadoFisico("la portada se escribio correctamente",rutaDeGuardadoFinal,respuestaDeCreacionDeDirectorios.rutaDeGuardadoPublica);
       
   }
   public async guardarPortadaAlbumEnFileSystem(datosDeArchivo):Promise<any>{
     let respuestaDeCreacionDeDirectorios =await this.crearRutaDeGuardadoPortadaAlbum(datosDeArchivo);
        let nombreImagenConExtension = datosDeArchivo.nombreDeImagen+datosDeArchivo.formato;
        let rutaDeGuardadoFinal = path.join(respuestaDeCreacionDeDirectorios.rutaDeGuardado,nombreImagenConExtension);
        //se agrega el nombre del archivo de portada a la ruta publica
        respuestaDeCreacionDeDirectorios.rutaDeGuardadoPublica = path.join(respuestaDeCreacionDeDirectorios.rutaDeGuardadoPublica,nombreImagenConExtension);
        let respuestaFinal = null;
        try {
               await fse.writeFile(rutaDeGuardadoFinal,datosDeArchivo.portada.data);
        }catch(excepcion){
          respuestaFinal = MensajesManager.crearMensajeDeErrorGuardadoFisico(excepcion,"Error al escribir el archivo");
          respuestaFinal.erroresDeGuardado.push(excepcion);
          return respuestaFinal;
        }
        return MensajesManager.crearMensajeDeExitoDeGuardadoFisico("la portada se escribio correctamente",rutaDeGuardadoFinal,respuestaDeCreacionDeDirectorios.rutaDeGuardadoPublica);
     }


    private async crearRutaDeGuardadoPortadaArtista(datosDeArchivo):Promise<any>{
               
       let rutaDeGuardado = path.join(rutaBaseCancionesYPortadas,datosDeArchivo.nombreArtista,"portadas");
       let rutaDeGuardadoPublica = path.join(rutaBaseAccesoPublicoPortadasYCanciones,datosDeArchivo.nombreArtista,"portadas");
       try{
            await fse.mkdirs(rutaDeGuardado);
       }catch(excepcion){
          
          return MensajesManager.crearMensajeDeErrorGuardadoFisico(excepcion,"no se crear la ruta de guardado");
       }     
       
       return  MensajesManager.crearMensajeDeExitoDeGuardadoFisico("ruta creada exitosamente",rutaDeGuardado,rutaDeGuardadoPublica);
    }
    private async crearRutaDeGuardadoPortadaAlbum(datosDeArchivo):Promise<any>{
           
        let rutaDeGuardado = path.join(rutaBaseCancionesYPortadas,datosDeArchivo.nombreArtista,datosDeArchivo.nombreAlbum,'portadas');
        let rutaDeGuardadoPublica = path.join(rutaBaseAccesoPublicoPortadasYCanciones,datosDeArchivo.nombreArtista,datosDeArchivo.nombreAlbum,'portadas');
        try{
             await fse.mkdirs(rutaDeGuardado);
        }catch(excepcion){
          return MensajesManager.crearMensajeDeErrorGuardadoFisico(excepcion,"no se crear la ruta de guardado");
        } 
        return  MensajesManager.crearMensajeDeExitoDeGuardadoFisico("ruta creada exitosamente",rutaDeGuardado,rutaDeGuardadoPublica);
     }

     public async borrarPortada(urlPortada){
          fse.remove(urlPortada);
     }


}
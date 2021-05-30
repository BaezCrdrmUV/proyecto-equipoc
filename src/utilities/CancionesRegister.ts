import fse from 'fs-extra';
import fs from 'fs';
import {rutaBaseCancionesYPortadas} from "../config/global";
import path from 'path';
import { MensajesManager } from './MensajesManager';

export class CancionesRegister {
    
    public async guardarCancion(datosDeArchivo){
        let respuestaDeCreacionDeDirectorios =await this.crearRutaDeGuardadoCancion(datosDeArchivo);
        let nombreCancionConExtension = datosDeArchivo.nombreArchivoCancion+datosDeArchivo.formato;
        let rutaDeGuardadoFinal = path.join(respuestaDeCreacionDeDirectorios.rutaDeGuardado,nombreCancionConExtension);
        let respuestaFinal = null;
        try {
               await fse.writeFile(rutaDeGuardadoFinal,datosDeArchivo.portada.data);
        }catch(excepcion){
          respuestaFinal = MensajesManager.crearMensajeDeErrorGuardadoFisico(excepcion,"Error al escribir el archivo");
          respuestaFinal.erroresDeGuardado.push(excepcion);
          return respuestaFinal;
        }
        return MensajesManager.crearMensajeDeExitoDeGuardadoFisico("la portada se escribio correctamente",rutaDeGuardadoFinal);     
   }

   private async crearRutaDeGuardadoCancion(datosDeArchivo):Promise<any>{
               
        let rutaDeGuardado =  path.join(rutaBaseCancionesYPortadas,datosDeArchivo.nombreArtista,datosDeArchivo.nombreAlbum,datosDeArchivo.nombreCancion);
        try{
            await fse.mkdirs(rutaDeGuardado);
        }catch(excepcion){
        
            return MensajesManager.crearMensajeDeErrorGuardadoFisico(excepcion,"no se crear la ruta de guardado");
        }     
        
        return  MensajesManager.crearMensajeDeExitoDeGuardadoFisico("ruta creada exitosamente",rutaDeGuardado);
    }
    public async borrarCancion(urlPortada){
        fse.remove(urlPortada);
    }

    public static convertirBytesAMegaBytes (bytes){
        return (bytes/1024)/1024;
    }

}

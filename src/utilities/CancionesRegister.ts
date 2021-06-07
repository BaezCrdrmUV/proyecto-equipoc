import fse from 'fs-extra';
import fs from 'fs';
import {rutaBaseCancionesYPortadas} from "../config/global";
import path from 'path';
import { MensajesManager } from './MensajesManager';
import {exec} from 'child_process';
import {rutaScriptDeSegmentacion} from "../config/global";

export class CancionesRegister {
    
    public async guardarCancion(datosDeArchivo){
        let rutaBaseDeGuardadoCancion =await this.crearRutaDeGuardadoCancion(datosDeArchivo);
        let nombreCancionConExtension = datosDeArchivo.nombreArchivoCancion+datosDeArchivo.formato;
        let rutaDeGuardadoFinal = path.join(rutaBaseDeGuardadoCancion.rutaDeGuardado,nombreCancionConExtension);
        let respuestaFinal = null;
        try {
               await fse.writeFile(rutaDeGuardadoFinal,datosDeArchivo.cancion.data);
        }catch(excepcion){
          respuestaFinal = MensajesManager.crearMensajeDeErrorGuardadoFisico(excepcion,"Error al escribir el archivo");
          respuestaFinal.erroresDeGuardado.push(excepcion);
          return respuestaFinal;
        }
        return MensajesManager.crearMensajeDeExitoDeGuardadoFisico("la cancion se escribio correctamente",rutaDeGuardadoFinal);     
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
    public async borrarCancion(urlCancion){
        fse.remove(urlCancion);
    }
    public  segmentarCancionParaStreaming(urlCancion){
        if(urlCancion != undefined){
            let comandoDeEjecucion = '"'+rutaScriptDeSegmentacion +'"' +" " +'"'+urlCancion+'"';
            console.log("URLCANCION "+urlCancion);
             exec(comandoDeEjecucion, (err, stdout, stderr) => {
               if(err){
                   console.log("ERR: "+err);
               }
               if(stderr){
                   console.log("STDERR: "+stderr);
               }
               console.log("Resultado:"+stdout);
               
            });
        }
    }

    public static convertirBytesAMegaBytes (bytes){
        return (bytes/1024)/1024;
    }

    public static convertirBytesAKiloBytes (bytes){
        return bytes/1024;
    }

}

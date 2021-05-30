import {CancionesRegister} from "../utilities/CancionesRegister";
import {nombrePredeterminadoDePortadas} from "../config/global";
import { MensajesManager } from "../utilities/MensajesManager";
import {nombrePredeterminadoDeCanciones} from "../config/global";
export class ServicioCanciones{
    
    public async subirCancion(datosCancion){
        let cancionesRegister = new CancionesRegister();
        let datosPreparados = this.prepararDatosParaGuardadoDePortadas(datosCancion);
        let resultadoDeEscritura =await cancionesRegister.guardarCancion(datosPreparados.datosParaArchivo);
        if(resultadoDeEscritura.estatus == true){
            /*  TO DO
            llamar registro en bd 
             y armar respuesta
            final con base en el resultado de ambas operaciones
         */
            //cancionesRegister.borrarCancion(resultadoDeEscritura.rutaDeGuardado);
        
            return resultadoDeEscritura;
        }else {
            return resultadoDeEscritura;
        }
        
    }
    public async buscarUrlDeCancion(datosCancion){

    }
   
    private prepararDatosParaGuardadoDePortadas(datosCancion):any{
        let datosParaArchivo ={
            nombreArchivoCancion:nombrePredeterminadoDeCanciones,
            nombreCancion:datosCancion.body.nombreCancion,
            formato:"."+datosCancion.files.cancion.mimetype.split("/")[1],
            nombreArtista:datosCancion.body.nombreArtista,
            nombreAlbum:datosCancion.body.nombreAlbum,
            portada:datosCancion.files.cancion
        }
       
        let datosParaRegistroEnBd = {
            fkIdCancion:datosCancion.body.fkIdCancion,
            fkIdPortada:datosCancion.body.fkIdPortada,
            nombreDeArchivo:nombrePredeterminadoDeCanciones,
            tamanoEnMb:CancionesRegister.convertirBytesAMegaBytes(datosCancion.files.cancion.size),
            formato:datosParaArchivo.formato,
            codigoIsrc:datosCancion.body.codigoIsrc,
            urlCancion:datosCancion.body.urlCancion,
            fkIdEstatus:datosCancion.body.fkIdEstatus
        }
        let datosPreparados = {
            datosParaArchivo,
            datosParaRegistroEnBd
        }
        return datosPreparados;
    }
}
export let servicioCanciones = new ServicioCanciones()
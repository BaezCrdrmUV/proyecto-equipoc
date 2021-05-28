import {FilesRegister} from "../utilities/FilesRegister";
import {nombrePredeterminadoDePortadas} from "../config/global";
import { MensajesManager } from "../utilities/MensajesManager";
class ServicioPortadas{

    public async subirPortadaArtista(datosPortada){
        let filesRegister = new FilesRegister();
        let datosPreparados = this.prepararDatosParaGuardadoDePortadas(datosPortada);
        let resultadoDeEscritura =await filesRegister.guardarPortadaArtistaEnFileSystem(datosPreparados.datosParaArchivo);
        if(resultadoDeEscritura.estatus == true){
            /*  TO DO
            llamar registro en bd y armar respuesta
            final con base en el resultado de ambas operaciones
         */
        
            return resultadoDeEscritura;
        }else {
            return resultadoDeEscritura;
        }
        
    }
    public async subirPordataAlbum(datosPortada):Promise<any>{
        let filesRegister = new FilesRegister();
        let datosPreparados = this.prepararDatosParaGuardadoDePortadas(datosPortada);
        let resultadoDeEscritura =await filesRegister.guardarPortadaAlbumEnFileSystem(datosPreparados.datosParaArchivo);
        if(resultadoDeEscritura.estatus == true){
            /*  TO DO
            llamar registro en bd y armar respuesta
            final con base en el resultado de ambas operaciones
         */
            return resultadoDeEscritura;
        }else {
             return resultadoDeEscritura;
        }
        
    }

    private prepararDatosParaGuardadoDePortadas(datosPortada):any{
        let datosParaArchivo ={
            nombreImagen:nombrePredeterminadoDePortadas,
            formato:"."+datosPortada.files.portada.mimetype.split("/")[1],
            nombreArtista:datosPortada.body.nombreArtista,
            nombreAlbum:datosPortada.body.nombreAlbum,
            portada:datosPortada.files.portada
        }
       
        let datosParaRegistroEnBd = {
            fkIdArtista:datosPortada.body.fkIdArtista,
            fkIdAlbum:datosPortada.body.fkIdAlbum,
            nombreImagen:nombrePredeterminadoDePortadas,
            formato:datosParaArchivo.formato,
            urlDePortada:datosPortada.body.urlDePortada,
            fkIdEstatus:datosPortada.body.fkIdEstatus
        }
        let datosPreparados = {
            datosParaArchivo,
            datosParaRegistroEnBd
        }
        return datosPreparados;
    }

}
export let servicioPortadas = new ServicioPortadas()
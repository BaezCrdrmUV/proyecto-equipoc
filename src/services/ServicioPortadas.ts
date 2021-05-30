import {PortadasRegister} from "../utilities/PortadasRegister";
import {nombrePredeterminadoDePortadas} from "../config/global";
import { MensajesManager } from "../utilities/MensajesManager";
import {PortadasRepository} from "../bd/controllersBd/PortadasRepository";
let sharp = require('sharp');
class ServicioPortadas{

    public async subirPortadaArtista(datosPortada):Promise<any>{
        let filesRegister = new PortadasRegister();
        let datosPreparados = this.prepararDatosParaGuardadoDePortadas(datosPortada);
        let resultadoDeEscritura =await filesRegister.guardarPortadaArtistaEnFileSystem(datosPreparados.datosParaArchivo);
        if(resultadoDeEscritura.estatus == true){
            let portadasRepository = new PortadasRepository();
            //se asigna la url de gaurdado al objeto que se guardara en bd
            datosPreparados.datosParaRegistroEnBd.urlCancion = resultadoDeEscritura.rutaDeGuardado;
            let respuestaBd;
            try{
                respuestaBd = await portadasRepository.registrarPortada(datosPreparados.datosParaRegistroEnBd);
                if(respuestaBd.estatus == false){
                    console.log("ELIMINANDO PORTADA");
                    await filesRegister.borrarPortada(resultadoDeEscritura.urlCancion);
                    console.log("PORTADA ELMINADA");
                }
            }catch(excepcion){
                console.log("EXCEPCION: "+excepcion);
            }
           
            return respuestaBd;
        }else {
            let erroresDeGuardadoFisico =resultadoDeEscritura.resultadoDeOperacion.erroresDeGuardado;
            return MensajesManager.crearMensajeDeError(erroresDeGuardadoFisico,"Error al registrar la portada");
        }
        
    }
    public async subirPordataAlbum(datosPortada):Promise<any>{
        let filesRegister = new PortadasRegister();
        let datosPreparados = this.prepararDatosParaGuardadoDePortadas(datosPortada);
        let resultadoDeEscritura =await filesRegister.guardarPortadaAlbumEnFileSystem(datosPreparados.datosParaArchivo);
        if(resultadoDeEscritura.estatus == true){
            /*  TO DO
            llamar registro en bd y armar respuesta
            final con base en el resultado de ambas operaciones
         */

            filesRegister.borrarPortada(resultadoDeEscritura.rutaDeGuardado);
            return resultadoDeEscritura;
        }else {
             return resultadoDeEscritura;
        }
        
    }

   

    public buscarPortadaPorId(idPortada){

    }

    public buscarPortadaPorIdArtista(idArtista){

    }

    public buscarPortadaPorIdAlbum(idAlbum){

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
            urlCancion:datosPortada.body.urlDePortada,
            fkIdEstatus:parseInt(datosPortada.body.fkIdEstatus)
        }
        let datosPreparados = {
            datosParaArchivo,
            datosParaRegistroEnBd
        }
        return datosPreparados;
    }
    public manejadorDeError(error,info){
        console.log(error);
        console.log(info)
    }

}
export let servicioPortadas = new ServicioPortadas()
import axios from "axios";
import { RequestManager } from "../utilities/RequestManager";
import { rutaRegistrarCancion, rutaActualizarCancion } from "../config/datosConexionMusica";
import { rutaSubirCancion } from "../config/datosConexionMultimeda";
import { MensajesManager } from "../utilities/MensajesManager";
import path from "path";
import FormData from "form-data";
import fse from 'fs-extra';
import fs from "fs";

class CancionesService {


    public async registrarCancion(cancion) {


        let requestManager = new RequestManager();
        let datosPreparados = this.prepararDatosParaGuardado(cancion);
        let resultadoRegistroCancion;
        try {
            resultadoRegistroCancion = await requestManager.postRequest(rutaRegistrarCancion, datosPreparados.cancion);
        } catch (excepcion) {
            console.log(excepcion);
        }
        if (resultadoRegistroCancion.estatus == true) {
            try {
                const form = new FormData();
                let tipo = typeof(datosPreparados.archivoCancion.cancion);
                form.append("id", datosPreparados.archivoCancion.id);
                form.append("fkIdCancion", datosPreparados.archivoCancion.fkIdCancion);
                form.append("fkIdPortada", datosPreparados.archivoCancion.fkIdPortada);
                form.append("nombreCancion", datosPreparados.archivoCancion.nombreCancion);
                form.append("tamanoEnMb", datosPreparados.archivoCancion.tamanoEnMb);
                form.append("formato", datosPreparados.archivoCancion.formato);
                form.append("codigoIsrc", datosPreparados.archivoCancion.codigoIsrc);
                form.append("urlCancion", datosPreparados.archivoCancion.urlCancion);
                form.append("fkIdEstatus", datosPreparados.archivoCancion.fkIdEstatus);
                let rutaCancion:string = await this.recrearArchivoCancion(datosPreparados.archivoCancion);    
                form.append("cancion", fs.createReadStream(rutaCancion));
                form.append("nombreArtista", datosPreparados.archivoCancion.nombreArtista);
                form.append("nombreAlbum", datosPreparados.archivoCancion.nombreAlbum);
                let resultadoRegistroArChivoDeCancion = await requestManager.postFormRequest(rutaSubirCancion, form);
                if (resultadoRegistroArChivoDeCancion.estatus = false) {
                    return MensajesManager.crearMensajeDeError("error al registrar la cancion", "error al registrar la cancion");
                }
            } catch (excepcion) {
                return MensajesManager.crearMensajeDeError("error al registrar la cancion", excepcion);
            }
        }
        return MensajesManager.crearMensajeDeExito("cancion registrada con exito");
    }

    public async actualizarCancion(cancion) {
        let requestManager = new RequestManager();
        let datosPreparados = this.prepararDatosParaGuardado(cancion);
        let resultadoRegistroCancion = await requestManager.postRequest(rutaActualizarCancion, datosPreparados.cancion);
        if (resultadoRegistroCancion.estatus == true) {
            try {
                let resultadoRegistroArChivoDeCancion = await requestManager.postRequest(rutaSubirCancion, datosPreparados.archivoCancion);
                if (resultadoRegistroArChivoDeCancion.estatus = false) {
                    return MensajesManager.crearMensajeDeError("error al actualizar la cancion", "error al actualizar la cancion");
                }

            } catch (excepcion) {
                return MensajesManager.crearMensajeDeError("error al actualizar la cancion", excepcion);
            }
        }
        return MensajesManager.crearMensajeDeExito("cancion actualizada con exito");
    }

    private prepararDatosParaGuardado(request): any {

        let cancion = {
            id: "",
            fkIdAlbum: "",
            titulo: "",
            numeroDeTrack: "",
            genero: "",
            duracion: 0,
            contenidoExplicito: "",
            fkIdEstatus: ""
        }
        cancion.fkIdAlbum = request.body.fkIdAlbum;
        cancion.titulo = request.body.titulo;
        cancion.numeroDeTrack = request.body.numeroDeTrack;
        cancion.genero = request.body.numeroDeTrack;
        cancion.contenidoExplicito = request.body.contenidoExplicito;
        cancion.fkIdEstatus = request.body.fkIdEstatus;
        let archivoCancion = {
            id: "",
            fkIdCancion: "",
            fkIdPortada: "",
            nombreCancion: "",
            tamanoEnMb: 0,
            formato: "",
            codigoIsrc: "",
            urlCancion: "",
            fkIdEstatus: "1",
            cancion: "",
            nombreArtista: "",
            nombreAlbum: "",
        }

        archivoCancion.cancion = request.files.cancion;
        archivoCancion.codigoIsrc = request.body.codigoIsrc;
        archivoCancion.fkIdEstatus = request.body.fkIdEstatus;
        archivoCancion.nombreArtista = request.body.nombreArtista;
        archivoCancion.nombreAlbum = request.body.nombreAlbum;
        let datosPreparados = {
            cancion: cancion,
            archivoCancion: archivoCancion
        }

        return datosPreparados;
    }
    public static convertirBytesAMegaBytes (bytes){
        return (bytes/1024)/1024;
    }

    private async recrearArchivoCancion(cancionP):Promise<any>{
        
        let nombreCancionConExtension = "original.mp3";
        let rutaDeGuardadoFinal = path.join(nombreCancionConExtension);
        let respuestaFinal = null;
        try {
               await fse.writeFile(rutaDeGuardadoFinal,cancionP.cancion.data);
        }catch(excepcion){
          
          return undefined;
        }
        return rutaDeGuardadoFinal;
    }
 

}

export let cancionesService = new CancionesService();
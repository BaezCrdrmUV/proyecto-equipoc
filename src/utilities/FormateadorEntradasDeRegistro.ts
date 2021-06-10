import {nombrePredeterminadoDePortadas} from "../config/global";
import {nombrePredeterminadoDeCanciones} from "../config/global";
import {CancionesRegister} from "../utilities/CancionesRegister";
export class FormateadorEntradasDeRegistro{


    public static prepararDatosParaGuardadoDePortadas(datosPortada):any{
        let datosParaArchivo ={
            nombreDeImagen:nombrePredeterminadoDePortadas,
            formato:"."+datosPortada.files.portada.mimetype.split("/")[1],
            nombreArtista:datosPortada.body.nombreArtista,
            nombreAlbum:datosPortada.body.nombreAlbum,
            portada:datosPortada.files.portada
        }
       
        let datosParaRegistroEnBd = {
            fkIdArtista:datosPortada.body.fkIdArtista,
            fkIdAlbum:datosPortada.body.fkIdAlbum,
            nombreDeImagen:nombrePredeterminadoDePortadas,
            formato:datosParaArchivo.formato,
            urlDePortada:datosPortada.body.urlDePortada,
            urlPublicaDePortada:"",
            fkIdEstatus:parseInt(datosPortada.body.fkIdEstatus)
        }
        let datosPreparados = {
            datosParaArchivo,
            datosParaRegistroEnBd
        }
        return datosPreparados;
    }
    public static prepararDatosParaActualizadoDePortadas(datosPortada):any{
        let datosParaArchivo ={
            nombreDeImagen:nombrePredeterminadoDePortadas,
            formato:"."+datosPortada.files.portada.mimetype.split("/")[1],
            nombreArtista:datosPortada.body.nombreArtista,
            nombreAlbum:datosPortada.body.nombreAlbum,
            portada:datosPortada.files.portada
        }
       
        let datosParaRegistroEnBd = {
            id:datosPortada.body.id,
            fkIdArtista:datosPortada.body.fkIdArtista,
            fkIdAlbum:datosPortada.body.fkIdAlbum,
            nombreDeImagen:nombrePredeterminadoDePortadas,
            formato:datosParaArchivo.formato,
            urlDePortada:datosPortada.body.urlDePortada,
            urlPublicaDePortada:"",
            fkIdEstatus:parseInt(datosPortada.body.fkIdEstatus)
        }
        let datosPreparados = {
            datosParaArchivo,
            datosParaRegistroEnBd
        }
        return datosPreparados;
    }

    public static prepararDatosParaGuardadoDeCanciones(datosCancion):any{
        let datosParaArchivo ={
            nombreArchivoCancion:nombrePredeterminadoDeCanciones,
            formato:"."+datosCancion.files.cancion.name.split(".")[1],
            nombreArtista:datosCancion.body.nombreArtista,
            nombreAlbum:datosCancion.body.nombreAlbum,
            nombreCancion:datosCancion.body.nombreCancion,
            cancion:datosCancion.files.cancion
        }
        if(datosCancion.body.fkIdEstatus == undefined||datosCancion.body.fkIdEstatus === ""){
            datosCancion.body.fkIdEstatus = 1;
        }
        if(datosCancion.body.fkIdPortada == (undefined ||"" )){
            datosCancion.body.fkIdPortada = null;
        }
        let datosParaRegistroEnBd = {
            fkIdCancion:datosCancion.body.fkIdCancion,
            fkIdPortada:datosCancion.body.fkIdPortada,
            nombreDelArchivo:nombrePredeterminadoDeCanciones,
            tamanoEnMb:CancionesRegister.convertirBytesAKiloBytes(datosParaArchivo.cancion.size),
            formato:datosParaArchivo.formato,
            codigoIsrc:datosCancion.body.codigoIsrc,
            urlCancion:datosCancion.body.urlCancion,
            urlPublicaCancion:datosCancion.body.urlPublicaCancion,
            fkIdEstatus:parseInt(datosCancion.body.fkIdEstatus)
        }
        let datosPreparados = {
            datosParaArchivo,
            datosParaRegistroEnBd
        }
        return datosPreparados;
    }
}
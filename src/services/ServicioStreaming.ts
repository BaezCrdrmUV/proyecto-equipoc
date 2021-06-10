import fs from "fs";
import path from "path";
import {rutaBaseCancionesYPortadas} from "../config/global";
import { MensajesManager } from "../utilities/MensajesManager";
export class ServicioStreaming{
    public obtenerArchivoDeReproduccion(artista,album,cancion,archivo){
        let indexMpd = path.join(rutaBaseCancionesYPortadas,artista,album,cancion,"dash",archivo);
        console.log("INDEX2MPD "+indexMpd);
        if(fs.existsSync(indexMpd)){
            return MensajesManager.crearMensajeDeExito("cancion obtenida con exito",indexMpd);
        }else{
             return MensajesManager.crearMensajeDeError("No existe esa cancion","No existe esa cancion");
        }
    }   
}
export let servicioStreaming = new ServicioStreaming()
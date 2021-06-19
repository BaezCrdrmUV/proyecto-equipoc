import axios from "axios";
import { RequestManager } from "../utilities/RequestManager";
import { rutaServicioLogin } from "../config/datosConexion";
import { MensajesManager } from "../utilities/MensajesManager";
import { rutaServicioBuscarArtista } from "../config/datosConexionMusica";


class LoginService {



  public async HacerLogin(Usuario) {

    let usuarioConSuArtista = {
      usuario: {},
      artista: {},
    };
    let requestManager = new RequestManager();
    let usuarioConsultado;
    try {
      usuarioConsultado = await requestManager.getRequest(rutaServicioLogin, {}, Usuario);
      usuarioConSuArtista.usuario = usuarioConsultado.datos;
      if (usuarioConsultado.estatus == true ) {
        if (usuarioConsultado.datos.fkIdArtista != undefined) {
          let params = {
            idArtista: usuarioConsultado.datos.fkIdArtista
          }
          let artistaConsultado = await requestManager.getRequest(rutaServicioBuscarArtista, params);
          usuarioConSuArtista.artista = artistaConsultado.datos;
        }
        return MensajesManager.crearMensajeDeExito("Inicio de sesion exitoso", usuarioConSuArtista);
      } else {
        return usuarioConsultado
      }
    } catch (excepcion) {
      return MensajesManager.crearMensajeDeError("Error al iniciar sesion", excepcion);
    }
  }
}



export let loginservice = new LoginService();
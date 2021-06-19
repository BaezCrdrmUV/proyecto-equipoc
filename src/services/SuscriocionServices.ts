import axios from "axios";
import { RequestManager } from "../utilities/RequestManager";
import { rutaServicioLogin, rutaServicioRegistrar, rutaServicioActualizarUsuario } from "../config/datosConexion";
import { MensajesManager } from "../utilities/MensajesManager";
import { artistaService } from "./ArtistaService";


class ServiciosSuscripcion {



  public async RegistrarUsuario(Usuario) {
    let respuestaFinal = {
      estatus: false,
      personaEncontrada: Object,
      errores: new Array()
    };
    let requestManager = new RequestManager();
    let usuarioConsultado = await requestManager.postRequest(rutaServicioRegistrar, Usuario);
    if (usuarioConsultado.estatus == true) {
      try {
        return usuarioConsultado;
      } catch (excepcion) {
        return MensajesManager.crearMensajeDeError("error al registrar el usuario", excepcion);
      }
    }
    return usuarioConsultado
  }


  public async ActualizarUsuario(Usuario) {

    let respuestaFinal = {
      estatus: false,
      personaEncontrada: Object,
      errores: new Array()
    };
    let requestManager = new RequestManager();

    let usuarioConsultado = await requestManager.putRequest(rutaServicioActualizarUsuario, Usuario);
    if (usuarioConsultado.estatus == true) {
      try {

        return usuarioConsultado;

      } catch (excepcion) {
        return MensajesManager.crearMensajeDeError("error al actualizar el usuario", excepcion);
      }
    }

    return MensajesManager.crearMensajeDeExito("Usuario actualizado con exito");
  }

}
export let suscripcionService = new ServiciosSuscripcion();
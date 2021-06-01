"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MensajesManager = void 0;
class MensajesManager {
    static crearMensajeDeExito(mensaje, datos = {}) {
        let resultadoOperacion = {
            estatus: false,
            mensaje: mensaje,
            datos: {},
            errores: new Array()
        };
        resultadoOperacion.estatus = true;
        resultadoOperacion.mensaje = mensaje;
        resultadoOperacion.datos = datos;
        return resultadoOperacion;
    }
    static crearMensajeDeError(mensaje, excepcion) {
        let resultadoOperacion = {
            estatus: false,
            datos: null,
            mensaje: "",
            erroresDeGuardado: new Array(),
            erroresDeValidacion: new Array()
        };
        resultadoOperacion.erroresDeValidacion.push(excepcion);
        resultadoOperacion.mensaje = "Error al realizar la transaccion";
        return resultadoOperacion;
    }
    static crearMensajeDeExitoRequestServicio(mensaje, datos) {
        let respuestaFinal = {
            estatus: false,
            mensaje: "",
            datos: new Array(),
            errores: new Array()
        };
        respuestaFinal.estatus = true;
        respuestaFinal.mensaje = mensaje;
        respuestaFinal.datos = datos;
        return respuestaFinal;
    }
    static crearMensajeDeErrorRequestServicio(mensaje, excepcion = null) {
        let respuestaFinal = {
            estatus: false,
            mensaje: "",
            datos: new Array(),
            errores: new Array()
        };
        respuestaFinal.estatus = false;
        respuestaFinal.mensaje = mensaje;
        respuestaFinal.errores.push(excepcion);
        return respuestaFinal;
    }
}
exports.MensajesManager = MensajesManager;
//# sourceMappingURL=MensajesManager.js.map
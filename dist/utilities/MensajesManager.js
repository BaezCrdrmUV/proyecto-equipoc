"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MensajesManager = void 0;
class MensajesManager {
    static crearMensajeDeExito(mensaje, datos = null) {
        let resultadoOperacion = {
            estatus: false,
            datos: null,
            mensaje: "",
            erroresDeGuardado: [],
            erroresDeValidacion: []
        };
        resultadoOperacion.estatus = true;
        resultadoOperacion.mensaje = mensaje;
        resultadoOperacion.datos = datos;
        return resultadoOperacion;
    }
    static crearMensajeDeError(excepcion, mensaje) {
        let resultadoOperacion = {
            estatus: false,
            datos: null,
            mensaje: "",
            erroresDeGuardado: [],
            erroresDeValidacion: []
        };
        resultadoOperacion.erroresDeValidacion.push(excepcion);
        resultadoOperacion.mensaje = mensaje;
        return resultadoOperacion;
    }
    static crearMensajeDeErrorDeValidacion(errorDeValidacion) {
        let resultadoOperacion = {
            estatus: false,
            datos: null,
            mensaje: "No se encontraron resultados",
            erroresDeGuardado: [],
            erroresDeValidacion: []
        };
        resultadoOperacion.erroresDeValidacion.push(errorDeValidacion);
        if (errorDeValidacion == null) {
            resultadoOperacion.mensaje = " no se encontraron resultados";
        }
        else {
            resultadoOperacion.mensaje = "los datos introducidos no son validos";
        }
        return resultadoOperacion;
    }
    static crearMensajeDeErrorGuardadoFisico(excepcion, mensaje) {
        let resultadoOperacion = {
            estatus: false,
            datos: null,
            mensaje: "",
            rutaDeGuardado: null,
            erroresDeGuardado: [],
            erroresDeValidacion: []
        };
        resultadoOperacion.erroresDeValidacion.push(excepcion);
        resultadoOperacion.mensaje = mensaje;
        return resultadoOperacion;
    }
    static crearMensajeDeExitoDeGuardadoFisico(mensaje, rutaDeGuardado) {
        let resultadoOperacion = {
            estatus: false,
            datos: null,
            mensaje: "",
            rutaDeGuardado: "",
            erroresDeGuardado: [],
            erroresDeValidacion: []
        };
        resultadoOperacion.estatus = true;
        resultadoOperacion.mensaje = mensaje;
        resultadoOperacion.rutaDeGuardado = rutaDeGuardado;
        return resultadoOperacion;
    }
}
exports.MensajesManager = MensajesManager;
//# sourceMappingURL=MensajesManager.js.map
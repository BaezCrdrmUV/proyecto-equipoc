"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.servicioCanciones = exports.ServicioCanciones = void 0;
const CancionesRepository_1 = require("../bd/controllersBd/CancionesRepository");
const CancionesRegister_1 = require("../utilities/CancionesRegister");
const MensajesManager_1 = require("../utilities/MensajesManager");
const FormateadorEntradasDeRegistro_1 = require("../utilities/FormateadorEntradasDeRegistro");
const path_1 = __importDefault(require("path"));
class ServicioCanciones {
    async subirCancion(datosCancion) {
        let cancionesRegister = new CancionesRegister_1.CancionesRegister();
        let datosPreparados;
        let resultadoDeEscritura;
        if (datosCancion.body != null && datosCancion.files != null) {
            datosPreparados = FormateadorEntradasDeRegistro_1.FormateadorEntradasDeRegistro.prepararDatosParaGuardadoDeCanciones(datosCancion);
            resultadoDeEscritura = await cancionesRegister.guardarCancion(datosPreparados.datosParaArchivo);
        }
        else {
            return MensajesManager_1.MensajesManager.crearMensajeDeErrorDeValidacion("el cuerpo de la peticion y el archivo de cancion asociado debe contener valores");
        }
        if (resultadoDeEscritura.estatus == true) {
            let cancionesRepository = new CancionesRepository_1.CancionesRepository();
            //se asigna la url de gaurdado al objeto que se guardara en bd
            datosPreparados.datosParaRegistroEnBd.urlCancion = resultadoDeEscritura.rutaDeGuardado;
            datosPreparados.datosParaRegistroEnBd.urlPublicaCancion = resultadoDeEscritura.rutaDeGuardadoPublica;
            console.log("RUTA ARRAY : " + resultadoDeEscritura.rutaDeGuardado.split(path_1.default.sep + "original.mp3"));
            let rutasSeparada = resultadoDeEscritura.rutaDeGuardado.split(path_1.default.sep + "original.mp3");
            let rutaDeSegmentacion = rutasSeparada[0];
            console.log("RUTA DE SEGMENTACION" + rutaDeSegmentacion);
            cancionesRegister.segmentarCancionParaStreaming(rutaDeSegmentacion);
            let respuestaBd;
            respuestaBd = await cancionesRepository.registrarCancion(datosPreparados.datosParaRegistroEnBd);
            if (respuestaBd.estatus == false) {
                console.log("ELIMINANDO CANCION");
                await cancionesRegister.borrarCancion(resultadoDeEscritura.urlCancion);
                console.log("CANCION ELMINADA");
            }
            return respuestaBd;
        }
        else {
            let erroresDeGuardadoFisico = resultadoDeEscritura.resultadoDeOperacion.erroresDeGuardado;
            return MensajesManager_1.MensajesManager.crearMensajeDeError(erroresDeGuardadoFisico, "Error al registrar la cancion");
        }
    }
    async buscarUrlDeCancion(idCancion) {
        let cancionesRepository = new CancionesRepository_1.CancionesRepository();
        let respuesta = await cancionesRepository.obtenerUrlCancion(idCancion);
        return respuesta;
    }
}
exports.ServicioCanciones = ServicioCanciones;
exports.servicioCanciones = new ServicioCanciones();
//# sourceMappingURL=ServicioCanciones.js.map
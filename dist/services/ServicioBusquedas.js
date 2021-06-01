"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.servicioBusquedas = exports.ServicioBusquedas = void 0;
const RequestManager_1 = require("../utilities/RequestManager");
const datosConexion_1 = require("../config/datosConexion");
const MensajesManager_1 = require("../utilities/MensajesManager");
//const axios = require('axios').default;
class ServicioBusquedas {
    async buscarArtistaPorNombre(nombreArtistaP) {
        let params = {
            nombreArtista: nombreArtistaP
        };
        let respuestaFinal = {
            estatus: false,
            datos: new Array(),
            errores: new Array()
        };
        let requestManager = new RequestManager_1.RequestManager();
        let artistasConsultados = await requestManager.getRequest(datosConexion_1.rutaServicioBusquedaCanciones, params);
        if (artistasConsultados.estatus == true) {
            try {
                for (let i = 0; i < artistasConsultados.datos.length - 1; i++) {
                    artistasConsultados[i].portada = await requestManager.getRequest(datosConexion_1.rutaServicioBusquedaPortadas, artistasConsultados[i].id);
                }
            }
            catch (excepcion) {
                return MensajesManager_1.MensajesManager.crearMensajeDeError("error al consultar los datos", excepcion);
            }
        }
        return MensajesManager_1.MensajesManager.crearMensajeDeExito("artstas consultados con exito", artistasConsultados.datos);
    }
}
exports.ServicioBusquedas = ServicioBusquedas;
exports.servicioBusquedas = new ServicioBusquedas();
//# sourceMappingURL=ServicioBusquedas.js.map
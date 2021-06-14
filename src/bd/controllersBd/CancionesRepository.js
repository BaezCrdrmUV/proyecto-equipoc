"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CancionesRepository = void 0;
const typeorm_1 = require("typeorm");
const ArchivoCancion_1 = require("../entity/ArchivoCancion");
const MensajesManager_1 = require("../../utilities/MensajesManager");
const uuid_1 = require("uuid");
const class_validator_1 = require("class-validator");
class CancionesRepository {
    async registrarCancion(cancion) {
        process.on('unhandledRejection', function (error) {
            console.log(error);
        });
        let cancionRegistrada;
        try {
            cancion.id = uuid_1.v4();
            let archivoCancionBd = await typeorm_1.getConnection().manager.create(ArchivoCancion_1.ArchivoCancion, cancion);
            console.log("ARCHIVO CANCION: " + archivoCancionBd);
            try {
                console.log("INICIA VALIDACION");
                await class_validator_1.validateOrReject(archivoCancionBd);
                console.log("VALICACION CORRECTA");
            }
            catch (excepcionDeValidacion) {
                console.log("EXCEPCION EN VALIDACION");
                return MensajesManager_1.MensajesManager.crearMensajeDeErrorDeValidacion(excepcionDeValidacion);
            }
            console.log("A PUNTO DE REGISTRAR");
            cancionRegistrada = await typeorm_1.getConnection().manager.save(archivoCancionBd);
            console.log("REGISTRO CORRECTO: " + cancionRegistrada);
        }
        catch (excepcion) {
            console.log("EXCEPCION AL REGISTRAR: " + excepcion);
            return MensajesManager_1.MensajesManager.crearMensajeDeError(excepcion, "no se pudo registrar en la portada");
        }
        console.log("A PUNTO DE ENVIAR MENSJAE DE EXITO");
        return MensajesManager_1.MensajesManager.crearMensajeDeExito("portada registrada con exito", cancionRegistrada);
    }
    async actualizarCancion(cancionP) {
        let cancion;
        try {
            console.log("CONEXION CREADA");
            console.log("ID ALBUM " + cancionP.id);
            cancion = await typeorm_1.getRepository(ArchivoCancion_1.ArchivoCancion).findOneOrFail(cancionP.id);
            console.log("BSUQUEDA REALIZADA");
            if (cancion == null) {
                console.log("BUSQUEDA NULA");
                return MensajesManager_1.MensajesManager.crearMensajeDeErrorDeValidacion(null);
            }
            console.log("COMIENZA ASIGNACION");
            cancion.fkIdCancion = cancionP.fkIdCancion,
                cancion.fkIdPortada = cancionP.fkIdPortada,
                cancion.nombreDelArchivo = cancionP.nombreDelArchivo,
                cancion.tamanoEnMb = cancionP.tamanoEnMb,
                cancion.formato = cancionP.formato,
                cancion.codigoIsrc = cancionP.codigoIsrc,
                cancion.urlCancion = cancionP.urlCancion,
                cancion.fkIdEstatus = cancionP.fkIdEstatus;
            console.log("TERMINA ASIGNACION");
            try {
                console.log("VALICACION");
                await class_validator_1.validateOrReject(cancion);
            }
            catch (excepcionDeValidacion) {
                console.log("FALLO LA VALIDACION");
                return MensajesManager_1.MensajesManager.crearMensajeDeErrorDeValidacion(excepcionDeValidacion);
            }
            await typeorm_1.getRepository(ArchivoCancion_1.ArchivoCancion).save(cancion);
            console.log("GUARDADO EXITOSO");
        }
        catch (excepcion) {
            console.log("FALLO EL GUARDADO");
            return MensajesManager_1.MensajesManager.crearMensajeDeError(excepcion, "No se ha podido actualizar la portada");
        }
        return MensajesManager_1.MensajesManager.crearMensajeDeExito("portada actualizado con exito");
    }
    async obtenerUrlCancion(IdCancion) {
        let cancion = null;
        try {
            cancion = await typeorm_1.getRepository(ArchivoCancion_1.ArchivoCancion).findOneOrFail({ where: { fkIdCancion: IdCancion } });
            if (cancion == undefined || cancion.length == 0) {
                return MensajesManager_1.MensajesManager.crearMensajeDeErrorDeValidacion(null);
            }
        }
        catch (excepcion) {
            return MensajesManager_1.MensajesManager.crearMensajeDeError(excepcion, "Hubo un error al consultar la portada");
        }
        return MensajesManager_1.MensajesManager.crearMensajeDeExito("consulta exitosa", cancion.urlCancion);
    }
}
exports.CancionesRepository = CancionesRepository;
//# sourceMappingURL=CancionesRepository.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortadasRepository = void 0;
const typeorm_1 = require("typeorm");
const ArchivoPortada_1 = require("../entity/ArchivoPortada");
const MensajesManager_1 = require("../../utilities/MensajesManager");
const uuid_1 = require("uuid");
const class_validator_1 = require("class-validator");
class PortadasRepository {
    async registrarPortada(portada) {
        process.on('unhandledRejection', function (error) {
            console.log(error);
        });
        let portadaRegistrada;
        try {
            portada.id = uuid_1.v4();
            let archivoPortadaBd = await typeorm_1.getConnection().manager.create(ArchivoPortada_1.ArchivoPortada, portada);
            try {
                console.log("INICIA VALIDACION");
                await class_validator_1.validateOrReject(archivoPortadaBd);
                console.log("VALICACION CORRECTA");
            }
            catch (excepcionDeValidacion) {
                console.log("EXCEPCION EN VALIDACION");
                return MensajesManager_1.MensajesManager.crearMensajeDeErrorDeValidacion(excepcionDeValidacion);
            }
            console.log("A PUNTO DE REGISTRAR");
            portadaRegistrada = await typeorm_1.getConnection().manager.save(archivoPortadaBd);
            console.log("REGISTRO CORRECTO: " + portadaRegistrada);
        }
        catch (excepcion) {
            console.log("EXCEPCION AL REGISTRAR: " + excepcion);
            return MensajesManager_1.MensajesManager.crearMensajeDeError(excepcion, "no se pudo registrar en la portada");
        }
        console.log("A PUNTO DE ENVIAR MENSJAE DE EXITO");
        return MensajesManager_1.MensajesManager.crearMensajeDeExito("portada registrada con exito", portadaRegistrada);
    }
    async actualizarPortada(portadaP) {
        let portada;
        try {
            console.log("CONEXION CREADA");
            console.log("ID ALBUM " + portadaP.id);
            portada = await typeorm_1.getRepository(ArchivoPortada_1.ArchivoPortada).findOneOrFail(portadaP.id);
            console.log("BSUQUEDA REALIZADA");
            if (portada == undefined) {
                console.log("BUSQUEDA NULA");
                return MensajesManager_1.MensajesManager.crearMensajeDeErrorDeValidacion(null);
            }
            console.log("COMIENZA ASIGNACION");
            portada.id = portadaP.id;
            portada.fkIdArtista = portadaP.fkIdArtista;
            portada.fkIdAlbum = portadaP.fkIdAlbum;
            portada.formato = portadaP.formato;
            portada.nombreDeImagen = portadaP.nombreDeImagen;
            portada.urlCancion = portadaP.urlDePortada;
            portada.fkIdEstatus = portadaP.fkIdEstatus;
            console.log("TERMINA ASIGNACION");
            try {
                console.log("VALICACION");
                await class_validator_1.validateOrReject(portada);
            }
            catch (excepcionDeValidacion) {
                console.log("FALLO LA VALIDACION");
                return MensajesManager_1.MensajesManager.crearMensajeDeErrorDeValidacion(excepcionDeValidacion);
            }
            await typeorm_1.getRepository(ArchivoPortada_1.ArchivoPortada).save(portada);
            console.log("ACTUALIZADO EXITOSO");
        }
        catch (excepcion) {
            console.log("FALLO EL ACTUALIZADO");
            return MensajesManager_1.MensajesManager.crearMensajeDeError(excepcion, "No se ha podido actualizar la portada");
        }
        return MensajesManager_1.MensajesManager.crearMensajeDeExito("portada actualizada con exito");
    }
    async obtenerPortadaPorId(idPortada) {
        console.log("ID PORTADA 2: " + idPortada);
        let portada;
        try {
            console.log("ID ALBUM: " + idPortada);
            console.log("SE CREA CONEXION");
            portada = await typeorm_1.getRepository(ArchivoPortada_1.ArchivoPortada).findOneOrFail({ where: { id: idPortada } });
            console.log("VALOR DEL ALBUM" + portada);
            if (portada == undefined) {
                console.log("EL RESULTADO ES NULL");
                return MensajesManager_1.MensajesManager.crearMensajeDeErrorDeValidacion(null);
            }
            console.log("SE SALTO EL IF");
        }
        catch (excepcion) {
            console.log("HUBO EXCEPCION: ");
            return MensajesManager_1.MensajesManager.crearMensajeDeError(excepcion, "ha ocurrido un error al consultar la portada");
        }
        return MensajesManager_1.MensajesManager.crearMensajeDeExito("consulta exitosa", portada);
    }
    async obtenerPortadaPorIdAlbum(IdAlbum) {
        let portada = null;
        try {
            portada = await typeorm_1.getRepository(ArchivoPortada_1.ArchivoPortada).find({ where: { fkIdAlbum: IdAlbum } });
            if (portada == undefined || portada.length == 0) {
                return MensajesManager_1.MensajesManager.crearMensajeDeErrorDeValidacion(null);
            }
        }
        catch (excepcion) {
            return MensajesManager_1.MensajesManager.crearMensajeDeError(excepcion, "Hubo un error al consultar la portada");
        }
        return MensajesManager_1.MensajesManager.crearMensajeDeExito("consulta exitosa", portada);
    }
    async obtenerPortadaPorIdArtista(IdArtista) {
        let portada = null;
        try {
            portada = await typeorm_1.getRepository(ArchivoPortada_1.ArchivoPortada).find({ where: { fkIdArtista: IdArtista } });
            if (portada == undefined || portada.length == 0) {
                return MensajesManager_1.MensajesManager.crearMensajeDeErrorDeValidacion(null);
            }
        }
        catch (excepcion) {
            return MensajesManager_1.MensajesManager.crearMensajeDeError(excepcion, "Hubo un error al consultar la portada");
        }
        return MensajesManager_1.MensajesManager.crearMensajeDeExito("consulta exitosa", portada);
    }
}
exports.PortadasRepository = PortadasRepository;
//# sourceMappingURL=PortadasRepository.js.map
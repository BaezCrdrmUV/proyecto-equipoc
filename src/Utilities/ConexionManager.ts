import {createConnection,getConnection} from "typeorm";
import {MensajesManager} from "./MensajesManager/MensajesManager"

export class ConexionManager {


    public static async probarConexion():Promise<any>{
        try{
            await getConnection();
            
        }catch(excepcion){
            console.log("NO SE HA PODIDO CONECTAR CON LA BD");
            return MensajesManager.crearMensajeDeError(excepcion);
        }
        return MensajesManager.crearMensajeDeExito("La conexion ya esta establecida");
    
    }
    public static async conectarABd (){
        try{
            createConnection();
        }catch(excepcion){
            console.log("Error al conectar a la bd");
            return MensajesManager.crearMensajeDeError(excepcion);
        }
        return MensajesManager.crearMensajeDeExito("conexion exitosa");
    }

}
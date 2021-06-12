
export class MensajesManager {

    public static crearMensajeDeExito(mensaje,datos = null){
        let resultadoOperacion = {
            estatus:false,
            datos:null,
            mensaje:"",
            erroresDeGuardado:[],
            erroresDeValidacion:[]
        }
        resultadoOperacion.estatus= true;
        resultadoOperacion.mensaje= mensaje;
        resultadoOperacion.datos = datos;                
        return resultadoOperacion;
    }
    
    public static crearMensajeDeError(excepcion){
        let resultadoOperacion = {
            estatus:false,
            datos:null,
            mensaje:"",
            erroresDeGuardado:[],
            erroresDeValidacion:[]
        }
        resultadoOperacion.erroresDeGuardado.push(excepcion);
        resultadoOperacion.mensaje= "Error al realizar la transaccion";        
        return resultadoOperacion;
    }

    public static crearMensajeDeErrorDeValidacion(errorDeValidacion){
        let resultadoOperacion = {
            estatus:false,
            datos:null,
            mensaje:"No se encontraron resultados",
            erroresDeGuardado:[],
            erroresDeValidacion:[]
        }
        
        resultadoOperacion.erroresDeValidacion.push(errorDeValidacion);
        if(errorDeValidacion == null){
            resultadoOperacion.mensaje=" no se encontraron resultados";
        }else{
            resultadoOperacion.mensaje= "los datos introducidos no son validos";
        }
        return resultadoOperacion;
    }   
}




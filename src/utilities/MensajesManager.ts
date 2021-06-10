
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
    
    public static crearMensajeDeError(excepcion,mensaje){
        let resultadoOperacion = {
            estatus:false,
            datos:null,
            mensaje:"",
            erroresDeGuardado:[],
            erroresDeValidacion:[]
        }
        resultadoOperacion.erroresDeValidacion.push(excepcion);
        resultadoOperacion.mensaje= mensaje;        
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

    public static crearMensajeDeErrorGuardadoFisico(excepcion,mensaje){
        let resultadoOperacion = {
            estatus:false,
            datos:null,
            mensaje:"",
            rutaDeGuardado:null,
            erroresDeGuardado:[],
            erroresDeValidacion:[]
        }
        resultadoOperacion.erroresDeValidacion.push(excepcion);
        resultadoOperacion.mensaje= mensaje;        
        return resultadoOperacion;
    }
    
    public static crearMensajeDeExitoDeGuardadoFisico(mensaje,rutaDeGuardado,rutaDeGuardadoPublica = null){
        let resultadoOperacion = {
            estatus:false,
            datos:null,
            mensaje:"",
            rutaDeGuardado:"",
            rutaDeGuardadoPublica:"",
            erroresDeGuardado:[],
            erroresDeValidacion:[]
        }
        resultadoOperacion.estatus= true;
        resultadoOperacion.mensaje= mensaje;
        resultadoOperacion.rutaDeGuardado = rutaDeGuardado;
        resultadoOperacion.rutaDeGuardadoPublica = rutaDeGuardadoPublica;                
        return resultadoOperacion;
    }   
}




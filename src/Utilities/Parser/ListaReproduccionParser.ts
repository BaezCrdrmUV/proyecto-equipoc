import {ListaReproduccion} from "../../bd/entity/ListaReproduccion";


export class ListaParser{

    static jsonToLista(datosLista):ListaReproduccion{
       
        let lista = new ListaReproduccion();

        lista.id = datosLista.id,
        lista.fkIdUsuario = datosLista.fkIdUsuario,
        lista.nombre = datosLista.nombre,
        lista.numeroDeTracks = datosLista.numeroDeTracks,
        lista.fkIdEstatus = datosLista.fkIdEstatus

        return lista;
    }

    static ListaToJson(lista:ListaReproduccion){
        let listaJson ={
            id: lista.id,
            fkIdUsuario: lista.fkIdUsuario,
            nombre: lista.nombre,
            numeroDeTracks: lista.numeroDeTracks,
            fkIdEstatus: lista.fkIdEstatus 
            
        }
        return listaJson;
    }

}
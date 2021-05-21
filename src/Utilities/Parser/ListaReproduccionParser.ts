import {ListaReproduccion} from "../../bd/entity/ListaReproduccion";


export class ListaParser{

    static jsonToLista(datosLista):ListaReproduccion{
       
        let lista = new ListaReproduccion();

        lista.id = lista.id,
        lista.fkIdUsuario = lista.fkIdUsuario,
        lista.nombre = lista.nombre,
        lista.numeroDeTracks = lista.numeroDeTracks,
        lista.fkIdEstatus = lista.fkIdEstatus

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
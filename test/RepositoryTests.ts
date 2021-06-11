import assert from "assert";
import {createConnection} from "typeorm";
import {Cancion} from "../src/bd/entity/Cancion";
import {ListaReproduccion} from "../src/bd/entity/ListaReproduccion";
import {CancionesListasDeReproduccion} from "../src/bd/entity/CancionesListasDeReproduccion";


before(async done=>{
    try{
        await createConnection();
    }catch(excepcion){
        console.log(excepcion);
    }
});

describe("RepositoryTests",()=>{
    it("agregar cancion",done=>{
            assert(1==1);
            done();
    });
});
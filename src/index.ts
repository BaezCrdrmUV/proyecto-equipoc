import "reflect-metadata";
import {ConnectionManager, createConnection} from "typeorm";
import app from './app';
import http from 'http';


let server = http.createServer(app);
const port = 4002;
const conectarBd = async() =>{
    let intentarConexion = true;
    while(intentarConexion){
             try{
                    await createConnection();
                     intentarConexion = false;
             }catch(excepcion){
                  
             }
    } 
}

conectarBd();


server.listen(port,function(){
    conectarBd();
    console.log("DIRNAME: "+__dirname);
    console.log("\n");
    console.log("corriendo en:  "+port);
});


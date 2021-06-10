import "reflect-metadata";
import {ConnectionManager, createConnection} from "typeorm";
import app from './app';
import http from 'http';


let server = http.createServer(app);
const port = 4002;
server.listen(port,function(){
    conectar();
    console.log("DIRNAME: "+__dirname);
    console.log("\n");
    console.log("corriendo en:  "+port);
});



const conectar = async () => {
    try{
        await createConnection();
    }catch(excepcion){
        console.log("No se ha podido conectar con la bd")
    }
    
}
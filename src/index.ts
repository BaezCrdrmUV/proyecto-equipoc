import "reflect-metadata";
import {ConnectionManager, createConnection, UsingJoinColumnIsNotAllowedError} from "typeorm";
import app from './app';
import http from 'http';


let server = http.createServer(app);
const port = 4002;
const ip = "192.168.100.51";
server.listen(port,ip,function(){
    conectar();
    console.log("DIRNAME: "+__dirname);
    console.log("\n");
    console.log("corriendo en:  "+port);
});


const conectar = async () => {
    await createConnection();
}
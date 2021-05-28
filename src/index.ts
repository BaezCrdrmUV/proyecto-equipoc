import "reflect-metadata";
import {createConnection, UsingJoinColumnIsNotAllowedError} from "typeorm";
import app from './app';
import http from 'http';


let server = http.createServer(app);
const port = 4002;

server.listen(port,function(){
    console.log("DIRNAME: "+__dirname);
    console.log("\n");
    console.log("corriendo en:  "+port);
});



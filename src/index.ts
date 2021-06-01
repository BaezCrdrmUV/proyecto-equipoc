import express from 'express';
import http from 'http';
import App from "./app"


let server = http.createServer(App);

let port = 4003;
server.listen(port,function(){
    console.log("gateway corriendo en puerto: "+port);
})

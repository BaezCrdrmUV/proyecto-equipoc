import { Router, Request, Response,NextFunction,Express } from "express";
import express from 'express';
import path from "path";
import {servicioStreaming} from "../services/ServicioStreaming";
import * as fs from "fs";
import { PassThrough } from "stream";
class StreamingApi{
    router: Router;
    storage: any;
    upload: any;
    constructor() {
        this.router = express.Router();
        this.routes();
    }

    routes(): void {   
        this.router.use( express.json());
        this.router.get('/artistas/:artista/:album/:cancion/dash/:archivo',this.reproducirCancion); // ?ids=12345...,23426...,63464....
        
    }

    async reproducirCancion(req: any, res: any, nextFunction: NextFunction) {
        let respuesta;
        try {
            
            if(req.params.artista != undefined  && req.params.album != undefined && req.params.cancion != undefined && req.params.archivo != null){
                respuesta = await servicioStreaming.obtenerArchivoDeReproduccion(req.params.artista,req.params.album,req.params.cancion,req.params.archivo);
                if(respuesta.estatus == true){
                    try{
                        let readStream = fs.createReadStream(respuesta.datos);
                        console.log("a punto de streamear");
                        readStream.pipe(res);
                    }catch(excepcion){
                        console.log("EXCEPCION "+ excepcion);
                    }
                   
                }
               
            }    
        } catch (error) {
            res.send(respuesta);
        }
    }

    
}
export let streamingApi = new StreamingApi().router;
import { Router, Request, Response,NextFunction,Express } from "express";
import {cancionesService} from "../services/CancionesService";
import express from 'express';
import uploadManager from 'express-fileupload';
class CancionesApi{
    upload:any;
    router: Router;
    app:Express;
    
    
    constructor() {

        this.upload = uploadManager();
        this.router = express.Router();
        this.routes();
        
    }
    routes(): void {   
        this.router.post('/registrar',this.registrarCancion); 
        this.router.put('/actualizar',this.actualizarCancion); 
    }

async registrarCancion(req: any, res: any, nextFunction: NextFunction) {
    let respuesta;
    try {
        if(req != undefined){
            respuesta = await cancionesService.registrarCancion(req);
                res.send(respuesta);
        }
    } catch (error) {
        res.send(respuesta);
    }
}

async actualizarCancion(req: any, res: any, nextFunction: NextFunction) {
    let respuesta;
    try {
        if(req != undefined){
            respuesta = await cancionesService.actualizarCancion(req);
            res.send(respuesta);
          
        }
    } catch (error) {
        res.send(respuesta);
    }
}

}
export let cancionesApi = new CancionesApi().router;
import { Router, Request, Response,NextFunction,Express } from "express";
import {albumService} from "../services/AlbumesServices";
import express from 'express';

class AlbumesApi{

    router: Router;
    app:Express;
    
    
    constructor() {
        this.app = express();
        this.router = Router();
        this.routes();
    }
    routes(): void {   
        this.router.post('/RegistrarAlbum',express.json(),this.RegistrarAlbum); 
        this.router.put('/Actualizar',express.json(),this.ActualizarAlbum); 
        this.router.get('/buscar',express.json(),this.buscarAlbumes); 

      
    }


async RegistrarAlbum(req: any, res: any, nextFunction: NextFunction) {
    let respuesta;
    try {
        if(req.body.nombreDeUsuario != undefined){
            respuesta = await albumService.RegistrarAlbum(req.body);
            if(respuesta.estatus == true){
                res.status(201);
                res.send(respuesta);
            }else{
                res.status(204);
                res.send(respuesta);
            }
        }
    } catch (error) {
        res.send(respuesta);
    }
}



async ActualizarAlbum(req: any, res: any, nextFunction: NextFunction) {
    let respuesta;
    try {
        if(req.body.nombreDeUsuario != undefined){
            respuesta = await albumService.ActualizarAlbum(req.body);
            res.send(respuesta);
          
        }
    } catch (error) {
        res.send(respuesta);
    }
}



async buscarAlbumes(req: any, res: any, nextFunction: NextFunction) {
    let respuesta;
    try {
        if(req.body.nombreDeUsuario != undefined){
            respuesta = await albumService.buscarAlbum(req.body);
            res.send(respuesta);
          
        }
    } catch (error) {
        res.send(respuesta);
    }
}






}
export let albumesApi = new AlbumesApi().router;
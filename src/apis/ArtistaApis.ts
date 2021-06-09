import { Router, Request, Response,NextFunction,Express } from "express";
import {artistaService} from "../services/ArtistaService";
import express from 'express';


class ArtistaApi{


    router: Router;
    app:Express;
    
    
    constructor() {
        this.app = express();
        this.router = Router();
        this.routes();
    }
    routes(): void {   
        this.router.post('/RegistrarArtista',express.json(),this.RegistrarArtista); 
        this.router.put('/Actualizar',express.json(),this.ActualizarArtista); 
  

      
    }




    async RegistrarArtista(req: any, res: any, nextFunction: NextFunction) {
        let respuesta;
        try {
            if(req.body.nombreDeUsuario != undefined){
                respuesta = await artistaService.RegistrarArtista(req.body);
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
    async ActualizarArtista(req: any, res: any, nextFunction: NextFunction) {
        let respuesta;
        try {
            if(req.body.nombreDeUsuario != undefined){
                respuesta = await artistaService.ActualizarArtista(req.body);
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






}

export let artistaAPi = new ArtistaApi().router;
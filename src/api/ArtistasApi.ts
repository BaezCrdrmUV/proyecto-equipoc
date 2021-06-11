import { Router, Request, Response,NextFunction,Express } from "express";
import express from 'express';
import {servicioArtistas} from '../services/ServicioArtistas';

class ArtistasApi {
    router: Router;
    storage: any;
    upload: any;
    app:Express;
    constructor() {
        this.app = express();
        this.router = Router();
        this.routes();
    }
    routes(): void {   
        this.router.post('/crear',express.json(),this.registrarArtista); // ?ids=12345...,23426...,63464....
        this.router.put('/actualizar',express.json() ,this.actualizarArtista);
        this.router.get('/buscar',express.json() ,this.buscarArtistaPorId);
    }

    async registrarArtista(req: any, res: any, nextFunction: NextFunction) {
        let respuesta;
        try {
                  
           respuesta = await servicioArtistas.registrarArtista(req.body);
           if(respuesta.estatus == true){
            res.status(201);
            res.send(respuesta);
        }else{
            res.status(204);
            res.send(respuesta);
        }
        } catch (error) {
            res.send(respuesta);
        }
    }

    async actualizarArtista(req: any, res: any, nextFunction: NextFunction) {
        let respuesta;
        try {
           respuesta = await servicioArtistas.actualizarArtista(req.body);
           if(respuesta.estatus == true){
            res.status(201);
            res.send(respuesta);
        }else{
            res.status(204);
            res.send(respuesta);
        }
        } catch (error) {
            res.send(respuesta);
        }
    }

    async buscarArtistaPorId(req: any, res: any, nextFunction: NextFunction) {
        let respuesta;
        try{
            if(req.query.idArtista != undefined){
               respuesta = await servicioArtistas.buscarArtistaPorId(req.query.idArtista);
               if(respuesta.estatus == true){
                res.status(201);
                res.send(respuesta);
            }else{
                res.status(204);
                res.send(respuesta);
            }
            }else if(req.query.nombreArtista != undefined){
              respuesta =  await servicioArtistas.buscarArtistaPorNombre(req.query.nombreArtista);
              if(respuesta.estatus == true){
                res.status(201);
                res.send(respuesta);
              }else{
                res.status(204);
                res.send(respuesta);
                }
            }
        }catch(error){
            res.send(respuesta);
        }
    }

}
export let artistasApi = new ArtistasApi().router;
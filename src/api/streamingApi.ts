import { Router, Request, Response,NextFunction,Express } from "express";
import express from 'express';

class StreamingApi{
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
        //this.app.use(express.json());
        //this.app.use(express.urlencoded({ extended: true }));
        this.router.post('/',function (){
            console.log("algo");
        }); // ?ids=12345...,23426...,63464....
        //this.router.put('/subirCancion' ,this.subirCancion);
        //this.router.get('/buscarPortadaArtista/:idArtista' ,this.buscarPortadaArtista);
        //this.router.get('/buscarPortadaAlbum/:idAlbum' ,this.buscarPortadaAlbum);
        //this.router.get('/buscarUrlCancion/:idCancion' ,this.buscarPortadaArtista);
    }
}
export let streamingApi = new StreamingApi().router;
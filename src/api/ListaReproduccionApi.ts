import { Router, Request, Response,NextFunction,Express } from "express";
import express from 'express';
import {serviciosListas} from '../services/ServicioListaReproduccion';



class ListaReproduccionApi {
    
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
        this.router.post('/crear',express.json(),this.registrarLista); // ?ids=12345...,23426...,63464....
        this.router.put('/actualizar',express.json() ,this.actualizarArtista);
        this.router.get('/buscar',express.json() ,this.buscarListaPorId);
     

    }

    async registrarLista(req: any, res: any, nextFunction: NextFunction) {
        try {
                  
            let respuesta = await  serviciosListas.registrarListaReproduccion(req.body);
            res.send(respuesta);

        } catch (error) {
            console.log(error);
        }
    }

    async actualizarArtista(req: any, res: any, nextFunction: NextFunction) {
        try {
            let respuesta = await serviciosListas.actualizarListaReproduccion(req.body);
            res.send(respuesta);
        } catch (error) {
            console.log(error);
        }
    }

    async buscarListaPorId(req: any, res: any, nextFunction: NextFunction) {
        try{
            
            if(req.query.idlista != undefined){
                let respuesta = await serviciosListas.buscarListaReproduccionPorId(req.query.idlista);
                res.send(respuesta);
            }else if(req.query.nombreLista != undefined){
               let respuesta = await serviciosListas.buscarListaReproduccionPorNombre(req.query.nombreLista);
               res.send(respuesta);
            }
            /*else{
                res.send('el davis es puto') para mandar al cliente;
            }*/
        }catch(error){
            console.log(error)
        }

    }



}
export let listaAPi = new ListaReproduccionApi().router;


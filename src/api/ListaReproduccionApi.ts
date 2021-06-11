import { Router, Request, Response,NextFunction,Express } from "express";
import express from 'express';
import {serviciosListas} from '../services/ServicioListaReproduccion';
import {createConnection, Connection} from "typeorm";



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
        this.router.put('/agregarCancion',express.json() ,this.agregarCancion);
        this.router.put('/agregarCancion',express.json() ,this.eliminarCancion);
        this.router.get('/buscar',express.json() ,this.buscarListaPorId);
     

    }

    async registrarLista(req: any, res: any, nextFunction: NextFunction) {
        let respuesta;
        try {          
            let respuesta = await  serviciosListas.registrarListaReproduccion(req.body);
            res.send(respuesta);

        } catch (error) {
            res.send(respuesta);
        }
    }

    async actualizarArtista(req: any, res: any, nextFunction: NextFunction) {
        let respuesta;
        try {
            console.log("IDLISTAAPI: "+req.body.id);
            console.log("FKIDUSUARIOPAPI: "+req.body.fkIdUsuario);
            console.log("NOMBRELISTAAPI: "+req.body.nombre);
            console.log("NUMERODETRACKSAPI: "+req.body.numeroDeTracks);
            console.log("IDESTATUSAPI: "+req.body.fkIdEstatus);
            respuesta = await serviciosListas.actualizarListaReproduccion(req.body);
            res.send(respuesta);
        } catch (error) {
            res.send(respuesta);
        }
    }

    async agregarCancion(req: any, res: any, nextFunction: NextFunction) {
        let respuesta;
        try {
            respuesta = await serviciosListas.agregarCancion(req.body);
            res.send(respuesta);
        } catch (error) {
            res.send(respuesta);
        }
    }
    async eliminarCancion(req: any, res: any, nextFunction: NextFunction) {
        let respuesta;
        try {
            console.log("IDLISTAAPI: "+req.body.id);
            console.log("FKIDUSUARIOPAPI: "+req.body.fkIdUsuario);
            console.log("NOMBRELISTAAPI: "+req.body.nombre);
            console.log("NUMERODETRACKSAPI: "+req.body.numeroDeTracks);
            console.log("IDESTATUSAPI: "+req.body.fkIdEstatus);
            respuesta = await serviciosListas.eliminarCancion(req.body);
            res.send(respuesta);
        } catch (error) {
            res.send(respuesta);
        }
    }


    async buscarListaPorId(req: any, res: any, nextFunction: NextFunction) {
        let  respuesta;
        try{
            
            if(req.query.idlista != undefined){
                respuesta = await serviciosListas.buscarListaReproduccionPorId(req.query.idlista);
                res.send(respuesta);
            }else if(req.query.nombreLista != undefined){
               respuesta = await serviciosListas.buscarListaReproduccionPorNombre(req.query.nombreLista);
               res.send(respuesta);
            }
            /*else{
                res.send('el davis es puto') para mandar al cliente;
            }*/
        }catch(error){
            res.send(respuesta);
        }

    }

    async conectarBd(){
       
    }



}
export let listaAPi = new ListaReproduccionApi().router;

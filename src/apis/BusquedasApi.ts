import { Router, Request, Response,NextFunction,Express } from "express";
import {servicioBusquedas} from "../services/ServicioBusquedas";
import express from 'express';
//import {servicioAlbumes} from '../services/ServicioAlbumes';

class BusquedasApi {
    router: Router;
    app:Express;
 

    constructor() {
        this.app = express();
        this.router = Router();
        this.routes();
    }
    routes(): void {   
        this.router.get('/buscarPorArtista',express.json(),this.buscarPorArtista); 
        //this.router.put('/actualizar',express.json() ,this.actualizarAlbum);
        //this.router.get('/buscar',express.json() ,this.buscarAlbumes);
    }
//
    async buscarPorArtista(req: any, res: any, nextFunction: NextFunction) {
        let respuesta;
        try {
            if(req.query.nombreArtista != undefined){
                respuesta = await servicioBusquedas.buscarArtistaPorNombre(req.query.nombreArtista);
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

    /*
    async actualizarAlbum(req: any, res: any, nextFunction: NextFunction) {
        let respuesta;
        try {
            if(req.body != undefined && req.body != null){
                    respuesta = await servicioAlbumes.actualizarAlbum(req.body);
                    console.log("API ALBUMES: "+respuesta);
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

    async buscarAlbumes(req: any, res: any, nextFunction: NextFunction) {
        let respuesta;
        try{
            if(req.query.id != undefined){
                console.log("SE EJECUTO ID");
                console.log("ID EN API "+req.query.id);
                respuesta =await servicioAlbumes.obtenerAlbumPorId(req.query.id);
                if(respuesta.estatus == true){
                    res.status(200);
                    res.send(respuesta);
                }else{
                    res.status(204);
                    res.send(respuesta);
                }
            }else if(req.query.titulo != undefined){
                console.log("SE EJECUTO titulo");
                respuesta =await servicioAlbumes.obtenerAlbumPorNombre(req.query.titulo,req.query.resultadosOmitidos,req.query.numeroDeResultadosEsperados);
                if(respuesta.estatus == true){
                    res.status(200);
                    res.send(respuesta);
                }else{
                    res.status(204);
                    res.send(respuesta);
                }
            }else if(req.query.idArtista != undefined){
                console.log("SE EJECUTO ARTISTA");    
                respuesta =await servicioAlbumes.obtenerAlbumesPorIdArtista(req.query.idArtista,req.query.resultadosOmitidos,req.query.numeroDeResultadosEsperados);
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
*/
}
export let busquedasApi = new BusquedasApi().router;
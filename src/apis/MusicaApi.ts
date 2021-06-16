import { Router, Request, Response,NextFunction,Express } from "express";
import {servicioBusquedas} from "../services/ServicioBusquedas";
import express from 'express';
//import {servicioAlbumes} from '../services/ServicioAlbumes';

class MusicaApi {
    router: Router;
    app:Express;
 

    constructor() {
        this.app = express();
        this.router = Router();
        this.routes();
    }
    routes(): void {   
        this.router.get('/buscarMusica/nombreartista/:nombre',express.json(),this.buscarMusicaPorNombreArtista);
        this.router.get('/buscarMusica/idartista/:id',express.json(),this.buscarMusicaPorIdArtista);
        this.router.get('/buscarMusica/nombrealbum/:nombre',express.json(),this.buscarMusicaNombreAlbum); 
        this.router.get('/buscarMusica/idalbum/:id',express.json(),this.buscarMusicaIdAlbum); 
        this.router.get('/buscarMusica/todas',express.json(),this.buscarMusicaTodasLasCanciones);
        //this.router.put('/actualizar',express.json() ,this.actualizarAlbum);
        //this.router.get('/buscar',express.json() ,this.buscarAlbumes);
    }
//
    async buscarMusicaPorNombreArtista(req: any, res: any, nextFunction: NextFunction) {
        let respuesta;
        try {
            if(req.params.nombre != undefined){
                respuesta = await servicioBusquedas.buscarArtistaPorNombre(req.params.nombre);
                if(respuesta.estatus == true){
                    res.status(201);
                    res.send(respuesta);
                }else{
                    res.status(204);
                    res.send(respuesta);
                }//
            }
        } catch (error) {
            res.send(respuesta);
        }
    }

    async buscarMusicaPorIdArtista(req: any, res: any, nextFunction: NextFunction) {
        let respuesta;
        try {
            if(req.params.id != undefined){
                respuesta = await servicioBusquedas.buscarArtistaPorId(req.params.id);
                if(respuesta.estatus == true){
                    res.status(201);
                    res.send(respuesta);
                }else{
                    res.status(204);
                    res.send(respuesta);
                }//
            }
        } catch (error) {
            res.send(respuesta);
        }
    }

    async buscarMusicaNombreAlbum(req: any, res: any, nextFunction: NextFunction) {
        let respuesta;
        try {
            if(req.params.nombre != undefined){
                respuesta = await servicioBusquedas.buscarAlbumPorNombre(req.params.nombre);
                if(respuesta.estatus == true){
                    res.status(201);
                    res.send(respuesta);
                }else{
                    res.status(204);
                    res.send(respuesta);
                }//
            }
        } catch (error) {
            res.send(respuesta);
        }
    }

    async buscarMusicaIdAlbum(req: any, res: any, nextFunction: NextFunction) {
        let respuesta;
        try {
            if(req.params.id != undefined){
                respuesta = await servicioBusquedas.buscarAlbumPorId(req.params.id);
                if(respuesta.estatus == true){
                    res.status(201);
                    res.send(respuesta);
                }else{
                    res.status(204);
                    res.send(respuesta);
                }//
            }
        } catch (error) {
            res.send(respuesta);
        }
    }


    async buscarMusicaTodasLasCanciones(req: any, res: any, nextFunction: NextFunction) {
        let respuesta;
        try {
                respuesta = await servicioBusquedas.buscarTodasLasCanciones();
                res.send(respuesta);         
        } catch (error) {
            res.send(respuesta);
        }
    }

    
    async buscarMusicaNombreCancion(req: any, res: any, nextFunction: NextFunction) {
        let respuesta;
        try {
            if(req.params.id != undefined){
                respuesta = await servicioBusquedas.buscarCancionPorNombre(req.params.id);
                if(respuesta.estatus == true){
                    res.status(201);
                    res.send(respuesta);
                }else{
                    res.status(204);
                    res.send(respuesta);
                }//
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
export let musicaApi = new MusicaApi().router;
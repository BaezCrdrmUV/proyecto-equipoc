import { Router, Request, Response,NextFunction,Express } from "express";
import express from 'express';
import {servicioAlbumes} from '../services/ServicioAlbumes';

class AlbumesApi {
    
    router: Router;
    app:Express;
 

    constructor() {
        this.app = express();
        this.router = Router();
        this.routes();
    }
    routes(): void {   
        this.router.post('/crear',express.json(),this.registrarAlbum); 
        this.router.put('/actualizar',express.json() ,this.actualizarAlbum);
        this.router.get('/buscar',express.json() ,this.buscarAlbumes);
    }

    async registrarAlbum(req: any, res: any, nextFunction: NextFunction) {
        let respuesta;
        try {
            if(req.body != undefined && req.body != null){
                respuesta = await servicioAlbumes.crearAlbum(req.body);
                res.send(respuesta);
                
            }
        } catch (error) {
            res.send(respuesta);
        }
    }

    async actualizarAlbum(req: any, res: any, nextFunction: NextFunction) {
        let respuesta;
        try {
            if(req.body != undefined && req.body != null){
                    respuesta = await servicioAlbumes.actualizarAlbum(req.body);
                    console.log("API ALBUMES: "+respuesta);
                    res.send(respuesta);
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
                res.send(respuesta);
                
            }else if(req.query.titulo != undefined){
                console.log("SE EJECUTO titulo");
                respuesta =await servicioAlbumes.obtenerAlbumPorNombre(req.query.titulo,req.query.resultadosOmitidos,req.query.numeroDeResultadosEsperados);
                res.send(respuesta);
                
            }else if(req.query.idArtista != undefined){
                console.log("SE EJECUTO ARTISTA");    
                respuesta =await servicioAlbumes.obtenerAlbumesPorIdArtista(req.query.idArtista,req.query.resultadosOmitidos,req.query.numeroDeResultadosEsperados); 
                res.send(respuesta);
                
            }
        }catch(error){
            res.send(respuesta);
        }
    }

}
export let albumesApi = new AlbumesApi().router;


import { Router, Request, Response,NextFunction,Express } from "express";
import express from 'express';
import path from 'path';
import fs  from 'fs-extra';
import {servicioPortadas} from '../services/ServicioPortadas';
import {servicioCanciones} from '../services/ServicioCanciones';

import {rutaBaseCancionesYPortadas} from "../config/global";
const fileUpload = require('express-fileupload');
let multer =  require('multer');
class MultimediaApi {
    router: Router;
    storage: any;
    upload: any;
    //app:Express;
    administradorCanciones : any;
    administradorPortadas : any;
    constructor() {
       
        this.router = express.Router();
        this.routes();
        this.upload = fileUpload();
    }

    routes(): void {   
        
       
        this.router.post('/subirPortadaArtista',this.subirPortadaArtista); // ?ids=12345...,23426...,63464....
        this.router.post('/subirPortadaAlbum',this.subirPortadaAlbum);
        //this.router.post('/actualizarPortadaAlbum',this.subirPortadaAlbum);
        //this.router.post('/actualizarPortadaArtista',this.subirPortadaAlbum);
        this.router.post('/subirCancion' ,this.subirCancion);
        this.router.get('/buscarPortadaId',this.buscarPortadaPorId);
        this.router.get('/buscarPortadaArtista' ,this.buscarPortadaArtista);
        this.router.get('/buscarPortadaAlbum' ,this.buscarPortadaAlbum);
        this.router.get('/buscarUrlCancion' ,this.buscarUrlCancion);
    }

    async subirPortadaArtista(req: any, res: any, nextFunction: NextFunction) {
        let respuesta;
        try {
            respuesta = await servicioPortadas.subirPortadaArtista(req);
            res.send(respuesta);
        } catch (error) {
            res.send(respuesta);
        }
    }

    async subirPortadaAlbum(req: any, res: any, nextFunction: NextFunction) {
        let respuesta;
        try {
            respuesta = await servicioPortadas.subirPordataAlbum(req);
            res.send(respuesta);
        } catch (error) {
            res.send(respuesta);
        }
    }
    
    async subirCancion(req: any, res: any, nextFunction: NextFunction) {
        let respuesta;
        try {
                  
           respuesta = await servicioCanciones.subirCancion(req);
           res.send(respuesta);
           
        } catch (error) {
            res.send(respuesta);
        }
    }

   

   
    async buscarPortadaPorId(req: any, res: any, nextFunction: NextFunction) {
        let respuesta;
        if(req.query.idPortada != (undefined || "")){
            try {
          
                respuesta = await servicioPortadas.buscarPortadaPorId(req.query.idPortada);
                res.send(respuesta);
            } catch (error) {
                res.send(respuesta);
            }
        }    
    }


    async buscarPortadaAlbum(req: any, res: any, nextFunction: NextFunction) {
        let respuesta;
        if(req.query.idAlbum != (undefined || "")){
            try {
          
                respuesta = await servicioPortadas.buscarPortadaPorIdAlbum(req.query.idAlbum);
                res.send(respuesta);
            } catch (error) {
                res.send(respuesta);
            }
        }    

    }

    async buscarPortadaArtista(req: any, res: any, nextFunction: NextFunction) {
        let respuesta;
        try{
            
            respuesta = await servicioPortadas.buscarPortadaPorIdArtista(req.query.idArtista);              
            res.send(respuesta);
        }catch(error){
            res.send(respuesta);
        }
    }

    async buscarUrlCancion(req: any, res: any, nextFunction: NextFunction) {
        let respuesta;
        try{
            if(req.query.idCancion != undefined){
               respuesta = await servicioCanciones.buscarUrlDeCancion(req.query.idCancion);
               res.send(respuesta);
            }
        }catch(error){
            res.send(respuesta);
        }

    }
}
export let multimediaApi = new MultimediaApi().router;
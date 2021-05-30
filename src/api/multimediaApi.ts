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
        this.router.post('/subirCancion' ,this.subirCancion);
        this.router.get('/buscarPortadaId/:idPortada' ,this.buscarPortadaPorId);
        this.router.get('/buscarPortadaArtista/:idArtista' ,this.buscarPortadaArtista);
        this.router.get('/buscarPortadaAlbum/:idAlbum' ,this.buscarPortadaAlbum);
        this.router.get('/buscarUrlCancion/:idCancion' ,this.buscarUrlCancion);
    }

    async subirPortadaArtista(req: any, res: any, nextFunction: NextFunction) {
        let respuesta;
        try {
            respuesta = await servicioPortadas.subirPortadaArtista(req);
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

    async subirPortadaAlbum(req: any, res: any, nextFunction: NextFunction) {
        let respuesta;
        try {
            respuesta = await servicioPortadas.subirPordataAlbum(req);
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
    
    async subirCancion(req: any, res: any, nextFunction: NextFunction) {
        let respuesta;
        try {
                  
           respuesta = await servicioCanciones.subirCancion(req);
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

   

   
    async buscarPortadaPorId(req: any, res: any, nextFunction: NextFunction) {
        let respuesta;
        try {
           respuesta = await servicioPortadas.buscarPortadaPorId(req.body);
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


    async buscarPortadaAlbum(req: any, res: any, nextFunction: NextFunction) {
        let respuesta;
        try{
         
               respuesta = await servicioPortadas.buscarPortadaPorIdAlbum(req.body);
               if(respuesta.estatus == true){
                res.status(201);
                res.send(respuesta);
               }
           
        }catch(error){
            res.send(respuesta);
        }

    }

    async buscarPortadaArtista(req: any, res: any, nextFunction: NextFunction) {
        let respuesta;
        try{
            
                respuesta = await servicioPortadas.buscarPortadaPorIdArtista(req.body);
               if(respuesta.estatus == true){
                    res.status(201);
                    res.send(respuesta);
                }else{
                    res.status(204);
                    res.send(respuesta);
                }
            
        }catch(error){
            res.send(respuesta);
        }
    }

    async buscarUrlCancion(req: any, res: any, nextFunction: NextFunction) {
        let respuesta;
        try{
            if(req.query.idArtista != undefined){
               respuesta = await servicioCanciones.buscarUrlDeCancion(req.body);
               if(respuesta.estatus == true){
                res.status(201);
                res.send(respuesta);
            }else{
                res.status(204);
                res.send(respuesta);
            }
            }else if(req.query.nombreArtista != undefined){
              //respuesta =  await servicioArtistas.buscarArtistaPorNombre(req.query.nombreArtista);
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
export let multimediaApi = new MultimediaApi().router;
import { Router, Request, Response,NextFunction,Express } from "express";
import express from 'express';
import {servicioCanciones} from '../services/ServicioCanciones';

class CancionesApi {
    
    router: Router;
    app:Express;
 

    constructor() {
        this.app = express();
        this.router = Router();
        this.routes();
    }
    routes(): void {   
        this.router.post('/crear',express.json(),this.registrarCancion); 
        this.router.put('/actualizar',express.json() ,this.actualizarCancion);
        this.router.get('/buscar',express.json() ,this.buscarCanciones);
    }

    async registrarCancion(req: any, res: any, nextFunction: NextFunction) {
        try {
            if(req.body != undefined && req.body != null){
                let respuesta = await servicioCanciones.crearCancion(req.body);
                if(respuesta.estatus == true){
                    res.status(201);
                    res.send(respuesta);
                }else{
                    res.status(200);
                    res.send(respuesta);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    async actualizarCancion(req: any, res: any, nextFunction: NextFunction) {
        try {
            if(req.body != undefined && req.body != null){
                    let respuesta = await servicioCanciones.actualizarCancion(req.body);
                    console.log("API CANCIONES: "+respuesta);
                    if(respuesta.estatus == true){
                        res.status(201);
                        res.send(respuesta);
                    }else{
                        res.status(200);
                        res.send(respuesta);
                    }
            }
        } catch (error) {
            console.log(error);
        }
    }

    async buscarCanciones(req: any, res: any, nextFunction: NextFunction) {
        try{
            if(req.query.todas != undefined){
                console.log("SE EJECUTO TODAS");
                let respuesta =await servicioCanciones.obtenerTodasLasCanciones(req.query.resultadosOmitidos,req.query.numeroDeResultadosEsperados);
                if(respuesta.estatus == true){
                    res.status(200);
                    res.send(respuesta);
                }else{
                    res.status(200);
                    res.send(respuesta);
                }
            }else if(req.query.id != undefined){
                console.log("SE EJECUTO ID");
                console.log("ID EN API "+req.query.id);
                let respuesta =await servicioCanciones.obtenerCancionPorId(req.query.id);
                    res.status(200);
                    res.send(respuesta);
                
            }else if(req.query.titulo != undefined){
                console.log("SE EJECUTO titulo");
                let respuesta =await servicioCanciones.obtenerCancionPorNombre(req.query.titulo,req.query.resultadosOmitidos,req.query.numeroDeResultadosEsperados);
                
                    res.status(200);
                    res.send(respuesta);
                
            }else if(req.query.idAlbum != undefined){
                console.log("SE EJECUTO IDALBUM");    
                 let respuesta =await servicioCanciones.obtenerCancionPorAlbum(req.query.idAlbum,req.query.resultadosOmitidos,req.query.numeroDeResultadosEsperados);
                
                    res.status(200);
                    res.send(respuesta);
                

            }else if(req.query.idLista != undefined){
                let respuesta =await servicioCanciones.obtenerCancionesDeListaDeReproduccion(req.query.idLista);
                   res.status(200);
                   res.send(respuesta);
               
            }
        }catch(error){
            console.log(error)
        }
    }


}
export let cancionesApi = new CancionesApi().router;


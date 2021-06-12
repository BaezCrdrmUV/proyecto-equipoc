import { Router, Request, Response,NextFunction,Express } from "express";
import express from 'express';
import {servicioCanciones} from '../services/ServicioCanciones';
import { Console } from "console";

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
        let respuesta; 
        try {
           
            if(req.body != undefined && req.body != null){
                respuesta = await servicioCanciones.crearCancion(req.body);
                res.send(respuesta);

            }
        } catch (error) {
            res.send(respuesta);
        }
    }

    async actualizarCancion(req: any, res: any, nextFunction: NextFunction) {
        let respuesta;
        try {
            if(req.body != undefined && req.body != null){
                    respuesta = await servicioCanciones.actualizarCancion(req.body);
                    console.log("API CANCIONES: "+respuesta);
                    res.send(respuesta);
                    
            }
        } catch (error) {
            res.send(respuesta);
        }
    }

    async buscarCanciones(req: any, res: any, nextFunction: NextFunction) {
        let respuesta;
        try{
            console.log("1C");
            if(req.query.todas != undefined){
                console.log("SE EJECUTO TODAS");
                respuesta =await servicioCanciones.obtenerTodasLasCanciones(req.query.resultadosOmitidos,req.query.numeroDeResultadosEsperados);
                console.log("2C");
                console.log("Exito busuqeda C");
                res.send(respuesta);
                
            }else if(req.query.id != undefined){
                console.log("SE EJECUTO ID");
                console.log("ID EN API "+req.query.id);
                respuesta =await servicioCanciones.obtenerCancionPorId(req.query.id);
                console.log("BUSQUEDA ID CORRECTA 1C");
                res.status(200);
                res.send(respuesta);
                
            }else if(req.query.titulo != undefined){
                console.log("SE EJECUTO titulo");
                respuesta =await servicioCanciones.obtenerCancionPorNombre(req.query.titulo,req.query.resultadosOmitidos,req.query.numeroDeResultadosEsperados);
                console.log("BUSQUEDA TITULO CORRECTA 1C");
                res.status(200);
                res.send(respuesta);
                
            }else if(req.query.idAlbum != undefined){
                console.log("SE EJECUTO IDALBUM");    
                 respuesta =await servicioCanciones.obtenerCancionPorAlbum(req.query.idAlbum,req.query.resultadosOmitidos,req.query.numeroDeResultadosEsperados);
                 console.log("BUSQUEDA ALBUM CORRECTA 1C");
                 res.status(200);
                 res.send(respuesta);
                

            }else if(req.query.idLista != undefined){
                respuesta =await servicioCanciones.obtenerCancionesDeListaDeReproduccion(req.query.idLista);
                console.log("BUSQUEDA IDLISTA CORRECTA 1C");
                res.status(200);
                res.send(respuesta);
               
            }
        }catch(error){
            res.send(respuesta);
        }
    }


}
export let cancionesApi = new CancionesApi().router;


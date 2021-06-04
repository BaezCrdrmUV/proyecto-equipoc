import { Router, Request, Response,NextFunction,Express } from "express";
import {suscripcionService} from "../services/SuscriocionServices";
import express from 'express';


class LoginApi {
router: Router;
app:Express;


constructor() {
    this.app = express();
    this.router = Router();
    this.routes();
}
routes(): void {   
    this.router.get('/RegistrarUsuario',express.json(),this.RegistrarUsuario); 
    this.router.get('/ActualizarUsuario',express.json(),this.ActualizarUsuario); 
  
}

async RegistrarUsuario(req: any, res: any, nextFunction: NextFunction) {
    let respuesta;
    try {
        if(req.query.NombreDeUsuario != undefined){
            respuesta = await suscripcionService.RegistrarUsuario(req.query.usuario);
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


async ActualizarUsuario(req: any, res: any, nextFunction: NextFunction) {
    let respuesta;
    try {
        if(req.query.NombreDeUsuario != undefined){
            respuesta = await suscripcionService.RegistrarUsuario(req.query.usuario);
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




}
export let RegistrarApi = new LoginApi().router;
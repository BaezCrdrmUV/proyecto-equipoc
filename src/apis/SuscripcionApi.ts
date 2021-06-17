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
    this.router.post('/RegistrarUsuario',express.json(),this.RegistrarUsuario); 
    this.router.put('/ActualizarUsuario',express.json(),this.ActualizarUsuario); 
  
}

async RegistrarUsuario(req: any, res: any, nextFunction: NextFunction) {
    let respuesta;
    try {
        if(req.body.nombreDeUsuario != undefined){
            respuesta = await suscripcionService.RegistrarUsuario(req.body);
            res.send(respuesta);
        }
    } catch (error) {
        res.send(respuesta);
    }
}


async ActualizarUsuario(req: any, res: any, nextFunction: NextFunction) {
    let respuesta;
    try {
        if(req.body.nombreDeUsuario != undefined){
            respuesta = await suscripcionService.ActualizarUsuario(req.body);
            res.send(respuesta);
        }
    } catch (error) {
        res.send(respuesta);
    }
}




}
export let suscripcionApi = new LoginApi().router;
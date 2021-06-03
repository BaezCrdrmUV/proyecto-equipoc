import { Router, Request, Response,NextFunction,Express } from "express";
import {Loginservice} from "../services/LoginService";
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
    this.router.get('/doLogin',express.json(),this.doLogin); 
    //this.router.put('/actualizar',express.json() ,this.actualizarAlbum);
    //this.router.get('/buscar',express.json() ,this.buscarAlbumes);
}
//
async doLogin(req: any, res: any, nextFunction: NextFunction) {
    let respuesta;
    try {
        if(req.query.NombreDeUsuario != undefined){
            respuesta = await Loginservice.HacerLogin(req.query.usuario);
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

}
export let login = new LoginApi().router;

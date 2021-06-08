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
    this.router.post('/doLogin',express.json(),this.doLogin);   
}

async doLogin(req: any, res: any, nextFunction: NextFunction) {
    let respuesta;
    try {
        if(req.body.nombreDeUsuario != undefined){
            respuesta = await Loginservice.HacerLogin(req.body);
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
export let login = new LoginApi().router;

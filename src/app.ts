import express from "express";
import {busquedasApi} from "./apis/BusquedasApi";
import {login} from "./apis/LoginApi";
import {suscripcionApi} from "./apis/SuscripcionApi";
import {musicaApi} from"./apis/MusicaApi"
import morgan from 'morgan';
class App {
    express : any;
    upload : any;
    administradorCanciones : any;
    administradorPortadas : any;
    storage: any;
 

    constructor(){
        
        this.express = express();
        this.middleware();
        this.routes();
    }

    private middleware(): void{

        
        this.express.use(morgan('dev'));
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: true }));
       

    }

    private routes(){

        let RootRouter = express.Router();
        RootRouter.get('/',(req,res,next) =>{
            res.json({
                message:'B'

            });

        });
        this.express.use('/',RootRouter);
        this.express.use('/buscarCancion',busquedasApi);
        this.express.use('/LoginApi',login);
        this.express.use('/Registrar',suscripcionApi);
        this.express.use('/Actualizar',suscripcionApi);
        this.express.use('/Musica',musicaApi);
       //
        //this.express.use('*',);

    }



}
export default new App().express
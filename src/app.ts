import express from 'express';
import morgan from 'morgan';
import {multimediaApi} from './api/multimediaApi';
import {streamingApi} from './api/streamingApi';
import {rutaBaseCancionesYPortadas} from "./config/global";
import path from 'path';
import fs  from 'fs-extra';
import uploadManager from 'express-fileupload';
let multer =  require('multer');

class App{

    express : any;
    upload : any;
    administradorCanciones : any;
    administradorPortadas : any;
    storage: any;
 

    constructor(){
        
        console.log("DIRNAME: "+__dirname);
        this.express = express();
        this.middleware();
        this.routes();
    }

    private middleware(): void{

        this.express.use(morgan('dev'));
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: true }));
        this.express.use(uploadManager());

        this.express.use((req, res, next) => {
            console.log("CABECERAS");
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
            next(); 
        });

    }

    private routes(){

        let RootRouter = express.Router();
        RootRouter.get('/',(req,res,next) =>{
            res.json({
                message:'B'

            });

        });
        let rutaArtistas = path.join(__dirname,'..','artistas');
        console.log("ruta estatica "+rutaArtistas)
        this.express.use(express.static(rutaArtistas));
        this.express.use('/',RootRouter);
        this.express.use('/multimedia',multimediaApi);
        this.express.use('/streaming',streamingApi);
        //this.express.use('*',);

    }


}

export default new App().express;
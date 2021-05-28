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
        
        this.express = express();
        this.middleware();
        this.routes();
    }

    private middleware(): void{

        
        this.express.use(morgan('dev'));
        this.express.use(express.json());
        this.express.use(express.urlencoded({ extended: true }));
        this.express.use(uploadManager());

    }

    private routes(){

        let RootRouter = express.Router();
        RootRouter.get('/',(req,res,next) =>{
            res.json({
                message:'B'

            });

        });
        this.express.use('/',RootRouter);
        this.express.use('/multimedia',multimediaApi);
        this.express.use('/streaming',streamingApi);
       
        //this.express.use('*',);

    }


}

export default new App().express;
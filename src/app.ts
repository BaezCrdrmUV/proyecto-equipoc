import "reflect-metadata";
import * as path       from 'path';
var express = require('express');
import morgan from 'morgan';
import * as bodyParser from 'body-parser';
import {artistasApi} from "./api/ArtistasApi";
import {albumesApi} from "./api/AlbumesApi";
import {cancionesApi} from "./api/CancionesApi";
import {listaAPi} from "./api/ListaReproduccionApi";
import {createConnection} from "typeorm";
import { ListaReproduccion } from "./bd/entity/ListaReproduccion";


 class App{

    express : any;
    upload : any;
 

    constructor(){
        //inicializa la conexion a bd , asi esta disponible en toda la app aunque no se use explicitamente aqui
  
        this.express = express();
        this.middleware();
        this.routes();
    }

    private middleware(): void{

        this.express.use(morgan('dev'));
      

    }

    private routes(){

        try{
        
        }catch(excepcion){
            console.log();
        }
        let RootRouter = express.Router();
        RootRouter.get('/',(req,res,next) =>{
            res.json({
                message:'B'

            });

        });
        this.express.use('/',RootRouter);
        this.express.use('/artistas',artistasApi);
        this.express.use('/albumes',albumesApi);
        this.express.use('/canciones',cancionesApi);
        this.express.use('/ListaDeReproduccion', listaAPi)
        //this.express.use('/streaming', );
        //this.express.use('*',);

    }


}

export default new App().express;
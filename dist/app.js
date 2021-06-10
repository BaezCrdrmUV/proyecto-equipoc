"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const multimediaApi_1 = require("./api/multimediaApi");
const streamingApi_1 = require("./api/streamingApi");
const path_1 = __importDefault(require("path"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
let multer = require('multer');
class App {
    constructor() {
        console.log("DIRNAME: " + __dirname);
        this.express = express_1.default();
        this.middleware();
        this.routes();
    }
    middleware() {
        this.express.use(morgan_1.default('dev'));
        this.express.use(express_1.default.json());
        this.express.use(express_1.default.urlencoded({ extended: true }));
        this.express.use(express_fileupload_1.default());
        this.express.use((req, res, next) => {
            console.log("CABECERAS");
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
            next();
        });
    }
    routes() {
        let RootRouter = express_1.default.Router();
        RootRouter.get('/', (req, res, next) => {
            res.json({
                message: 'B'
            });
        });
        let rutaArtistas = path_1.default.join(__dirname, '..', 'artistas');
        console.log("ruta estatica " + rutaArtistas);
        this.express.use(express_1.default.static(rutaArtistas));
        this.express.use('/', RootRouter);
        this.express.use('/multimedia', multimediaApi_1.multimediaApi);
        this.express.use('/streaming', streamingApi_1.streamingApi);
        //this.express.use('*',);
    }
}
exports.default = new App().express;
//# sourceMappingURL=app.js.map
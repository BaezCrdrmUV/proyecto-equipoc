"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const multimediaApi_1 = require("./api/multimediaApi");
const streamingApi_1 = require("./api/streamingApi");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
let multer = require('multer');
class App {
    constructor() {
        this.express = express_1.default();
        this.middleware();
        this.routes();
    }
    middleware() {
        this.express.use(morgan_1.default('dev'));
        this.express.use(express_1.default.json());
        this.express.use(express_1.default.urlencoded({ extended: true }));
        this.express.use(express_fileupload_1.default());
    }
    routes() {
        let RootRouter = express_1.default.Router();
        RootRouter.get('/', (req, res, next) => {
            res.json({
                message: 'B'
            });
        });
        this.express.use('/', RootRouter);
        this.express.use('/multimedia', multimediaApi_1.multimediaApi);
        this.express.use('/streaming', streamingApi_1.streamingApi);
        //this.express.use('*',);
    }
}
exports.default = new App().express;
//# sourceMappingURL=app.js.map
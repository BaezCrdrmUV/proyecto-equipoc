"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const app_1 = __importDefault(require("./app"));
const http_1 = __importDefault(require("http"));
let server = http_1.default.createServer(app_1.default);
const port = 4002;
const ip = "192.168.100.51";
server.listen(port, ip, function () {
    conectar();
    console.log("DIRNAME: " + __dirname);
    console.log("\n");
    console.log("corriendo en:  " + port);
});
const conectar = async () => {
    await typeorm_1.createConnection();
};
//# sourceMappingURL=index.js.map
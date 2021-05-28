"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const app_1 = __importDefault(require("./app"));
const http_1 = __importDefault(require("http"));
let server = http_1.default.createServer(app_1.default);
const port = 4002;
server.listen(port, function () {
    console.log("DIRNAME: " + __dirname);
    console.log("\n");
    console.log("corriendo en:  " + port);
});
//# sourceMappingURL=index.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = __importDefault(require("http"));
const app_1 = __importDefault(require("./app"));
let server = http_1.default.createServer(app_1.default);
let port = 4003;
server.listen(port, function () {
    console.log("gateway corriendo en puerto: " + port);
});
//# sourceMappingURL=index.js.map
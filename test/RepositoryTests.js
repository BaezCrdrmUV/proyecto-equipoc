"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __importDefault(require("assert"));
const typeorm_1 = require("typeorm");
before(async (done) => {
    try {
        await typeorm_1.createConnection();
    }
    catch (excepcion) {
        console.log(excepcion);
    }
});
describe("RepositoryTests", () => {
    it("agregar cancion", done => {
        assert_1.default(1 == 1);
        done();
    });
});
//# sourceMappingURL=RepositoryTests.js.map
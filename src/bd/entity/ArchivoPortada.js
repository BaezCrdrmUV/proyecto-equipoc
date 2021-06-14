"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArchivoPortada = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
let ArchivoPortada = class ArchivoPortada extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryColumn("varchar", { length: 200 }),
    class_validator_1.IsNotEmpty(),
    class_validator_1.Length(36, 200),
    __metadata("design:type", String)
], ArchivoPortada.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 200, nullable: true }),
    __metadata("design:type", String)
], ArchivoPortada.prototype, "fkIdArtista", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 200, nullable: true }),
    __metadata("design:type", String)
], ArchivoPortada.prototype, "fkIdAlbum", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 200 }),
    class_validator_1.Matches("^([a-zA-z0-9]+\\s{0,3})+([a-zA-Z0-9]+\\s{0,3})*$"),
    __metadata("design:type", String)
], ArchivoPortada.prototype, "nombreDeImagen", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 200 }),
    class_validator_1.IsNotEmpty(),
    class_validator_1.Length(3, 10),
    __metadata("design:type", String)
], ArchivoPortada.prototype, "formato", void 0);
__decorate([
    typeorm_1.Column("longtext"),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], ArchivoPortada.prototype, "urlDePortada", void 0);
__decorate([
    typeorm_1.Column("longtext"),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], ArchivoPortada.prototype, "urlPublicaDePortada", void 0);
__decorate([
    typeorm_1.Column("int", { unsigned: true, nullable: true, default: 1, comment: "estado del registro 1 activo 2 inactivo" }),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], ArchivoPortada.prototype, "fkIdEstatus", void 0);
ArchivoPortada = __decorate([
    typeorm_1.Entity("datosarchivosdeportadas")
], ArchivoPortada);
exports.ArchivoPortada = ArchivoPortada;
//# sourceMappingURL=ArchivoPortada.js.map
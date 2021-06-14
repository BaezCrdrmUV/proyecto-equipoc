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
exports.ArchivoCancion = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const ArchivoPortada_1 = require("./ArchivoPortada");
let ArchivoCancion = class ArchivoCancion extends typeorm_1.BaseEntity {
    constructor() {
        super();
        this.fkIdEstatus = 1;
    }
};
__decorate([
    typeorm_1.PrimaryColumn("varchar", { length: 200 }),
    class_validator_1.IsNotEmpty(),
    class_validator_1.Length(36, 200),
    __metadata("design:type", String)
], ArchivoCancion.prototype, "id", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 200 }),
    __metadata("design:type", String)
], ArchivoCancion.prototype, "fkIdCancion", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 200, nullable: true }),
    __metadata("design:type", String)
], ArchivoCancion.prototype, "fkIdPortada", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 200 }),
    class_validator_1.Matches("^([a-zA-z0-9]+\\s{0,3})+([a-zA-Z0-9]+\\s{0,3})*$"),
    __metadata("design:type", String)
], ArchivoCancion.prototype, "nombreDelArchivo", void 0);
__decorate([
    typeorm_1.Column("int", { unsigned: true }),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], ArchivoCancion.prototype, "tamanoEnMb", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 200 }),
    class_validator_1.IsNotEmpty(),
    class_validator_1.Length(3, 10),
    __metadata("design:type", String)
], ArchivoCancion.prototype, "formato", void 0);
__decorate([
    typeorm_1.Column("varchar", { length: 12 }),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], ArchivoCancion.prototype, "codigoIsrc", void 0);
__decorate([
    typeorm_1.Column("longtext"),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], ArchivoCancion.prototype, "urlCancion", void 0);
__decorate([
    typeorm_1.Column("longtext"),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], ArchivoCancion.prototype, "urlPublicaCancion", void 0);
__decorate([
    typeorm_1.Column("int", { unsigned: true, nullable: true, default: 1, comment: "estado del registro 1 activo 2 inactivo" }),
    class_validator_1.IsNumber(),
    __metadata("design:type", Number)
], ArchivoCancion.prototype, "fkIdEstatus", void 0);
__decorate([
    typeorm_1.OneToOne(() => ArchivoPortada_1.ArchivoPortada),
    typeorm_1.JoinColumn(),
    __metadata("design:type", ArchivoPortada_1.ArchivoPortada)
], ArchivoCancion.prototype, "portada", void 0);
ArchivoCancion = __decorate([
    typeorm_1.Entity("datosarchivosdecanciones"),
    __metadata("design:paramtypes", [])
], ArchivoCancion);
exports.ArchivoCancion = ArchivoCancion;
//# sourceMappingURL=ArchivoCancion.js.map
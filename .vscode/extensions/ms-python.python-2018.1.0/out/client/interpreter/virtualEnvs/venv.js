"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const path = require("path");
const utils_1 = require("../../common/utils");
const contracts_1 = require("../contracts");
const pyEnvCfgFileName = 'pyvenv.cfg';
let VEnv = class VEnv {
    constructor() {
        this.name = 'venv';
        this.type = contracts_1.InterpreterType.VEnv;
    }
    detect(pythonPath) {
        const dir = path.dirname(pythonPath);
        const pyEnvCfgPath = path.join(dir, '..', pyEnvCfgFileName);
        return utils_1.fsExistsAsync(pyEnvCfgPath);
    }
};
VEnv = __decorate([
    inversify_1.injectable()
], VEnv);
exports.VEnv = VEnv;
//# sourceMappingURL=venv.js.map
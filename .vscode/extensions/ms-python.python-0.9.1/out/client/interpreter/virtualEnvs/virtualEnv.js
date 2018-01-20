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
const OrigPrefixFile = 'orig-prefix.txt';
let VirtualEnv = class VirtualEnv {
    constructor() {
        this.name = 'virtualenv';
        this.type = contracts_1.InterpreterType.VirtualEnv;
    }
    detect(pythonPath) {
        const dir = path.dirname(pythonPath);
        const origPrefixFile = path.join(dir, '..', 'lib', OrigPrefixFile);
        return utils_1.fsExistsAsync(origPrefixFile);
    }
};
VirtualEnv = __decorate([
    inversify_1.injectable()
], VirtualEnv);
exports.VirtualEnv = VirtualEnv;
//# sourceMappingURL=virtualEnv.js.map
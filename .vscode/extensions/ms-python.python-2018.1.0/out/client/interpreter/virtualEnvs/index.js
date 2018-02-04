"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const types_1 = require("./types");
let VirtualEnvironmentManager = class VirtualEnvironmentManager {
    constructor(envs) {
        this.envs = envs;
    }
    detect(pythonPath) {
        const promises = this.envs
            .map(item => item.detect(pythonPath)
            .then(result => {
            return { env: item, result };
        }));
        return Promise.all(promises)
            .then(results => {
            const env = results.find(items => items.result === true);
            return env ? env.env : undefined;
        });
    }
};
VirtualEnvironmentManager = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.multiInject(types_1.IVirtualEnvironmentIdentifier))
], VirtualEnvironmentManager);
exports.VirtualEnvironmentManager = VirtualEnvironmentManager;
//# sourceMappingURL=index.js.map
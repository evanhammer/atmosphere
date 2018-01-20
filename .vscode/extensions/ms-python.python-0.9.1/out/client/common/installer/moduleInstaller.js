"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const configSettings_1 = require("../configSettings");
const types_1 = require("../terminal/types");
let ModuleInstaller = class ModuleInstaller {
    constructor(serviceContainer) {
        this.serviceContainer = serviceContainer;
    }
    installModule(name, resource) {
        return __awaiter(this, void 0, void 0, function* () {
            const executionInfo = yield this.getExecutionInfo(name, resource);
            const terminalService = this.serviceContainer.get(types_1.ITerminalService);
            if (executionInfo.moduleName) {
                const pythonPath = configSettings_1.PythonSettings.getInstance(resource).pythonPath;
                yield terminalService.sendCommand(pythonPath, ['-m', 'pip'].concat(executionInfo.args));
            }
            else {
                yield terminalService.sendCommand(executionInfo.execPath, executionInfo.args);
            }
        });
    }
};
ModuleInstaller = __decorate([
    inversify_1.injectable()
], ModuleInstaller);
exports.ModuleInstaller = ModuleInstaller;
//# sourceMappingURL=moduleInstaller.js.map
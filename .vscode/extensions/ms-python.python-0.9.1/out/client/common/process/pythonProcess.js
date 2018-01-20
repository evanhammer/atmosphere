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
const errorUtils_1 = require("../errors/errorUtils");
const moduleNotInstalledError_1 = require("../errors/moduleNotInstalledError");
let PythonExecutionService = class PythonExecutionService {
    constructor(procService, pythonPath, envVars) {
        this.procService = procService;
        this.pythonPath = pythonPath;
        this.envVars = envVars;
    }
    getVersion() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.procService.exec(this.pythonPath, ['--version'], { env: this.envVars, mergeStdOutErr: true })
                .then(output => output.stdout.trim());
        });
    }
    getExecutablePath() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.procService.exec(this.pythonPath, ['-c', 'import sys;print(sys.executable)'], { env: this.envVars, throwOnStdErr: true })
                .then(output => output.stdout.trim());
        });
    }
    isModuleInstalled(moduleName) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.procService.exec(this.pythonPath, ['-c', `import ${moduleName}`], { env: this.envVars, throwOnStdErr: true })
                .then(() => true).catch(() => false);
        });
    }
    execObservable(args, options) {
        const opts = Object.assign({}, options);
        if (this.envVars) {
            opts.env = this.envVars;
        }
        return this.procService.execObservable(this.pythonPath, args, opts);
    }
    execModuleObservable(moduleName, args, options) {
        const opts = Object.assign({}, options);
        if (this.envVars) {
            opts.env = this.envVars;
        }
        return this.procService.execObservable(this.pythonPath, ['-m', moduleName, ...args], opts);
    }
    exec(args, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const opts = Object.assign({}, options);
            if (this.envVars) {
                opts.env = this.envVars;
            }
            return this.procService.exec(this.pythonPath, args, opts);
        });
    }
    execModule(moduleName, args, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const opts = Object.assign({}, options);
            if (this.envVars) {
                opts.env = this.envVars;
            }
            const result = yield this.procService.exec(this.pythonPath, ['-m', moduleName, ...args], opts);
            // If a module is not installed we'll have something in stderr.
            if (moduleName && errorUtils_1.ErrorUtils.outputHasModuleNotInstalledError(moduleName, result.stderr)) {
                const isInstalled = yield this.isModuleInstalled(moduleName);
                if (!isInstalled) {
                    throw new moduleNotInstalledError_1.ModuleNotInstalledError(moduleName);
                }
            }
            return result;
        });
    }
};
PythonExecutionService = __decorate([
    inversify_1.injectable()
], PythonExecutionService);
exports.PythonExecutionService = PythonExecutionService;
//# sourceMappingURL=pythonProcess.js.map
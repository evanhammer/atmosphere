"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
const vscode_1 = require("vscode");
const configSettings_1 = require("../configSettings");
const constants_1 = require("../platform/constants");
const types_1 = require("../types");
const types_2 = require("./types");
let EnvironmentVariablesProvider = class EnvironmentVariablesProvider {
    constructor(envVarsService, disposableRegistry, isWidows) {
        this.envVarsService = envVarsService;
        this.isWidows = isWidows;
        this.cache = new Map();
        this.fileWatchers = new Map();
        this.disposables = [];
        disposableRegistry.push(this);
    }
    dispose() {
        this.fileWatchers.forEach(watcher => {
            watcher.dispose();
        });
    }
    getEnvironmentVariables(mergeWithProcEnvVariables, resource) {
        return __awaiter(this, void 0, void 0, function* () {
            const settings = configSettings_1.PythonSettings.getInstance(resource);
            if (!this.cache.has(settings.envFile)) {
                this.createFileWatcher(settings.envFile);
                const vars = yield this.envVarsService.parseFile(settings.envFile);
                let mergedVars = yield this.envVarsService.parseFile(settings.envFile);
                if (!mergedVars || Object.keys(mergedVars).length === 0) {
                    mergedVars = Object.assign({}, process.env);
                }
                this.envVarsService.mergeVariables(process.env, mergedVars);
                const pathVariable = this.isWidows ? constants_1.WINDOWS_PATH_VARIABLE_NAME : constants_1.NON_WINDOWS_PATH_VARIABLE_NAME;
                this.envVarsService.appendPath(mergedVars, process.env[pathVariable]);
                this.envVarsService.appendPythonPath(mergedVars, process.env.PYTHONPATH);
                this.cache.set(settings.envFile, { vars, mergedWithProc: mergedVars });
            }
            const data = this.cache.get(settings.envFile);
            return mergeWithProcEnvVariables ? data.mergedWithProc : data.vars;
        });
    }
    createFileWatcher(envFile) {
        if (this.fileWatchers.has(envFile)) {
            return;
        }
        const envFileWatcher = vscode_1.workspace.createFileSystemWatcher(envFile);
        this.fileWatchers.set(envFile, envFileWatcher);
        this.disposables.push(envFileWatcher.onDidChange(() => this.cache.delete(envFile)));
        this.disposables.push(envFileWatcher.onDidCreate(() => this.cache.delete(envFile)));
        this.disposables.push(envFileWatcher.onDidDelete(() => this.cache.delete(envFile)));
    }
};
EnvironmentVariablesProvider = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_2.IEnvironmentVariablesService)),
    __param(1, inversify_1.inject(types_1.IDisposableRegistry)), __param(2, inversify_1.inject(types_1.IsWindows))
], EnvironmentVariablesProvider);
exports.EnvironmentVariablesProvider = EnvironmentVariablesProvider;
//# sourceMappingURL=environmentVariablesProvider.js.map
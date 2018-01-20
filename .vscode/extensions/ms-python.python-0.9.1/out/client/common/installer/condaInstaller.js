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
const path = require("path");
const contracts_1 = require("../../interpreter/contracts");
const conda_1 = require("../../interpreter/locators/services/conda");
const types_1 = require("../../ioc/types");
const configSettings_1 = require("../configSettings");
const types_2 = require("../process/types");
const utils_1 = require("../utils");
const moduleInstaller_1 = require("./moduleInstaller");
let CondaInstaller = class CondaInstaller extends moduleInstaller_1.ModuleInstaller {
    constructor(serviceContainer) {
        super(serviceContainer);
    }
    get displayName() {
        return 'Conda';
    }
    /**
     * Checks whether we can use Conda as module installer for a given resource.
     * We need to perform two checks:
     * 1. Ensure we have conda.
     * 2. Check if the current environment is a conda environment.
     * @param {Uri} [resource=] Resource used to identify the workspace.
     * @returns {Promise<boolean>} Whether conda is supported as a module installer or not.
     */
    isSupported(resource) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof this.isCondaAvailable === 'boolean') {
                return this.isCondaAvailable;
            }
            const condaLocator = this.serviceContainer.get(contracts_1.ICondaLocatorService);
            const available = yield condaLocator.isCondaAvailable();
            if (!available) {
                return false;
            }
            // Now we need to check if the current environment is a conda environment or not.
            return this.isCurrentEnvironmentACondaEnvironment(resource);
        });
    }
    getExecutionInfo(moduleName, resource) {
        return __awaiter(this, void 0, void 0, function* () {
            const condaLocator = this.serviceContainer.get(contracts_1.ICondaLocatorService);
            const condaFile = yield condaLocator.getCondaFile();
            const info = yield this.getCurrentInterpreterInfo(resource);
            const args = ['install'];
            if (info.envName) {
                // If we have the name of the conda environment, then use that.
                args.push('--name');
                args.push(info.envName);
            }
            else {
                // Else provide the full path to the environment path.
                args.push('--prefix');
                args.push(info.envPath);
            }
            args.push(moduleName);
            return {
                args,
                execPath: condaFile,
                moduleName: ''
            };
        });
    }
    getCurrentPythonPath(resource) {
        return __awaiter(this, void 0, void 0, function* () {
            const pythonPath = configSettings_1.PythonSettings.getInstance(resource).pythonPath;
            if (path.basename(pythonPath) === pythonPath) {
                const pythonProc = yield this.serviceContainer.get(types_2.IPythonExecutionFactory).create(resource);
                return pythonProc.getExecutablePath().catch(() => pythonPath);
            }
            else {
                return pythonPath;
            }
        });
    }
    isCurrentEnvironmentACondaEnvironment(resource) {
        return this.getCurrentInterpreterInfo(resource)
            .then(info => info && info.isConda === true).catch(() => false);
    }
    getCurrentInterpreterInfo(resource) {
        return __awaiter(this, void 0, void 0, function* () {
            // Use this service, though it returns everything it is cached.
            const interpreterLocator = this.serviceContainer.get(contracts_1.IInterpreterLocatorService, contracts_1.INTERPRETER_LOCATOR_SERVICE);
            const interpretersPromise = interpreterLocator.getInterpreters(resource);
            const pythonPathPromise = this.getCurrentPythonPath(resource);
            const [interpreters, currentPythonPath] = yield Promise.all([interpretersPromise, pythonPathPromise]);
            // Check if we have the info about the current python path.
            const pathToCompareWith = path.dirname(currentPythonPath);
            const info = interpreters.find(item => utils_1.arePathsSame(path.dirname(item.path), pathToCompareWith));
            // tslint:disable-next-line:prefer-array-literal
            const pathsToRemove = new Array(conda_1.CONDA_RELATIVE_PY_PATH.length).fill('..');
            const envPath = path.join(path.dirname(currentPythonPath), ...pathsToRemove);
            return {
                isConda: info && info.type === contracts_1.InterpreterType.Conda,
                pythonPath: currentPythonPath,
                envPath,
                envName: info ? info.envName : undefined
            };
        });
    }
};
CondaInstaller = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.IServiceContainer))
], CondaInstaller);
exports.CondaInstaller = CondaInstaller;
//# sourceMappingURL=condaInstaller.js.map
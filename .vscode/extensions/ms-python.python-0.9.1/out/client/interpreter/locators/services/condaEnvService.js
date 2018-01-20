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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process = require("child_process");
const fs = require("fs-extra");
const inversify_1 = require("inversify");
const path = require("path");
const versionUtils_1 = require("../../../common/versionUtils");
const contracts_1 = require("../../contracts");
const conda_1 = require("./conda");
const condaHelper_1 = require("./condaHelper");
let CondaEnvService = class CondaEnvService {
    constructor(condaLocator, versionService) {
        this.condaLocator = condaLocator;
        this.versionService = versionService;
        this.condaHelper = new condaHelper_1.CondaHelper();
    }
    getInterpreters(resource) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.getSuggestionsFromConda();
        });
    }
    // tslint:disable-next-line:no-empty
    dispose() { }
    isCondaEnvironment(interpreter) {
        return (interpreter.displayName ? interpreter.displayName : '').toUpperCase().indexOf('ANACONDA') >= 0 ||
            (interpreter.companyDisplayName ? interpreter.companyDisplayName : '').toUpperCase().indexOf('CONTINUUM') >= 0;
    }
    getLatestVersion(interpreters) {
        const sortedInterpreters = interpreters.filter(interpreter => interpreter.version && interpreter.version.length > 0);
        // tslint:disable-next-line:no-non-null-assertion
        sortedInterpreters.sort((a, b) => versionUtils_1.VersionUtils.compareVersion(a.version, b.version));
        if (sortedInterpreters.length > 0) {
            return sortedInterpreters[sortedInterpreters.length - 1];
        }
    }
    parseCondaInfo(info) {
        return __awaiter(this, void 0, void 0, function* () {
            const condaDisplayName = this.condaHelper.getDisplayName(info);
            // The root of the conda environment is itself a Python interpreter
            // envs reported as e.g.: /Users/bob/miniconda3/envs/someEnv.
            const envs = Array.isArray(info.envs) ? info.envs : [];
            if (info.default_prefix && info.default_prefix.length > 0) {
                envs.push(info.default_prefix);
            }
            const promises = envs
                .map((env) => __awaiter(this, void 0, void 0, function* () {
                const envName = path.basename(env);
                const pythonPath = path.join(env, ...conda_1.CONDA_RELATIVE_PY_PATH);
                const existsPromise = fs.pathExists(pythonPath);
                const versionPromise = this.versionService.getVersion(pythonPath, envName);
                const [exists, version] = yield Promise.all([existsPromise, versionPromise]);
                if (!exists) {
                    return;
                }
                const versionWithoutCompanyName = this.stripCondaDisplayName(this.stripCompanyName(version), condaDisplayName);
                const displayName = `${condaDisplayName} ${versionWithoutCompanyName}`.trim();
                // If it is an environment, hence suffix with env name.
                const interpreterDisplayName = env === info.default_prefix ? displayName : `${displayName} (${envName})`;
                // tslint:disable-next-line:no-unnecessary-local-variable
                const interpreter = {
                    path: pythonPath,
                    displayName: interpreterDisplayName,
                    companyDisplayName: conda_1.AnacondaCompanyName,
                    type: contracts_1.InterpreterType.Conda,
                    envName
                };
                return interpreter;
            }));
            return Promise.all(promises)
                .then(interpreters => interpreters.filter(interpreter => interpreter !== null && interpreter !== undefined))
                .then(interpreters => interpreters.map(interpreter => interpreter));
        });
    }
    stripCompanyName(content) {
        // Strip company name from version.
        const startOfCompanyName = conda_1.AnacondaCompanyNames.reduce((index, companyName) => {
            if (index > 0) {
                return index;
            }
            return content.indexOf(`:: ${companyName}`);
        }, -1);
        return startOfCompanyName > 0 ? content.substring(0, startOfCompanyName).trim() : content;
    }
    stripCondaDisplayName(content, condaDisplayName) {
        // Strip company name from version.
        if (content.endsWith(condaDisplayName)) {
            let updatedContent = content.substr(0, content.indexOf(condaDisplayName)).trim();
            if (updatedContent.endsWith('::')) {
                updatedContent = updatedContent.substr(0, content.indexOf('::')).trim();
            }
            return updatedContent;
        }
        else {
            return content;
        }
    }
    getSuggestionsFromConda() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.condaLocator.getCondaFile()
                .then((condaFile) => __awaiter(this, void 0, void 0, function* () {
                return new Promise((resolve, reject) => {
                    // interrogate conda (if it's on the path) to find all environments.
                    child_process.execFile(condaFile, ['info', '--json'], (_, stdout) => {
                        if (stdout.length === 0) {
                            resolve([]);
                            return;
                        }
                        try {
                            // tslint:disable-next-line:prefer-type-cast
                            const info = JSON.parse(stdout);
                            resolve(this.parseCondaInfo(info));
                        }
                        catch (e) {
                            // Failed because either:
                            //   1. conda is not installed.
                            //   2. `conda info --json` has changed signature.
                            //   3. output of `conda info --json` has changed in structure.
                            // In all cases, we can't offer conda pythonPath suggestions.
                            resolve([]);
                        }
                    });
                }).catch((err) => {
                    console.error('Python Extension (getSuggestionsFromConda):', err);
                    return [];
                });
            }));
        });
    }
};
CondaEnvService = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(contracts_1.ICondaLocatorService)),
    __param(1, inversify_1.inject(contracts_1.IInterpreterVersionService))
], CondaEnvService);
exports.CondaEnvService = CondaEnvService;
//# sourceMappingURL=condaEnvService.js.map
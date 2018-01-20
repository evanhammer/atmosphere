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
const types_1 = require("../../../common/process/types");
const types_2 = require("../../../common/types");
const versionUtils_1 = require("../../../common/versionUtils");
const contracts_1 = require("../../contracts");
// tslint:disable-next-line:no-require-imports no-var-requires
const untildify = require('untildify');
const KNOWN_CONDA_LOCATIONS = ['~/anaconda/bin/conda', '~/miniconda/bin/conda',
    '~/anaconda2/bin/conda', '~/miniconda2/bin/conda',
    '~/anaconda3/bin/conda', '~/miniconda3/bin/conda'];
let CondaLocatorService = class CondaLocatorService {
    constructor(isWindows, processService, registryLookupForConda) {
        this.isWindows = isWindows;
        this.processService = processService;
        this.registryLookupForConda = registryLookupForConda;
    }
    // tslint:disable-next-line:no-empty
    dispose() { }
    getCondaFile() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.condaFile) {
                return this.condaFile;
            }
            const isAvailable = yield this.isCondaInCurrentPath();
            if (isAvailable) {
                return 'conda';
            }
            if (this.isWindows && this.registryLookupForConda) {
                return this.registryLookupForConda.getInterpreters()
                    .then(interpreters => interpreters.filter(this.isCondaEnvironment))
                    .then(condaInterpreters => this.getLatestVersion(condaInterpreters))
                    .then(condaInterpreter => {
                    return condaInterpreter ? path.join(path.dirname(condaInterpreter.path), 'conda.exe') : 'conda';
                })
                    .then((condaPath) => __awaiter(this, void 0, void 0, function* () {
                    return fs.pathExists(condaPath).then(exists => exists ? condaPath : 'conda');
                }));
            }
            this.condaFile = yield this.getCondaFileFromKnownLocations();
            return this.condaFile;
        });
    }
    isCondaAvailable() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.getCondaVersion()
                .then(() => this.isAvailable = true)
                .catch(() => this.isAvailable = false);
        });
    }
    getCondaVersion() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.getCondaFile()
                .then(condaFile => this.processService.exec(condaFile, ['--version'], {}))
                .then(result => result.stdout.trim())
                .catch(() => undefined);
        });
    }
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
    isCondaInCurrentPath() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                child_process.execFile('conda', ['--version'], (_, stdout) => {
                    if (stdout && stdout.length > 0) {
                        resolve(true);
                    }
                    else {
                        resolve(false);
                    }
                });
            });
        });
    }
    getCondaFileFromKnownLocations() {
        return __awaiter(this, void 0, void 0, function* () {
            const condaFiles = yield Promise.all(KNOWN_CONDA_LOCATIONS
                .map(untildify)
                .map((condaPath) => __awaiter(this, void 0, void 0, function* () { return fs.pathExists(condaPath).then(exists => exists ? condaPath : ''); })));
            const validCondaFiles = condaFiles.filter(condaPath => condaPath.length > 0);
            return validCondaFiles.length === 0 ? 'conda' : validCondaFiles[0];
        });
    }
};
CondaLocatorService = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_2.IsWindows)),
    __param(1, inversify_1.inject(types_1.IProcessService)),
    __param(2, inversify_1.inject(contracts_1.IInterpreterLocatorService)), __param(2, inversify_1.named(contracts_1.WINDOWS_REGISTRY_SERVICE)), __param(2, inversify_1.optional())
], CondaLocatorService);
exports.CondaLocatorService = CondaLocatorService;
//# sourceMappingURL=condaLocator.js.map
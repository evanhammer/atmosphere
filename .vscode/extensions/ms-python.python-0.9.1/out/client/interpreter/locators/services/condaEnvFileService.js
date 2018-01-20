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
const fs = require("fs-extra");
const inversify_1 = require("inversify");
const path = require("path");
const configSettings_1 = require("../../../common/configSettings");
const contracts_1 = require("../../contracts");
const conda_1 = require("./conda");
let CondaEnvFileService = class CondaEnvFileService {
    constructor(condaEnvironmentFile, versionService) {
        this.condaEnvironmentFile = condaEnvironmentFile;
        this.versionService = versionService;
    }
    getInterpreters(_) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.getSuggestionsFromConda();
        });
    }
    // tslint:disable-next-line:no-empty
    dispose() { }
    getSuggestionsFromConda() {
        return __awaiter(this, void 0, void 0, function* () {
            return fs.pathExists(this.condaEnvironmentFile)
                .then(exists => exists ? this.getEnvironmentsFromFile(this.condaEnvironmentFile) : Promise.resolve([]));
        });
    }
    getEnvironmentsFromFile(envFile) {
        return __awaiter(this, void 0, void 0, function* () {
            return fs.readFile(envFile)
                .then(buffer => buffer.toString().split(/\r?\n/g))
                .then(lines => lines.map(line => line.trim()))
                .then(lines => lines.map(line => path.join(line, ...conda_1.CONDA_RELATIVE_PY_PATH)))
                .then(interpreterPaths => interpreterPaths.map(item => fs.pathExists(item).then(exists => exists ? item : '')))
                .then(promises => Promise.all(promises))
                .then(interpreterPaths => interpreterPaths.filter(item => item.length > 0))
                .then(interpreterPaths => interpreterPaths.map(item => this.getInterpreterDetails(item)))
                .then(promises => Promise.all(promises))
                .catch((err) => {
                console.error('Python Extension (getEnvironmentsFromFile.readFile):', err);
                // Ignore errors in reading the file.
                return [];
            });
        });
    }
    getInterpreterDetails(interpreter) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.versionService.getVersion(interpreter, path.basename(interpreter))
                .then(version => {
                version = this.stripCompanyName(version);
                const envName = this.getEnvironmentRootDirectory(interpreter);
                // tslint:disable-next-line:no-unnecessary-local-variable
                const info = {
                    displayName: `${conda_1.AnacondaDisplayName} ${version} (${envName})`,
                    path: interpreter,
                    companyDisplayName: conda_1.AnacondaCompanyName,
                    version: version,
                    type: contracts_1.InterpreterType.Conda
                };
                return info;
            });
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
    getEnvironmentRootDirectory(interpreter) {
        const envDir = interpreter.substring(0, interpreter.length - path.join(...conda_1.CONDA_RELATIVE_PY_PATH).length);
        return path.basename(envDir);
    }
};
CondaEnvFileService = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(contracts_1.ICondaEnvironmentFile)),
    __param(1, inversify_1.inject(contracts_1.IInterpreterVersionService))
], CondaEnvFileService);
exports.CondaEnvFileService = CondaEnvFileService;
function getEnvironmentsFile() {
    const homeDir = configSettings_1.IS_WINDOWS ? process.env.USERPROFILE : (process.env.HOME || process.env.HOMEPATH);
    return homeDir ? path.join(homeDir, '.conda', 'environments.txt') : '';
}
exports.getEnvironmentsFile = getEnvironmentsFile;
//# sourceMappingURL=condaEnvFileService.js.map
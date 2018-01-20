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
const inversify_1 = require("inversify");
const _ = require("lodash");
const path = require("path");
const vscode_1 = require("vscode");
const utils_1 = require("../../../common/utils");
const contracts_1 = require("../../contracts");
const types_1 = require("../../virtualEnvs/types");
const helpers_1 = require("../helpers");
const settings = require("./../../../common/configSettings");
// tslint:disable-next-line:no-require-imports no-var-requires
const untildify = require('untildify');
let VirtualEnvService = class VirtualEnvService {
    constructor(knownSearchPaths, virtualEnvMgr, versionProvider) {
        this.knownSearchPaths = knownSearchPaths;
        this.virtualEnvMgr = virtualEnvMgr;
        this.versionProvider = versionProvider;
    }
    getInterpreters(resource) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.suggestionsFromKnownVenvs();
        });
    }
    // tslint:disable-next-line:no-empty
    dispose() { }
    suggestionsFromKnownVenvs() {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.all(this.knownSearchPaths.map(dir => this.lookForInterpretersInVenvs(dir)))
                .then(listOfInterpreters => _.flatten(listOfInterpreters));
        });
    }
    lookForInterpretersInVenvs(pathToCheck) {
        return __awaiter(this, void 0, void 0, function* () {
            return utils_1.fsReaddirAsync(pathToCheck)
                .then(subDirs => Promise.all(this.getProspectiveDirectoriesForLookup(subDirs)))
                .then(dirs => dirs.filter(dir => dir.length > 0))
                .then(dirs => Promise.all(dirs.map(helpers_1.lookForInterpretersInDirectory)))
                .then(pathsWithInterpreters => _.flatten(pathsWithInterpreters))
                .then(interpreters => Promise.all(interpreters.map(interpreter => this.getVirtualEnvDetails(interpreter))))
                .catch((err) => {
                console.error('Python Extension (lookForInterpretersInVenvs):', err);
                // Ignore exceptions.
                return [];
            });
        });
    }
    getProspectiveDirectoriesForLookup(subDirs) {
        const dirToLookFor = utils_1.IS_WINDOWS ? 'SCRIPTS' : 'BIN';
        return subDirs.map(subDir => utils_1.fsReaddirAsync(subDir)
            .then(dirs => {
            const scriptOrBinDirs = dirs.filter(dir => {
                const folderName = path.basename(dir);
                return folderName.toUpperCase() === dirToLookFor;
            });
            return scriptOrBinDirs.length === 1 ? scriptOrBinDirs[0] : '';
        })
            .catch((err) => {
            console.error('Python Extension (getProspectiveDirectoriesForLookup):', err);
            // Ignore exceptions.
            return '';
        }));
    }
    getVirtualEnvDetails(interpreter) {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.all([
                this.versionProvider.getVersion(interpreter, path.basename(interpreter)),
                this.virtualEnvMgr.detect(interpreter)
            ])
                .then(([displayName, virtualEnv]) => {
                const virtualEnvSuffix = virtualEnv ? virtualEnv.name : this.getVirtualEnvironmentRootDirectory(interpreter);
                return {
                    displayName: `${displayName} (${virtualEnvSuffix})`.trim(),
                    path: interpreter,
                    type: virtualEnv ? virtualEnv.type : contracts_1.InterpreterType.Unknown
                };
            });
        });
    }
    getVirtualEnvironmentRootDirectory(interpreter) {
        return path.basename(path.dirname(path.dirname(interpreter)));
    }
};
VirtualEnvService = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(contracts_1.IKnownSearchPathsForVirtualEnvironments)),
    __param(1, inversify_1.inject(types_1.IVirtualEnvironmentManager)),
    __param(2, inversify_1.inject(contracts_1.IInterpreterVersionService))
], VirtualEnvService);
exports.VirtualEnvService = VirtualEnvService;
function getKnownSearchPathsForVirtualEnvs(resource) {
    const paths = [];
    if (!utils_1.IS_WINDOWS) {
        const defaultPaths = ['/Envs', '/.virtualenvs', '/.pyenv', '/.pyenv/versions'];
        defaultPaths.forEach(p => {
            paths.push(untildify(`~${p}`));
        });
    }
    const venvPath = settings.PythonSettings.getInstance(resource).venvPath;
    if (venvPath) {
        paths.push(untildify(venvPath));
    }
    if (Array.isArray(vscode_1.workspace.workspaceFolders) && vscode_1.workspace.workspaceFolders.length > 0) {
        if (resource && vscode_1.workspace.workspaceFolders.length > 1) {
            const wkspaceFolder = vscode_1.workspace.getWorkspaceFolder(resource);
            if (wkspaceFolder) {
                paths.push(wkspaceFolder.uri.fsPath);
            }
        }
        else {
            paths.push(vscode_1.workspace.workspaceFolders[0].uri.fsPath);
        }
    }
    return paths;
}
exports.getKnownSearchPathsForVirtualEnvs = getKnownSearchPathsForVirtualEnvs;
//# sourceMappingURL=virtualEnvService.js.map
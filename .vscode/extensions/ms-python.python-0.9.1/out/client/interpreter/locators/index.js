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
const types_1 = require("../../common/types");
const utils_1 = require("../../common/utils");
const types_2 = require("../../ioc/types");
const contracts_1 = require("../contracts");
const helpers_1 = require("./helpers");
let PythonInterpreterLocatorService = class PythonInterpreterLocatorService {
    constructor(serviceContainer, isWindows) {
        this.serviceContainer = serviceContainer;
        this.isWindows = isWindows;
        this.disposables = [];
        this.interpretersPerResource = new Map();
        this.disposables.push(vscode_1.workspace.onDidChangeConfiguration(this.onConfigChanged, this));
        serviceContainer.get(types_1.IDisposableRegistry).push(this);
    }
    getInterpreters(resource) {
        return __awaiter(this, void 0, void 0, function* () {
            const resourceKey = this.getResourceKey(resource);
            if (!this.interpretersPerResource.has(resourceKey)) {
                this.interpretersPerResource.set(resourceKey, this.getInterpretersPerResource(resource));
            }
            return yield this.interpretersPerResource.get(resourceKey);
        });
    }
    dispose() {
        this.disposables.forEach(disposable => disposable.dispose());
    }
    onConfigChanged() {
        this.interpretersPerResource.clear();
    }
    getResourceKey(resource) {
        if (!resource) {
            return '';
        }
        const workspaceFolder = vscode_1.workspace.getWorkspaceFolder(resource);
        return workspaceFolder ? workspaceFolder.uri.fsPath : '';
    }
    getInterpretersPerResource(resource) {
        return __awaiter(this, void 0, void 0, function* () {
            const locators = this.getLocators(resource);
            const promises = locators.map((provider) => __awaiter(this, void 0, void 0, function* () { return provider.getInterpreters(resource); }));
            const listOfInterpreters = yield Promise.all(promises);
            // tslint:disable-next-line:underscore-consistent-invocation
            return _.flatten(listOfInterpreters)
                .map(helpers_1.fixInterpreterDisplayName)
                .map(item => { item.path = path.normalize(item.path); return item; })
                .reduce((accumulator, current) => {
                const existingItem = accumulator.find(item => utils_1.arePathsSame(item.path, current.path));
                if (!existingItem) {
                    accumulator.push(current);
                }
                else {
                    // Preserve type information.
                    if (existingItem.type === contracts_1.InterpreterType.Unknown && current.type !== contracts_1.InterpreterType.Unknown) {
                        existingItem.type = current.type;
                    }
                }
                return accumulator;
            }, []);
        });
    }
    getLocators(resource) {
        const locators = [];
        // The order of the services is important.
        if (this.isWindows) {
            locators.push(this.serviceContainer.get(contracts_1.IInterpreterLocatorService, contracts_1.WINDOWS_REGISTRY_SERVICE));
        }
        locators.push(this.serviceContainer.get(contracts_1.IInterpreterLocatorService, contracts_1.CONDA_ENV_SERVICE));
        locators.push(this.serviceContainer.get(contracts_1.IInterpreterLocatorService, contracts_1.CONDA_ENV_FILE_SERVICE));
        locators.push(this.serviceContainer.get(contracts_1.IInterpreterLocatorService, contracts_1.VIRTUAL_ENV_SERVICE));
        if (!this.isWindows) {
            locators.push(this.serviceContainer.get(contracts_1.IInterpreterLocatorService, contracts_1.KNOWN_PATH_SERVICE));
        }
        locators.push(this.serviceContainer.get(contracts_1.IInterpreterLocatorService, contracts_1.CURRENT_PATH_SERVICE));
        return locators;
    }
};
PythonInterpreterLocatorService = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_2.IServiceContainer)),
    __param(1, inversify_1.inject(types_1.IsWindows))
], PythonInterpreterLocatorService);
exports.PythonInterpreterLocatorService = PythonInterpreterLocatorService;
//# sourceMappingURL=index.js.map
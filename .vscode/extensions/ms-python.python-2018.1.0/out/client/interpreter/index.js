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
const path = require("path");
const vscode_1 = require("vscode");
const configSettings_1 = require("../common/configSettings");
const types_1 = require("../common/process/types");
const types_2 = require("../common/types");
const utils = require("../common/utils");
const types_3 = require("../ioc/types");
const pythonPathUpdaterService_1 = require("./configuration/pythonPathUpdaterService");
const pythonPathUpdaterServiceFactory_1 = require("./configuration/pythonPathUpdaterServiceFactory");
const contracts_1 = require("./contracts");
const display_1 = require("./display");
const helpers_1 = require("./helpers");
const virtualEnvService_1 = require("./locators/services/virtualEnvService");
const types_4 = require("./virtualEnvs/types");
let InterpreterManager = class InterpreterManager {
    constructor(serviceContainer) {
        this.serviceContainer = serviceContainer;
        const virtualEnvMgr = serviceContainer.get(types_4.IVirtualEnvironmentManager);
        const statusBar = vscode_1.window.createStatusBarItem(vscode_1.StatusBarAlignment.Left);
        this.interpreterProvider = serviceContainer.get(contracts_1.IInterpreterLocatorService, contracts_1.INTERPRETER_LOCATOR_SERVICE);
        const versionService = serviceContainer.get(contracts_1.IInterpreterVersionService);
        this.display = new display_1.InterpreterDisplay(statusBar, this, virtualEnvMgr, versionService);
        this.pythonPathUpdaterService = new pythonPathUpdaterService_1.PythonPathUpdaterService(new pythonPathUpdaterServiceFactory_1.PythonPathUpdaterServiceFactory(), versionService);
        const disposables = this.serviceContainer.get(types_2.IDisposableRegistry);
        disposables.push(statusBar);
        disposables.push(this.display);
    }
    refresh() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.display.refresh();
        });
    }
    initialize() {
        const disposables = this.serviceContainer.get(types_2.IDisposableRegistry);
        disposables.push(vscode_1.window.onDidChangeActiveTextEditor(() => this.refresh()));
        configSettings_1.PythonSettings.getInstance().addListener('change', () => this.onConfigChanged());
    }
    getInterpreters(resource) {
        return this.interpreterProvider.getInterpreters(resource);
    }
    autoSetInterpreter() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.shouldAutoSetInterpreter()) {
                return;
            }
            const activeWorkspace = helpers_1.getActiveWorkspaceUri();
            if (!activeWorkspace) {
                return;
            }
            const virtualEnvMgr = this.serviceContainer.get(types_4.IVirtualEnvironmentManager);
            const versionService = this.serviceContainer.get(contracts_1.IInterpreterVersionService);
            const virtualEnvInterpreterProvider = new virtualEnvService_1.VirtualEnvService([activeWorkspace.folderUri.fsPath], virtualEnvMgr, versionService, this.serviceContainer);
            const interpreters = yield virtualEnvInterpreterProvider.getInterpreters(activeWorkspace.folderUri);
            const workspacePathUpper = activeWorkspace.folderUri.fsPath.toUpperCase();
            const interpretersInWorkspace = interpreters.filter(interpreter => interpreter.path.toUpperCase().startsWith(workspacePathUpper));
            if (interpretersInWorkspace.length === 0) {
                return;
            }
            // Always pick the highest version by default.
            // Ensure this new environment is at the same level as the current workspace.
            // In windows the interpreter is under scripts/python.exe on linux it is under bin/python.
            // Meaning the sub directory must be either scripts, bin or other (but only one level deep).
            const pythonPath = interpretersInWorkspace.sort((a, b) => a.version > b.version ? 1 : -1)[0].path;
            const relativePath = path.dirname(pythonPath).substring(activeWorkspace.folderUri.fsPath.length);
            if (relativePath.split(path.sep).filter(l => l.length > 0).length === 2) {
                yield this.pythonPathUpdaterService.updatePythonPath(pythonPath, activeWorkspace.configTarget, 'load', activeWorkspace.folderUri);
            }
        });
    }
    dispose() {
        this.display = null;
        this.interpreterProvider.dispose();
    }
    getActiveInterpreter(resource) {
        return __awaiter(this, void 0, void 0, function* () {
            const pythonExecutionFactory = this.serviceContainer.get(types_1.IPythonExecutionFactory);
            const pythonExecutionService = yield pythonExecutionFactory.create(resource);
            const fullyQualifiedPath = yield pythonExecutionService.getExecutablePath().catch(() => undefined);
            // Python path is invalid or python isn't installed.
            if (!fullyQualifiedPath) {
                return;
            }
            const interpreters = yield this.getInterpreters(resource);
            const interpreter = interpreters.find(i => utils.arePathsSame(i.path, fullyQualifiedPath));
            if (interpreter) {
                return interpreter;
            }
            const pythonExecutableName = path.basename(fullyQualifiedPath);
            const versionInfo = yield this.serviceContainer.get(contracts_1.IInterpreterVersionService).getVersion(fullyQualifiedPath, pythonExecutableName);
            return {
                path: fullyQualifiedPath,
                type: contracts_1.InterpreterType.Unknown,
                version: versionInfo
            };
        });
    }
    shouldAutoSetInterpreter() {
        const activeWorkspace = helpers_1.getActiveWorkspaceUri();
        if (!activeWorkspace) {
            return false;
        }
        const pythonConfig = vscode_1.workspace.getConfiguration('python', activeWorkspace.folderUri);
        const pythonPathInConfig = pythonConfig.inspect('pythonPath');
        // If we have a value in user settings, then don't auto set the interpreter path.
        if (pythonPathInConfig && pythonPathInConfig.globalValue !== undefined && pythonPathInConfig.globalValue !== 'python') {
            return false;
        }
        if (activeWorkspace.configTarget === vscode_1.ConfigurationTarget.Workspace) {
            return pythonPathInConfig.workspaceValue === undefined || pythonPathInConfig.workspaceValue === 'python';
        }
        if (activeWorkspace.configTarget === vscode_1.ConfigurationTarget.WorkspaceFolder) {
            return pythonPathInConfig.workspaceFolderValue === undefined || pythonPathInConfig.workspaceFolderValue === 'python';
        }
        return false;
    }
    onConfigChanged() {
        if (this.display) {
            this.display.refresh()
                .catch(ex => console.error('Python Extension: display.refresh', ex));
        }
    }
};
InterpreterManager = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_3.IServiceContainer))
], InterpreterManager);
exports.InterpreterManager = InterpreterManager;
//# sourceMappingURL=index.js.map
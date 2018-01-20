"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const vscode_1 = require("vscode");
const configSettings_1 = require("../common/configSettings");
const pythonPathUpdaterService_1 = require("./configuration/pythonPathUpdaterService");
const pythonPathUpdaterServiceFactory_1 = require("./configuration/pythonPathUpdaterServiceFactory");
const contracts_1 = require("./contracts");
const display_1 = require("./display");
const helpers_1 = require("./helpers");
const virtualEnvService_1 = require("./locators/services/virtualEnvService");
const types_1 = require("./virtualEnvs/types");
class InterpreterManager {
    constructor(serviceContainer) {
        this.serviceContainer = serviceContainer;
        this.disposables = [];
        const virtualEnvMgr = serviceContainer.get(types_1.IVirtualEnvironmentManager);
        const statusBar = vscode_1.window.createStatusBarItem(vscode_1.StatusBarAlignment.Left);
        this.interpreterProvider = serviceContainer.get(contracts_1.IInterpreterLocatorService, contracts_1.INTERPRETER_LOCATOR_SERVICE);
        const versionService = serviceContainer.get(contracts_1.IInterpreterVersionService);
        this.display = new display_1.InterpreterDisplay(statusBar, this.interpreterProvider, virtualEnvMgr, versionService);
        this.pythonPathUpdaterService = new pythonPathUpdaterService_1.PythonPathUpdaterService(new pythonPathUpdaterServiceFactory_1.PythonPathUpdaterServiceFactory(), versionService);
        configSettings_1.PythonSettings.getInstance().addListener('change', () => this.onConfigChanged());
        this.disposables.push(vscode_1.window.onDidChangeActiveTextEditor(() => this.refresh()));
        this.disposables.push(statusBar);
        this.disposables.push(this.display);
    }
    refresh() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.display.refresh();
        });
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
            const virtualEnvMgr = this.serviceContainer.get(types_1.IVirtualEnvironmentManager);
            const versionService = this.serviceContainer.get(contracts_1.IInterpreterVersionService);
            const virtualEnvInterpreterProvider = new virtualEnvService_1.VirtualEnvService([activeWorkspace.folderUri.fsPath], virtualEnvMgr, versionService);
            const interpreters = yield this.interpreterProvider.getInterpreters(activeWorkspace.folderUri);
            const workspacePathUpper = activeWorkspace.folderUri.fsPath.toUpperCase();
            const interpretersInWorkspace = interpreters.filter(interpreter => interpreter.path.toUpperCase().startsWith(workspacePathUpper));
            // Always pick the first available one.
            if (interpretersInWorkspace.length === 0) {
                return;
            }
            // Ensure this new environment is at the same level as the current workspace.
            // In windows the interpreter is under scripts/python.exe on linux it is under bin/python.
            // Meaning the sub directory must be either scripts, bin or other (but only one level deep).
            const pythonPath = interpretersInWorkspace[0].path;
            const relativePath = path.dirname(pythonPath).substring(activeWorkspace.folderUri.fsPath.length);
            if (relativePath.split(path.sep).filter(l => l.length > 0).length === 2) {
                yield this.pythonPathUpdaterService.updatePythonPath(pythonPath, activeWorkspace.configTarget, 'load', activeWorkspace.folderUri);
            }
        });
    }
    dispose() {
        // tslint:disable-next-line:prefer-type-cast
        this.disposables.forEach(disposable => disposable.dispose());
        this.display = null;
        this.interpreterProvider.dispose();
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
}
exports.InterpreterManager = InterpreterManager;
//# sourceMappingURL=index.js.map
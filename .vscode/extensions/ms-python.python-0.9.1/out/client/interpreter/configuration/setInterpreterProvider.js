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
const settings = require("../../common/configSettings");
const shebangCodeLensProvider_1 = require("../display/shebangCodeLensProvider");
const pythonPathUpdaterService_1 = require("./pythonPathUpdaterService");
const pythonPathUpdaterServiceFactory_1 = require("./pythonPathUpdaterServiceFactory");
class SetInterpreterProvider {
    constructor(interpreterManager, interpreterVersionService) {
        this.interpreterManager = interpreterManager;
        this.disposables = [];
        this.disposables.push(vscode_1.commands.registerCommand('python.setInterpreter', this.setInterpreter.bind(this)));
        this.disposables.push(vscode_1.commands.registerCommand('python.setShebangInterpreter', this.setShebangInterpreter.bind(this)));
        this.pythonPathUpdaterService = new pythonPathUpdaterService_1.PythonPathUpdaterService(new pythonPathUpdaterServiceFactory_1.PythonPathUpdaterServiceFactory(), interpreterVersionService);
    }
    dispose() {
        this.disposables.forEach(disposable => disposable.dispose());
    }
    getWorkspaceToSetPythonPath() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!Array.isArray(vscode_1.workspace.workspaceFolders) || vscode_1.workspace.workspaceFolders.length === 0) {
                return undefined;
            }
            if (vscode_1.workspace.workspaceFolders.length === 1) {
                return { folderUri: vscode_1.workspace.workspaceFolders[0].uri, configTarget: vscode_1.ConfigurationTarget.Workspace };
            }
            // Ok we have multiple interpreters, get the user to pick a folder.
            // tslint:disable-next-line:no-any prefer-type-cast
            const workspaceFolder = yield vscode_1.window.showWorkspaceFolderPick({ placeHolder: 'Select a workspace' });
            return workspaceFolder ? { folderUri: workspaceFolder.uri, configTarget: vscode_1.ConfigurationTarget.WorkspaceFolder } : undefined;
        });
    }
    suggestionToQuickPickItem(suggestion, workspaceUri) {
        return __awaiter(this, void 0, void 0, function* () {
            let detail = suggestion.path;
            if (workspaceUri && suggestion.path.startsWith(workspaceUri.fsPath)) {
                detail = `.${path.sep}${path.relative(workspaceUri.fsPath, suggestion.path)}`;
            }
            return {
                // tslint:disable-next-line:no-non-null-assertion
                label: suggestion.displayName,
                description: suggestion.companyDisplayName || '',
                detail: detail,
                path: suggestion.path
            };
        });
    }
    getSuggestions(resourceUri) {
        return __awaiter(this, void 0, void 0, function* () {
            const interpreters = yield this.interpreterManager.getInterpreters(resourceUri);
            // tslint:disable-next-line:no-non-null-assertion
            interpreters.sort((a, b) => a.displayName > b.displayName ? 1 : -1);
            return Promise.all(interpreters.map(item => this.suggestionToQuickPickItem(item, resourceUri)));
        });
    }
    setInterpreter() {
        return __awaiter(this, void 0, void 0, function* () {
            const setInterpreterGlobally = !Array.isArray(vscode_1.workspace.workspaceFolders) || vscode_1.workspace.workspaceFolders.length === 0;
            let configTarget = vscode_1.ConfigurationTarget.Global;
            let wkspace;
            if (!setInterpreterGlobally) {
                const targetConfig = yield this.getWorkspaceToSetPythonPath();
                if (!targetConfig) {
                    return;
                }
                configTarget = targetConfig.configTarget;
                wkspace = targetConfig.folderUri;
            }
            const suggestions = yield this.getSuggestions(wkspace);
            let currentPythonPath = settings.PythonSettings.getInstance().pythonPath;
            if (wkspace && currentPythonPath.startsWith(wkspace.fsPath)) {
                currentPythonPath = `.${path.sep}${path.relative(wkspace.fsPath, currentPythonPath)}`;
            }
            const quickPickOptions = {
                matchOnDetail: true,
                matchOnDescription: true,
                placeHolder: `current: ${currentPythonPath}`
            };
            const selection = yield vscode_1.window.showQuickPick(suggestions, quickPickOptions);
            if (selection !== undefined) {
                yield this.pythonPathUpdaterService.updatePythonPath(selection.path, configTarget, 'ui', wkspace);
            }
        });
    }
    setShebangInterpreter() {
        return __awaiter(this, void 0, void 0, function* () {
            const shebang = yield shebangCodeLensProvider_1.ShebangCodeLensProvider.detectShebang(vscode_1.window.activeTextEditor.document);
            if (!shebang) {
                return;
            }
            const isGlobalChange = !Array.isArray(vscode_1.workspace.workspaceFolders) || vscode_1.workspace.workspaceFolders.length === 0;
            const workspaceFolder = vscode_1.workspace.getWorkspaceFolder(vscode_1.window.activeTextEditor.document.uri);
            const isWorkspaceChange = Array.isArray(vscode_1.workspace.workspaceFolders) && vscode_1.workspace.workspaceFolders.length === 1;
            if (isGlobalChange) {
                yield this.pythonPathUpdaterService.updatePythonPath(shebang, vscode_1.ConfigurationTarget.Global, 'shebang');
                return;
            }
            if (isWorkspaceChange || !workspaceFolder) {
                yield this.pythonPathUpdaterService.updatePythonPath(shebang, vscode_1.ConfigurationTarget.Workspace, 'shebang', vscode_1.workspace.workspaceFolders[0].uri);
                return;
            }
            yield this.pythonPathUpdaterService.updatePythonPath(shebang, vscode_1.ConfigurationTarget.WorkspaceFolder, 'shebang', workspaceFolder.uri);
        });
    }
}
exports.SetInterpreterProvider = SetInterpreterProvider;
//# sourceMappingURL=setInterpreterProvider.js.map
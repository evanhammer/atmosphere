'use strict';
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
const os_1 = require("os");
const path = require("path");
const vscode = require("vscode");
const vscode_1 = require("vscode");
const settings = require("../common/configSettings");
const constants_1 = require("../common/constants");
const contextKey_1 = require("../common/contextKey");
const utils_1 = require("../common/utils");
const telemetry_1 = require("../telemetry");
const constants_2 = require("../telemetry/constants");
let terminal;
function activateExecInTerminalProvider() {
    const disposables = [];
    disposables.push(vscode.commands.registerCommand(constants_1.Commands.Exec_In_Terminal, execInTerminal));
    disposables.push(vscode.commands.registerCommand(constants_1.Commands.Exec_Selection_In_Terminal, execSelectionInTerminal));
    disposables.push(vscode.commands.registerCommand(constants_1.Commands.Exec_Selection_In_Django_Shell, execSelectionInDjangoShell));
    disposables.push(vscode.window.onDidCloseTerminal((closedTermina) => {
        if (terminal === closedTermina) {
            terminal = null;
        }
    }));
    disposables.push(new DjangoContextInitializer());
    return disposables;
}
exports.activateExecInTerminalProvider = activateExecInTerminalProvider;
function removeBlankLines(code) {
    const codeLines = code.split(/\r?\n/g);
    const codeLinesWithoutEmptyLines = codeLines.filter(line => line.trim().length > 0);
    const lastLineIsEmpty = codeLines.length > 0 && codeLines[codeLines.length - 1].trim().length === 0;
    if (lastLineIsEmpty) {
        codeLinesWithoutEmptyLines.unshift('');
    }
    return codeLinesWithoutEmptyLines.join(os_1.EOL);
}
function execInTerminal(fileUri) {
    const terminalShellSettings = vscode.workspace.getConfiguration('terminal.integrated.shell');
    // tslint:disable-next-line:no-backbone-get-set-outside-model
    const IS_POWERSHELL = /powershell/.test(terminalShellSettings.get('windows'));
    const pythonSettings = settings.PythonSettings.getInstance(fileUri);
    let filePath;
    let currentPythonPath = pythonSettings.pythonPath;
    if (currentPythonPath.indexOf(' ') > 0) {
        currentPythonPath = `"${currentPythonPath}"`;
    }
    if (fileUri === undefined || fileUri === null || typeof fileUri.fsPath !== 'string') {
        const activeEditor = vscode.window.activeTextEditor;
        if (activeEditor !== undefined) {
            if (!activeEditor.document.isUntitled) {
                if (activeEditor.document.languageId === constants_1.PythonLanguage.language) {
                    filePath = activeEditor.document.fileName;
                }
                else {
                    vscode.window.showErrorMessage('The active file is not a Python source file');
                    return;
                }
            }
            else {
                vscode.window.showErrorMessage('The active file needs to be saved before it can be run');
                return;
            }
        }
        else {
            vscode.window.showErrorMessage('No open file to run in terminal');
            return;
        }
    }
    else {
        filePath = fileUri.fsPath;
    }
    if (filePath.indexOf(' ') > 0) {
        filePath = `"${filePath}"`;
    }
    terminal = terminal ? terminal : vscode.window.createTerminal('Python');
    if (pythonSettings.terminal && pythonSettings.terminal.executeInFileDir) {
        const fileDirPath = path.dirname(filePath);
        const wkspace = vscode.workspace.getWorkspaceFolder(vscode.Uri.file(filePath));
        if (wkspace && fileDirPath !== wkspace.uri.fsPath && fileDirPath.substring(1) !== wkspace.uri.fsPath) {
            terminal.sendText(`cd "${fileDirPath}"`);
        }
    }
    const launchArgs = settings.PythonSettings.getInstance(fileUri).terminal.launchArgs;
    const launchArgsString = launchArgs.length > 0 ? ' '.concat(launchArgs.join(' ')) : '';
    const command = `${currentPythonPath}${launchArgsString} ${filePath}`;
    if (utils_1.IS_WINDOWS) {
        const commandWin = command.replace(/\\/g, '/');
        if (IS_POWERSHELL) {
            terminal.sendText(`& ${commandWin}`);
        }
        else {
            terminal.sendText(commandWin);
        }
    }
    else {
        terminal.sendText(command);
    }
    terminal.show();
    telemetry_1.sendTelemetryEvent(constants_2.EXECUTION_CODE, undefined, { scope: 'file' });
}
function execSelectionInTerminal() {
    const activeEditor = vscode.window.activeTextEditor;
    if (!activeEditor) {
        return;
    }
    const terminalShellSettings = vscode.workspace.getConfiguration('terminal.integrated.shell');
    // tslint:disable-next-line:no-backbone-get-set-outside-model
    const IS_POWERSHELL = /powershell/.test(terminalShellSettings.get('windows'));
    let currentPythonPath = settings.PythonSettings.getInstance(activeEditor.document.uri).pythonPath;
    if (currentPythonPath.indexOf(' ') > 0) {
        currentPythonPath = `"${currentPythonPath}"`;
    }
    const selection = vscode.window.activeTextEditor.selection;
    let code;
    if (selection.isEmpty) {
        code = vscode.window.activeTextEditor.document.lineAt(selection.start.line).text;
    }
    else {
        const textRange = new vscode.Range(selection.start, selection.end);
        code = vscode.window.activeTextEditor.document.getText(textRange);
    }
    if (code.length === 0) {
        return;
    }
    code = removeBlankLines(code);
    const launchArgs = settings.PythonSettings.getInstance(activeEditor.document.uri).terminal.launchArgs;
    const launchArgsString = launchArgs.length > 0 ? ' '.concat(launchArgs.join(' ')) : '';
    const command = `${currentPythonPath}${launchArgsString}`;
    if (!terminal) {
        terminal = vscode.window.createTerminal('Python');
        if (utils_1.IS_WINDOWS) {
            const commandWin = command.replace(/\\/g, '/');
            if (IS_POWERSHELL) {
                terminal.sendText(`& ${commandWin}`);
            }
            else {
                terminal.sendText(commandWin);
            }
        }
        else {
            terminal.sendText(command);
        }
    }
    // tslint:disable-next-line:variable-name
    const unix_code = code.replace(/\r\n/g, '\n');
    if (utils_1.IS_WINDOWS) {
        terminal.sendText(unix_code.replace(/\n/g, '\r\n'));
    }
    else {
        terminal.sendText(unix_code);
    }
    terminal.show();
    telemetry_1.sendTelemetryEvent(constants_2.EXECUTION_CODE, undefined, { scope: 'selection' });
}
function execSelectionInDjangoShell() {
    const activeEditor = vscode.window.activeTextEditor;
    if (!activeEditor) {
        return;
    }
    const terminalShellSettings = vscode.workspace.getConfiguration('terminal.integrated.shell');
    // tslint:disable-next-line:no-backbone-get-set-outside-model
    const IS_POWERSHELL = /powershell/.test(terminalShellSettings.get('windows'));
    let currentPythonPath = settings.PythonSettings.getInstance(activeEditor.document.uri).pythonPath;
    if (currentPythonPath.indexOf(' ') > 0) {
        currentPythonPath = `"${currentPythonPath}"`;
    }
    const workspaceUri = vscode.workspace.getWorkspaceFolder(activeEditor.document.uri);
    const defaultWorkspace = Array.isArray(vscode.workspace.workspaceFolders) && vscode.workspace.workspaceFolders.length > 0 ? vscode.workspace.workspaceFolders[0].uri.fsPath : '';
    const workspaceRoot = workspaceUri ? workspaceUri.uri.fsPath : defaultWorkspace;
    const djangoShellCmd = `"${path.join(workspaceRoot, 'manage.py')}" shell`;
    const selection = vscode.window.activeTextEditor.selection;
    let code;
    if (selection.isEmpty) {
        code = vscode.window.activeTextEditor.document.lineAt(selection.start.line).text;
    }
    else {
        const textRange = new vscode.Range(selection.start, selection.end);
        code = vscode.window.activeTextEditor.document.getText(textRange);
    }
    if (code.length === 0) {
        return;
    }
    const launchArgs = settings.PythonSettings.getInstance(activeEditor.document.uri).terminal.launchArgs;
    const launchArgsString = launchArgs.length > 0 ? ' '.concat(launchArgs.join(' ')) : '';
    const command = `${currentPythonPath}${launchArgsString} ${djangoShellCmd}`;
    if (!terminal) {
        terminal = vscode.window.createTerminal('Django Shell');
        if (utils_1.IS_WINDOWS) {
            const commandWin = command.replace(/\\/g, '/');
            if (IS_POWERSHELL) {
                terminal.sendText(`& ${commandWin}`);
            }
            else {
                terminal.sendText(commandWin);
            }
        }
        else {
            terminal.sendText(command);
        }
    }
    // tslint:disable-next-line:variable-name
    const unix_code = code.replace(/\r\n/g, '\n');
    if (utils_1.IS_WINDOWS) {
        terminal.sendText(unix_code.replace(/\n/g, '\r\n'));
    }
    else {
        terminal.sendText(unix_code);
    }
    terminal.show();
    telemetry_1.sendTelemetryEvent(constants_2.EXECUTION_DJANGO);
}
class DjangoContextInitializer {
    constructor() {
        this.workspaceContextKeyValues = new Map();
        this.disposables = [];
        this.isDjangoProject = new contextKey_1.ContextKey('python.isDjangoProject');
        this.ensureState()
            .catch(ex => console.error('Python Extension: ensureState', ex));
        this.disposables.push(vscode.workspace.onDidChangeWorkspaceFolders(() => this.updateContextKeyBasedOnActiveWorkspace()));
    }
    dispose() {
        this.isDjangoProject = null;
        this.disposables.forEach(disposable => disposable.dispose());
    }
    updateContextKeyBasedOnActiveWorkspace() {
        if (this.monitoringActiveTextEditor) {
            return;
        }
        this.monitoringActiveTextEditor = true;
        this.disposables.push(vscode.window.onDidChangeActiveTextEditor(() => this.ensureState()));
    }
    getActiveWorkspace() {
        if (!Array.isArray(vscode_1.workspace.workspaceFolders) || vscode_1.workspace.workspaceFolders.length === 0) {
            return undefined;
        }
        if (vscode_1.workspace.workspaceFolders.length === 1) {
            return vscode_1.workspace.workspaceFolders[0].uri.fsPath;
        }
        const activeEditor = vscode.window.activeTextEditor;
        if (!activeEditor) {
            return undefined;
        }
        const workspaceFolder = vscode.workspace.getWorkspaceFolder(activeEditor.document.uri);
        return workspaceFolder ? workspaceFolder.uri.fsPath : undefined;
    }
    ensureState() {
        return __awaiter(this, void 0, void 0, function* () {
            const activeWorkspace = this.getActiveWorkspace();
            if (!activeWorkspace) {
                return yield this.isDjangoProject.set(false);
            }
            if (this.lastCheckedWorkspace === activeWorkspace) {
                return;
            }
            if (this.workspaceContextKeyValues.has(activeWorkspace)) {
                yield this.isDjangoProject.set(this.workspaceContextKeyValues.get(activeWorkspace));
            }
            else {
                const exists = yield fs.pathExists(path.join(activeWorkspace, 'manage.py'));
                yield this.isDjangoProject.set(exists);
                this.workspaceContextKeyValues.set(activeWorkspace, exists);
                this.lastCheckedWorkspace = activeWorkspace;
            }
        });
    }
}
//# sourceMappingURL=execInTerminalProvider.js.map
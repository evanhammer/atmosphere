"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const configSettings_1 = require("../../common/configSettings");
const vscode_1 = require("vscode");
class SimpleConfigurationProvider {
    getProgram(config) {
        const editor = vscode_1.window.activeTextEditor;
        if (editor && editor.document.languageId === 'python') {
            return editor.document.fileName;
        }
        return undefined;
    }
    getWorkspaceFolder(config) {
        const program = this.getProgram(config);
        if (!Array.isArray(vscode_1.workspace.workspaceFolders) || vscode_1.workspace.workspaceFolders.length === 0) {
            return program ? path.dirname(program) : undefined;
        }
        if (vscode_1.workspace.workspaceFolders.length === 1) {
            return vscode_1.workspace.workspaceFolders[0].uri.fsPath;
        }
        if (program) {
            const workspaceFolder = vscode_1.workspace.getWorkspaceFolder(vscode_1.Uri.file(program));
            if (workspaceFolder) {
                return workspaceFolder.uri.fsPath;
            }
        }
        return undefined;
    }
    resolveDebugConfiguration(folder, debugConfiguration, token) {
        const keys = Object.keys(debugConfiguration);
        const provideConfig = (debugConfiguration.noDebug === true && keys.length === 1) || keys.length === 0;
        if (!provideConfig) {
            return debugConfiguration;
        }
        const config = debugConfiguration;
        const defaultProgram = this.getProgram(config);
        const workspaceFolder = this.getWorkspaceFolder(config);
        const envFile = workspaceFolder ? path.join(workspaceFolder, '.env') : undefined;
        return {
            name: 'Launch',
            type: 'python',
            request: 'launch',
            stopOnEntry: true,
            pythonPath: configSettings_1.PythonSettings.getInstance(workspaceFolder ? vscode_1.Uri.file(workspaceFolder) : undefined).pythonPath,
            program: defaultProgram,
            cwd: workspaceFolder,
            envFile,
            env: {},
            debugOptions: [
                'RedirectOutput'
            ],
            noDebug: debugConfiguration.noDebug
        };
    }
}
exports.SimpleConfigurationProvider = SimpleConfigurationProvider;
//# sourceMappingURL=simpleProvider.js.map
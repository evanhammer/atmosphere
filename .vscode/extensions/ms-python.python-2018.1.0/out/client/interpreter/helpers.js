"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
function getFirstNonEmptyLineFromMultilineString(stdout) {
    if (!stdout) {
        return '';
    }
    const lines = stdout.split(/\r?\n/g).map(line => line.trim()).filter(line => line.length > 0);
    return lines.length > 0 ? lines[0] : '';
}
exports.getFirstNonEmptyLineFromMultilineString = getFirstNonEmptyLineFromMultilineString;
function getActiveWorkspaceUri() {
    if (!Array.isArray(vscode_1.workspace.workspaceFolders) || vscode_1.workspace.workspaceFolders.length === 0) {
        return undefined;
    }
    if (vscode_1.workspace.workspaceFolders.length === 1) {
        return { folderUri: vscode_1.workspace.workspaceFolders[0].uri, configTarget: vscode_1.ConfigurationTarget.Workspace };
    }
    if (vscode_1.window.activeTextEditor) {
        const workspaceFolder = vscode_1.workspace.getWorkspaceFolder(vscode_1.window.activeTextEditor.document.uri);
        if (workspaceFolder) {
            return { configTarget: vscode_1.ConfigurationTarget.WorkspaceFolder, folderUri: workspaceFolder.uri };
        }
    }
    return undefined;
}
exports.getActiveWorkspaceUri = getActiveWorkspaceUri;
//# sourceMappingURL=helpers.js.map
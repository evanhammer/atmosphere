"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const vscode = require("vscode");
const constants_1 = require("../common/constants");
const helpers_1 = require("../common/helpers");
const types_1 = require("../common/types");
const editor_1 = require("./../common/editor");
const utils_1 = require("./../common/utils");
class BaseFormatter {
    constructor(Id, product, serviceContainer) {
        this.Id = Id;
        this.product = product;
        this.serviceContainer = serviceContainer;
        this.outputChannel = this.serviceContainer.get(types_1.IOutputChannel, constants_1.STANDARD_OUTPUT_CHANNEL);
    }
    getDocumentPath(document, fallbackPath) {
        if (path.basename(document.uri.fsPath) === document.uri.fsPath) {
            return fallbackPath;
        }
        return path.dirname(document.fileName);
    }
    getWorkspaceUri(document) {
        const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);
        if (workspaceFolder) {
            return workspaceFolder.uri;
        }
        if (Array.isArray(vscode.workspace.workspaceFolders) && vscode.workspace.workspaceFolders.length > 0) {
            return vscode.workspace.workspaceFolders[0].uri;
        }
        return vscode.Uri.file(__dirname);
    }
    provideDocumentFormattingEdits(document, options, token, command, args, cwd) {
        this.outputChannel.clear();
        if (typeof cwd !== 'string' || cwd.length === 0) {
            cwd = this.getWorkspaceUri(document).fsPath;
        }
        // autopep8 and yapf have the ability to read from the process input stream and return the formatted code out of the output stream
        // However they don't support returning the diff of the formatted text when reading data from the input stream
        // Yes getting text formatted that way avoids having to create a temporary file, however the diffing will have
        // to be done here in node (extension), i.e. extension cpu, i.e. les responsive solution
        const tmpFileCreated = document.isDirty;
        const filePromise = tmpFileCreated ? editor_1.getTempFileWithDocumentContents(document) : Promise.resolve(document.fileName);
        const promise = filePromise.then(filePath => {
            if (token && token.isCancellationRequested) {
                return [filePath, ''];
            }
            return Promise.all([Promise.resolve(filePath), utils_1.execPythonFile(document.uri, command, args.concat([filePath]), cwd)]);
        }).then(data => {
            // Delete the temporary file created
            if (tmpFileCreated) {
                fs.unlink(data[0]);
            }
            if (token && token.isCancellationRequested) {
                return [];
            }
            return editor_1.getTextEditsFromPatch(document.getText(), data[1]);
        }).catch(error => {
            this.handleError(this.Id, command, error, document.uri);
            return [];
        });
        vscode.window.setStatusBarMessage(`Formatting with ${this.Id}`, promise);
        return promise;
    }
    handleError(expectedFileName, fileName, error, resource) {
        let customError = `Formatting with ${this.Id} failed.`;
        if (helpers_1.isNotInstalledError(error)) {
            // Check if we have some custom arguments such as "pylint --load-plugins pylint_django"
            // Such settings are no longer supported
            const stuffAfterFileName = fileName.substring(fileName.toUpperCase().lastIndexOf(expectedFileName) + expectedFileName.length);
            // Ok if we have a space after the file name, this means we have some arguments defined and this isn't supported
            if (stuffAfterFileName.trim().indexOf(' ') > 0) {
                // tslint:disable-next-line:prefer-template
                customError = `Formatting failed, custom arguments in the 'python.formatting.${this.Id}Path' is not supported.\n` +
                    `Custom arguments to the formatter can be defined in 'python.formatter.${this.Id}Args' setting of settings.json.`;
            }
            else {
                const installer = this.serviceContainer.get(types_1.IInstaller);
                customError += `\nYou could either install the '${this.Id}' formatter, turn it off or use another formatter.`;
                installer.promptToInstall(this.product, resource)
                    .catch(ex => console.error('Python Extension: promptToInstall', ex));
            }
        }
        this.outputChannel.appendLine(`\n${customError}\n${error}`);
    }
}
exports.BaseFormatter = BaseFormatter;
//# sourceMappingURL=baseFormatter.js.map
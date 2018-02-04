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
const fs = require("fs");
const path = require("path");
const vscode = require("vscode");
const vscode_1 = require("vscode");
const configSettingMonitor_1 = require("../common/configSettingMonitor");
const configSettings_1 = require("../common/configSettings");
const constants_1 = require("../common/constants");
const types_1 = require("../linters/types");
const telemetry_1 = require("../telemetry");
const constants_2 = require("../telemetry/constants");
const stopWatch_1 = require("../telemetry/stopWatch");
// tslint:disable-next-line:no-require-imports no-var-requires
const Minimatch = require('minimatch').Minimatch;
const uriSchemesToIgnore = ['git', 'showModifications', 'svn'];
const lintSeverityToVSSeverity = new Map();
lintSeverityToVSSeverity.set(types_1.LintMessageSeverity.Error, vscode.DiagnosticSeverity.Error);
lintSeverityToVSSeverity.set(types_1.LintMessageSeverity.Hint, vscode.DiagnosticSeverity.Hint);
lintSeverityToVSSeverity.set(types_1.LintMessageSeverity.Information, vscode.DiagnosticSeverity.Information);
lintSeverityToVSSeverity.set(types_1.LintMessageSeverity.Warning, vscode.DiagnosticSeverity.Warning);
function createDiagnostics(message, document) {
    const position = new vscode.Position(message.line - 1, message.column);
    const range = new vscode.Range(position, position);
    const severity = lintSeverityToVSSeverity.get(message.severity);
    const diagnostic = new vscode.Diagnostic(range, `${message.code}:${message.message}`, severity);
    diagnostic.code = message.code;
    diagnostic.source = message.provider;
    return diagnostic;
}
class LinterProvider {
    constructor(context, outputChannel, documentHasJupyterCodeCells, serviceContainer) {
        this.documentHasJupyterCodeCells = documentHasJupyterCodeCells;
        this.serviceContainer = serviceContainer;
        this.pendingLintings = new Map();
        this.linterManager = serviceContainer.get(types_1.ILinterManager);
        this.outputChannel = outputChannel;
        this.context = context;
        this.disposables = [];
        this.initialize();
        this.configMonitor = new configSettingMonitor_1.ConfigSettingMonitor('linting');
        this.configMonitor.on('change', this.lintSettingsChangedHandler.bind(this));
    }
    dispose() {
        this.disposables.forEach(d => d.dispose());
        this.configMonitor.dispose();
    }
    isDocumentOpen(uri) {
        return vscode.workspace.textDocuments.some(document => document.uri.fsPath === uri.fsPath);
    }
    initialize() {
        this.diagnosticCollection = vscode.languages.createDiagnosticCollection('python');
        let disposable = vscode.workspace.onDidSaveTextDocument((e) => {
            const settings = configSettings_1.PythonSettings.getInstance(e.uri);
            if (e.languageId !== 'python' || !settings.linting.enabled || !settings.linting.lintOnSave) {
                return;
            }
            this.lintDocument(e, 100, 'save');
        });
        this.context.subscriptions.push(disposable);
        vscode.workspace.onDidOpenTextDocument((e) => {
            const settings = configSettings_1.PythonSettings.getInstance(e.uri);
            if (e.languageId !== 'python' || !settings.linting.enabled) {
                return;
            }
            // Exclude files opened by vscode when showing a diff view.
            if (uriSchemesToIgnore.indexOf(e.uri.scheme) >= 0) {
                return;
            }
            if (!e.uri.path || (path.basename(e.uri.path) === e.uri.path && !fs.existsSync(e.uri.path))) {
                return;
            }
            this.lintDocument(e, 100, 'auto');
        }, this.context.subscriptions);
        disposable = vscode.workspace.onDidCloseTextDocument(textDocument => {
            if (!textDocument || !textDocument.fileName || !textDocument.uri) {
                return;
            }
            // Check if this document is still open as a duplicate editor.
            if (!this.isDocumentOpen(textDocument.uri) && this.diagnosticCollection.has(textDocument.uri)) {
                this.diagnosticCollection.set(textDocument.uri, []);
            }
        });
        this.context.subscriptions.push(disposable);
        this.lintOpenPythonFiles();
    }
    lintOpenPythonFiles() {
        vscode_1.workspace.textDocuments.forEach((document) => __awaiter(this, void 0, void 0, function* () {
            if (document.languageId === constants_1.PythonLanguage.language) {
                yield this.onLintDocument(document, 'auto');
            }
        }));
    }
    lintSettingsChangedHandler(configTarget, wkspaceOrFolder) {
        if (configTarget === vscode_1.ConfigurationTarget.Workspace) {
            this.lintOpenPythonFiles();
            return;
        }
        // Look for python files that belong to the specified workspace folder.
        vscode_1.workspace.textDocuments.forEach((document) => __awaiter(this, void 0, void 0, function* () {
            const wkspaceFolder = vscode_1.workspace.getWorkspaceFolder(document.uri);
            if (wkspaceFolder && wkspaceFolder.uri.fsPath === wkspaceOrFolder.fsPath) {
                yield this.onLintDocument(document, 'auto');
            }
        }));
    }
    lintDocument(document, delay, trigger) {
        // Since this is a hack, lets wait for 2 seconds before linting.
        // Give user to continue typing before we waste CPU time.
        if (this.lastTimeout) {
            clearTimeout(this.lastTimeout);
            this.lastTimeout = 0;
        }
        this.lastTimeout = setTimeout(() => __awaiter(this, void 0, void 0, function* () {
            yield this.onLintDocument(document, trigger);
        }), delay);
    }
    onLintDocument(document, trigger) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check if we need to lint this document
            const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);
            const workspaceRootPath = (workspaceFolder && typeof workspaceFolder.uri.fsPath === 'string') ? workspaceFolder.uri.fsPath : undefined;
            const relativeFileName = typeof workspaceRootPath === 'string' ? path.relative(workspaceRootPath, document.fileName) : document.fileName;
            const settings = configSettings_1.PythonSettings.getInstance(document.uri);
            if (document.languageId !== constants_1.PythonLanguage.language) {
                return;
            }
            if (!this.linterManager.isLintingEnabled()) {
                this.diagnosticCollection.set(document.uri, []);
            }
            const ignoreMinmatches = settings.linting.ignorePatterns.map(pattern => {
                return new Minimatch(pattern);
            });
            if (ignoreMinmatches.some(matcher => matcher.match(document.fileName) || matcher.match(relativeFileName))) {
                return;
            }
            if (this.pendingLintings.has(document.uri.fsPath)) {
                this.pendingLintings.get(document.uri.fsPath).cancel();
                this.pendingLintings.delete(document.uri.fsPath);
            }
            const cancelToken = new vscode.CancellationTokenSource();
            cancelToken.token.onCancellationRequested(() => {
                if (this.pendingLintings.has(document.uri.fsPath)) {
                    this.pendingLintings.delete(document.uri.fsPath);
                }
            });
            this.pendingLintings.set(document.uri.fsPath, cancelToken);
            this.outputChannel.clear();
            const promises = this.linterManager.getActiveLinters(document.uri)
                .map(info => {
                const stopWatch = new stopWatch_1.StopWatch();
                const linter = this.linterManager.createLinter(info.product, this.outputChannel, this.serviceContainer);
                const promise = linter.lint(document, cancelToken.token);
                this.sendLinterRunTelemetry(info, document.uri, promise, stopWatch, trigger);
                return promise;
            });
            this.documentHasJupyterCodeCells(document, cancelToken.token)
                .then(hasJupyterCodeCells => {
                // linters will resolve asynchronously - keep a track of all
                // diagnostics reported as them come in.
                let diagnostics = [];
                promises.forEach(p => {
                    p.then(msgs => {
                        if (cancelToken.token.isCancellationRequested) {
                            return;
                        }
                        // Build the message and suffix the message with the name of the linter used.
                        msgs.forEach(d => {
                            // Ignore magic commands from jupyter.
                            if (hasJupyterCodeCells && document.lineAt(d.line - 1).text.trim().startsWith('%') &&
                                (d.code === constants_1.LinterErrors.pylint.InvalidSyntax ||
                                    d.code === constants_1.LinterErrors.prospector.InvalidSyntax ||
                                    d.code === constants_1.LinterErrors.flake8.InvalidSyntax)) {
                                return;
                            }
                            diagnostics.push(createDiagnostics(d, document));
                        });
                        // Limit the number of messages to the max value.
                        diagnostics = diagnostics.filter((value, index) => index <= settings.linting.maxNumberOfProblems);
                        if (!this.isDocumentOpen(document.uri)) {
                            diagnostics = [];
                        }
                        // Set all diagnostics found in this pass, as this method always clears existing diagnostics.
                        this.diagnosticCollection.set(document.uri, diagnostics);
                    })
                        .catch(ex => console.error('Python Extension: documentHasJupyterCodeCells.promises', ex));
                });
            })
                .catch(ex => console.error('Python Extension: documentHasJupyterCodeCells', ex));
        });
    }
    sendLinterRunTelemetry(info, resource, promise, stopWatch, trigger) {
        const linterExecutablePathName = info.pathName(resource);
        const properties = {
            tool: info.id,
            hasCustomArgs: info.linterArgs(resource).length > 0,
            trigger,
            executableSpecified: linterExecutablePathName.length > 0
        };
        telemetry_1.sendTelemetryWhenDone(constants_2.LINTING, promise, stopWatch, properties);
    }
}
exports.LinterProvider = LinterProvider;
//# sourceMappingURL=linterProvider.js.map
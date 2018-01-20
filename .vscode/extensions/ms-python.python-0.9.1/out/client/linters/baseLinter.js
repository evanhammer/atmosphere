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
const vscode = require("vscode");
const configSettings_1 = require("../common/configSettings");
require("../common/extensions");
const types_1 = require("../common/process/types");
const types_2 = require("../common/variables/types");
const main_1 = require("./errorHandlers/main");
// tslint:disable-next-line:no-require-imports no-var-requires
const namedRegexp = require('named-js-regexp');
const REGEX = '(?<line>\\d+),(?<column>\\d+),(?<type>\\w+),(?<code>\\w\\d+):(?<message>.*)\\r?(\\n|$)';
var LintMessageSeverity;
(function (LintMessageSeverity) {
    LintMessageSeverity[LintMessageSeverity["Hint"] = 0] = "Hint";
    LintMessageSeverity[LintMessageSeverity["Error"] = 1] = "Error";
    LintMessageSeverity[LintMessageSeverity["Warning"] = 2] = "Warning";
    LintMessageSeverity[LintMessageSeverity["Information"] = 3] = "Information";
})(LintMessageSeverity = exports.LintMessageSeverity || (exports.LintMessageSeverity = {}));
function matchNamedRegEx(data, regex) {
    const compiledRegexp = namedRegexp(regex, 'g');
    const rawMatch = compiledRegexp.exec(data);
    if (rawMatch !== null) {
        return rawMatch.groups();
    }
    return undefined;
}
exports.matchNamedRegEx = matchNamedRegEx;
class BaseLinter {
    constructor(product, outputChannel, installer, helper, logger, serviceContainer, columnOffset = 0) {
        this.product = product;
        this.outputChannel = outputChannel;
        this.installer = installer;
        this.helper = helper;
        this.logger = logger;
        this.serviceContainer = serviceContainer;
        this.columnOffset = columnOffset;
        this.Id = this.helper.translateToId(product);
        this.errorHandler = new main_1.ErrorHandler(product, installer, helper, logger, outputChannel, serviceContainer);
    }
    get pythonSettings() {
        return this._pythonSettings;
    }
    isEnabled(resource) {
        this._pythonSettings = configSettings_1.PythonSettings.getInstance(resource);
        const names = this.helper.getSettingsPropertyNames(this.product);
        return this._pythonSettings.linting[names.enabledName];
    }
    linterArgs(resource) {
        this._pythonSettings = configSettings_1.PythonSettings.getInstance(resource);
        const names = this.helper.getSettingsPropertyNames(this.product);
        return this._pythonSettings.linting[names.argsName];
    }
    isLinterExecutableSpecified(resource) {
        this._pythonSettings = configSettings_1.PythonSettings.getInstance(resource);
        const names = this.helper.getSettingsPropertyNames(this.product);
        const executablePath = this._pythonSettings.linting[names.pathName];
        return path.basename(executablePath).length > 0 && path.basename(executablePath) !== executablePath;
    }
    lint(document, cancellation) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.isEnabled(document.uri)) {
                return [];
            }
            this._pythonSettings = configSettings_1.PythonSettings.getInstance(document.uri);
            return this.runLinter(document, cancellation);
        });
    }
    getWorkspaceRootPath(document) {
        const workspaceFolder = vscode.workspace.getWorkspaceFolder(document.uri);
        const workspaceRootPath = (workspaceFolder && typeof workspaceFolder.uri.fsPath === 'string') ? workspaceFolder.uri.fsPath : undefined;
        return typeof workspaceRootPath === 'string' ? workspaceRootPath : __dirname;
    }
    // tslint:disable-next-line:no-any
    parseMessagesSeverity(error, categorySeverity) {
        if (categorySeverity[error]) {
            const severityName = categorySeverity[error];
            switch (severityName) {
                case 'Error':
                    return LintMessageSeverity.Error;
                case 'Hint':
                    return LintMessageSeverity.Hint;
                case 'Information':
                    return LintMessageSeverity.Information;
                case 'Warning':
                    return LintMessageSeverity.Warning;
                default: {
                    if (LintMessageSeverity[severityName]) {
                        // tslint:disable-next-line:no-any
                        return LintMessageSeverity[severityName];
                    }
                }
            }
        }
        return LintMessageSeverity.Information;
    }
    run(args, document, cancellation, regEx = REGEX) {
        return __awaiter(this, void 0, void 0, function* () {
            const executionInfo = this.helper.getExecutionInfo(this.product, args, document.uri);
            const cwd = this.getWorkspaceRootPath(document);
            let executionPromise;
            // Check if required to run as a module or executable.
            if (executionInfo.moduleName) {
                const pythonExecutionService = yield this.serviceContainer.get(types_1.IPythonExecutionFactory).create(document.uri);
                executionPromise = pythonExecutionService.execModule(executionInfo.moduleName, executionInfo.args, { cwd, mergeStdOutErr: true, token: cancellation });
            }
            else {
                const env = yield this.serviceContainer.get(types_2.IEnvironmentVariablesProvider).getEnvironmentVariables(true, document.uri);
                const executionService = this.serviceContainer.get(types_1.IProcessService);
                executionPromise = executionService.exec(executionInfo.execPath, executionInfo.args, { cwd, env, token: cancellation, mergeStdOutErr: true });
            }
            try {
                const result = yield executionPromise;
                this.displayLinterResultHeader(result.stdout);
                return yield this.parseMessages(result.stdout, document, cancellation, regEx);
            }
            catch (error) {
                this.handleError(error, document.uri, executionInfo);
                return [];
            }
        });
    }
    parseMessages(output, document, token, regEx) {
        return __awaiter(this, void 0, void 0, function* () {
            const outputLines = output.splitLines({ removeEmptyEntries: false, trim: false });
            return this.parseLines(outputLines, regEx);
        });
    }
    handleError(error, resource, execInfo) {
        this.errorHandler.handleError(error, resource, execInfo)
            .catch(this.logger.logError.bind(this, 'Error in errorHandler.handleError'));
    }
    parseLine(line, regEx) {
        const match = matchNamedRegEx(line, regEx);
        if (!match) {
            return;
        }
        // tslint:disable-next-line:no-any
        match.line = Number(match.line);
        // tslint:disable-next-line:no-any
        match.column = Number(match.column);
        return {
            code: match.code,
            message: match.message,
            column: isNaN(match.column) || match.column === 0 ? 0 : match.column - this.columnOffset,
            line: match.line,
            type: match.type,
            provider: this.Id
        };
    }
    parseLines(outputLines, regEx) {
        return outputLines
            .filter((value, index) => index <= this.pythonSettings.linting.maxNumberOfProblems)
            .map(line => {
            try {
                const msg = this.parseLine(line, regEx);
                if (msg) {
                    return msg;
                }
            }
            catch (ex) {
                this.logger.logError(`Linter '${this.Id}' failed to parse the line '${line}.`, ex);
            }
            return;
        })
            .filter(item => item !== undefined)
            .map(item => item);
    }
    displayLinterResultHeader(data) {
        this.outputChannel.append(`${'#'.repeat(10)}Linting Output - ${this.Id}${'#'.repeat(10)}\n`);
        this.outputChannel.append(data);
    }
}
exports.BaseLinter = BaseLinter;
//# sourceMappingURL=baseLinter.js.map
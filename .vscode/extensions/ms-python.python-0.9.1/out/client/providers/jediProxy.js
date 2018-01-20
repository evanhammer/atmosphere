// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const child_process = require("child_process");
const path = require("path");
const vscode = require("vscode");
const configSettings_1 = require("../common/configSettings");
const envFileParser_1 = require("../common/envFileParser");
const helpers_1 = require("../common/helpers");
const utils_1 = require("../common/utils");
const logger = require("./../common/logger");
const IS_WINDOWS = /^win/.test(process.platform);
const pythonVSCodeTypeMappings = new Map();
pythonVSCodeTypeMappings.set('none', vscode.CompletionItemKind.Value);
pythonVSCodeTypeMappings.set('type', vscode.CompletionItemKind.Class);
pythonVSCodeTypeMappings.set('tuple', vscode.CompletionItemKind.Class);
pythonVSCodeTypeMappings.set('dict', vscode.CompletionItemKind.Class);
pythonVSCodeTypeMappings.set('dictionary', vscode.CompletionItemKind.Class);
pythonVSCodeTypeMappings.set('function', vscode.CompletionItemKind.Function);
pythonVSCodeTypeMappings.set('lambda', vscode.CompletionItemKind.Function);
pythonVSCodeTypeMappings.set('generator', vscode.CompletionItemKind.Function);
pythonVSCodeTypeMappings.set('class', vscode.CompletionItemKind.Class);
pythonVSCodeTypeMappings.set('instance', vscode.CompletionItemKind.Reference);
pythonVSCodeTypeMappings.set('method', vscode.CompletionItemKind.Method);
pythonVSCodeTypeMappings.set('builtin', vscode.CompletionItemKind.Class);
pythonVSCodeTypeMappings.set('builtinfunction', vscode.CompletionItemKind.Function);
pythonVSCodeTypeMappings.set('module', vscode.CompletionItemKind.Module);
pythonVSCodeTypeMappings.set('file', vscode.CompletionItemKind.File);
pythonVSCodeTypeMappings.set('xrange', vscode.CompletionItemKind.Class);
pythonVSCodeTypeMappings.set('slice', vscode.CompletionItemKind.Class);
pythonVSCodeTypeMappings.set('traceback', vscode.CompletionItemKind.Class);
pythonVSCodeTypeMappings.set('frame', vscode.CompletionItemKind.Class);
pythonVSCodeTypeMappings.set('buffer', vscode.CompletionItemKind.Class);
pythonVSCodeTypeMappings.set('dictproxy', vscode.CompletionItemKind.Class);
pythonVSCodeTypeMappings.set('funcdef', vscode.CompletionItemKind.Function);
pythonVSCodeTypeMappings.set('property', vscode.CompletionItemKind.Property);
pythonVSCodeTypeMappings.set('import', vscode.CompletionItemKind.Module);
pythonVSCodeTypeMappings.set('keyword', vscode.CompletionItemKind.Keyword);
pythonVSCodeTypeMappings.set('constant', vscode.CompletionItemKind.Variable);
pythonVSCodeTypeMappings.set('variable', vscode.CompletionItemKind.Variable);
pythonVSCodeTypeMappings.set('value', vscode.CompletionItemKind.Value);
pythonVSCodeTypeMappings.set('param', vscode.CompletionItemKind.Variable);
pythonVSCodeTypeMappings.set('statement', vscode.CompletionItemKind.Keyword);
const pythonVSCodeSymbolMappings = new Map();
pythonVSCodeSymbolMappings.set('none', vscode.SymbolKind.Variable);
pythonVSCodeSymbolMappings.set('type', vscode.SymbolKind.Class);
pythonVSCodeSymbolMappings.set('tuple', vscode.SymbolKind.Class);
pythonVSCodeSymbolMappings.set('dict', vscode.SymbolKind.Class);
pythonVSCodeSymbolMappings.set('dictionary', vscode.SymbolKind.Class);
pythonVSCodeSymbolMappings.set('function', vscode.SymbolKind.Function);
pythonVSCodeSymbolMappings.set('lambda', vscode.SymbolKind.Function);
pythonVSCodeSymbolMappings.set('generator', vscode.SymbolKind.Function);
pythonVSCodeSymbolMappings.set('class', vscode.SymbolKind.Class);
pythonVSCodeSymbolMappings.set('instance', vscode.SymbolKind.Class);
pythonVSCodeSymbolMappings.set('method', vscode.SymbolKind.Method);
pythonVSCodeSymbolMappings.set('builtin', vscode.SymbolKind.Class);
pythonVSCodeSymbolMappings.set('builtinfunction', vscode.SymbolKind.Function);
pythonVSCodeSymbolMappings.set('module', vscode.SymbolKind.Module);
pythonVSCodeSymbolMappings.set('file', vscode.SymbolKind.File);
pythonVSCodeSymbolMappings.set('xrange', vscode.SymbolKind.Array);
pythonVSCodeSymbolMappings.set('slice', vscode.SymbolKind.Class);
pythonVSCodeSymbolMappings.set('traceback', vscode.SymbolKind.Class);
pythonVSCodeSymbolMappings.set('frame', vscode.SymbolKind.Class);
pythonVSCodeSymbolMappings.set('buffer', vscode.SymbolKind.Array);
pythonVSCodeSymbolMappings.set('dictproxy', vscode.SymbolKind.Class);
pythonVSCodeSymbolMappings.set('funcdef', vscode.SymbolKind.Function);
pythonVSCodeSymbolMappings.set('property', vscode.SymbolKind.Property);
pythonVSCodeSymbolMappings.set('import', vscode.SymbolKind.Module);
pythonVSCodeSymbolMappings.set('keyword', vscode.SymbolKind.Variable);
pythonVSCodeSymbolMappings.set('constant', vscode.SymbolKind.Constant);
pythonVSCodeSymbolMappings.set('variable', vscode.SymbolKind.Variable);
pythonVSCodeSymbolMappings.set('value', vscode.SymbolKind.Variable);
pythonVSCodeSymbolMappings.set('param', vscode.SymbolKind.Variable);
pythonVSCodeSymbolMappings.set('statement', vscode.SymbolKind.Variable);
pythonVSCodeSymbolMappings.set('boolean', vscode.SymbolKind.Boolean);
pythonVSCodeSymbolMappings.set('int', vscode.SymbolKind.Number);
pythonVSCodeSymbolMappings.set('longlean', vscode.SymbolKind.Number);
pythonVSCodeSymbolMappings.set('float', vscode.SymbolKind.Number);
pythonVSCodeSymbolMappings.set('complex', vscode.SymbolKind.Number);
pythonVSCodeSymbolMappings.set('string', vscode.SymbolKind.String);
pythonVSCodeSymbolMappings.set('unicode', vscode.SymbolKind.String);
pythonVSCodeSymbolMappings.set('list', vscode.SymbolKind.Array);
function getMappedVSCodeType(pythonType) {
    if (pythonVSCodeTypeMappings.has(pythonType)) {
        const value = pythonVSCodeTypeMappings.get(pythonType);
        if (value) {
            return value;
        }
    }
    return vscode.CompletionItemKind.Keyword;
}
function getMappedVSCodeSymbol(pythonType) {
    if (pythonVSCodeSymbolMappings.has(pythonType)) {
        const value = pythonVSCodeSymbolMappings.get(pythonType);
        if (value) {
            return value;
        }
    }
    return vscode.SymbolKind.Variable;
}
var CommandType;
(function (CommandType) {
    CommandType[CommandType["Arguments"] = 0] = "Arguments";
    CommandType[CommandType["Completions"] = 1] = "Completions";
    CommandType[CommandType["Hover"] = 2] = "Hover";
    CommandType[CommandType["Usages"] = 3] = "Usages";
    CommandType[CommandType["Definitions"] = 4] = "Definitions";
    CommandType[CommandType["Symbols"] = 5] = "Symbols";
})(CommandType = exports.CommandType || (exports.CommandType = {}));
const commandNames = new Map();
commandNames.set(CommandType.Arguments, 'arguments');
commandNames.set(CommandType.Completions, 'completions');
commandNames.set(CommandType.Definitions, 'definitions');
commandNames.set(CommandType.Hover, 'tooltip');
commandNames.set(CommandType.Usages, 'usages');
commandNames.set(CommandType.Symbols, 'names');
class JediProxy {
    constructor(extensionRootDir, workspacePath) {
        this.cmdId = 0;
        this.pythonProcessCWD = '';
        this.previousData = '';
        this.commands = new Map();
        this.commandQueue = [];
        this.spawnRetryAttempts = 0;
        this.additionalAutoCopletePaths = [];
        this.workspacePath = workspacePath;
        this.pythonSettings = configSettings_1.PythonSettings.getInstance(vscode.Uri.file(workspacePath));
        this.lastKnownPythonInterpreter = this.pythonSettings.pythonPath;
        this.pythonSettings.on('change', this.onPythonSettingsChanged.bind(this));
        vscode.workspace.onDidChangeConfiguration(this.onConfigChanged.bind(this));
        this.onConfigChanged();
        this.initialize(extensionRootDir);
    }
    static getProperty(o, name) {
        return o[name];
    }
    dispose() {
        this.killProcess();
    }
    getNextCommandId() {
        const result = this.cmdId;
        this.cmdId += 1;
        return result;
    }
    sendCommand(cmd) {
        if (!this.proc) {
            return Promise.reject(new Error('Python proc not initialized'));
        }
        const executionCmd = cmd;
        const payload = this.createPayload(executionCmd);
        executionCmd.deferred = helpers_1.createDeferred();
        // if (typeof executionCmd.telemetryEvent === 'string') {
        //     executionCmd.delays = new telemetryHelper.Delays();
        // }
        try {
            this.proc.stdin.write(`${JSON.stringify(payload)}\n`);
            this.commands.set(executionCmd.id, executionCmd);
            this.commandQueue.push(executionCmd.id);
        }
        catch (ex) {
            console.error(ex);
            //If 'This socket is closed.' that means process didn't start at all (at least not properly).
            if (ex.message === 'This socket is closed.') {
                this.killProcess();
            }
            else {
                this.handleError('sendCommand', ex.message);
            }
            return Promise.reject(ex);
        }
        return executionCmd.deferred.promise;
    }
    // keep track of the directory so we can re-spawn the process.
    initialize(dir) {
        this.pythonProcessCWD = dir;
        this.spawnProcess(path.join(dir, 'pythonFiles'));
    }
    // Check if settings changes.
    onPythonSettingsChanged() {
        if (this.lastKnownPythonInterpreter === this.pythonSettings.pythonPath) {
            return;
        }
        this.killProcess();
        this.clearPendingRequests();
        this.initialize(this.pythonProcessCWD);
    }
    clearPendingRequests() {
        this.commandQueue = [];
        this.commands.forEach(item => {
            if (item.deferred !== undefined) {
                item.deferred.resolve();
            }
        });
        this.commands.clear();
    }
    killProcess() {
        try {
            if (this.proc) {
                this.proc.kill();
            }
            // tslint:disable-next-line:no-empty
        }
        catch (ex) { }
        this.proc = null;
    }
    handleError(source, errorMessage) {
        logger.error(`${source} jediProxy`, `Error (${source}) ${errorMessage}`);
    }
    // tslint:disable-next-line:max-func-body-length
    spawnProcess(dir) {
        try {
            let environmentVariables = { PYTHONUNBUFFERED: '1' };
            const customEnvironmentVars = utils_1.getCustomEnvVarsSync(vscode.Uri.file(dir));
            if (customEnvironmentVars) {
                environmentVariables = envFileParser_1.mergeEnvVariables(environmentVariables, customEnvironmentVars);
            }
            environmentVariables = envFileParser_1.mergeEnvVariables(environmentVariables);
            const args = ['completion.py'];
            if (typeof this.pythonSettings.jediPath !== 'string' || this.pythonSettings.jediPath.length === 0) {
                if (Array.isArray(this.pythonSettings.devOptions) &&
                    this.pythonSettings.devOptions.some(item => item.toUpperCase().trim() === 'USERELEASEAUTOCOMP')) {
                    // Use standard version of jedi library.
                    args.push('std');
                }
                else {
                    // Use preview version of jedi library.
                    args.push('preview');
                }
            }
            else {
                args.push('custom');
                args.push(this.pythonSettings.jediPath);
            }
            if (Array.isArray(this.pythonSettings.autoComplete.preloadModules) &&
                this.pythonSettings.autoComplete.preloadModules.length > 0) {
                const modules = this.pythonSettings.autoComplete.preloadModules.filter(m => m.trim().length > 0).join(',');
                args.push(modules);
            }
            this.proc = child_process.spawn(this.pythonSettings.pythonPath, args, {
                cwd: dir,
                env: environmentVariables
            });
        }
        catch (ex) {
            return this.handleError('spawnProcess', ex.message);
        }
        this.proc.stderr.setEncoding('utf8');
        this.proc.stderr.on('data', (data) => {
            this.handleError('stderr', data);
        });
        this.proc.on('end', (end) => {
            logger.error('spawnProcess.end', `End - ${end}`);
        });
        this.proc.on('error', error => {
            this.handleError('error', `${error}`);
            this.spawnRetryAttempts += 1;
            if (this.spawnRetryAttempts < 10 && error && error.message &&
                error.message.indexOf('This socket has been ended by the other party') >= 0) {
                this.spawnProcess(dir);
            }
        });
        this.proc.stdout.setEncoding('utf8');
        // tslint:disable-next-line:max-func-body-length
        this.proc.stdout.on('data', (data) => {
            // Possible there was an exception in parsing the data returned,
            // so append the data then parse it.
            const dataStr = this.previousData = `${this.previousData}${data}`;
            // tslint:disable-next-line:no-any
            let responses;
            try {
                responses = dataStr.split(/\r?\n/g).filter(line => line.length > 0).map(resp => JSON.parse(resp));
                this.previousData = '';
            }
            catch (ex) {
                // Possible we've only received part of the data, hence don't clear previousData.
                // Don't log errors when we haven't received the entire response.
                if (ex.message.indexOf('Unexpected end of input') === -1 &&
                    ex.message.indexOf('Unexpected end of JSON input') === -1 &&
                    ex.message.indexOf('Unexpected token') === -1) {
                    this.handleError('stdout', ex.message);
                }
                return;
            }
            responses.forEach((response) => {
                // What's this, can't remember,
                // Great example of poorly written code (this whole file is a mess).
                // I think this needs to be removed, because this is misspelt, it is argments, 'U' is missing,
                // And that case is handled further down
                // case CommandType.Arguments: {
                const responseId = JediProxy.getProperty(response, 'id');
                const cmd = this.commands.get(responseId);
                if (cmd === null) {
                    return;
                }
                if (JediProxy.getProperty(response, 'arguments')) {
                    this.commandQueue.splice(this.commandQueue.indexOf(cmd.id), 1);
                    return;
                }
                this.commands.delete(responseId);
                const index = this.commandQueue.indexOf(cmd.id);
                if (index) {
                    this.commandQueue.splice(index, 1);
                }
                // Check if this command has expired.
                if (cmd.token.isCancellationRequested) {
                    this.safeResolve(cmd, undefined);
                    return;
                }
                switch (cmd.command) {
                    case CommandType.Completions:
                        this.onCompletion(cmd, response);
                        break;
                    case CommandType.Definitions:
                        this.onDefinition(cmd, response);
                        break;
                    case CommandType.Hover:
                        this.onHover(cmd, response);
                        break;
                    case CommandType.Symbols:
                        this.onSymbols(cmd, response);
                        break;
                    case CommandType.Usages:
                        this.onUsages(cmd, response);
                        break;
                    case CommandType.Arguments:
                        this.onArguments(cmd, response);
                        break;
                    default:
                        break;
                }
                // Check if too many pending requets.
                this.checkQueueLength();
            });
        });
    }
    onCompletion(command, response) {
        let results = JediProxy.getProperty(response, 'results');
        results = Array.isArray(results) ? results : [];
        results.forEach(item => {
            // tslint:disable-next-line:no-any
            const originalType = item.type;
            item.type = getMappedVSCodeType(originalType);
            item.kind = getMappedVSCodeSymbol(originalType);
            item.rawType = getMappedVSCodeType(originalType);
        });
        const completionResult = {
            items: results,
            requestId: command.id
        };
        this.safeResolve(command, completionResult);
    }
    onDefinition(command, response) {
        // tslint:disable-next-line:no-any
        const defs = JediProxy.getProperty(response, 'results');
        const defResult = {
            requestId: command.id,
            definitions: []
        };
        if (defs.length > 0) {
            defResult.definitions = defs.map(def => {
                const originalType = def.type;
                return {
                    fileName: def.fileName,
                    text: def.text,
                    rawType: originalType,
                    type: getMappedVSCodeType(originalType),
                    kind: getMappedVSCodeSymbol(originalType),
                    container: def.container,
                    range: {
                        startLine: def.range.start_line,
                        startColumn: def.range.start_column,
                        endLine: def.range.end_line,
                        endColumn: def.range.end_column
                    }
                };
            });
        }
        this.safeResolve(command, defResult);
    }
    onHover(command, response) {
        // tslint:disable-next-line:no-any
        const defs = JediProxy.getProperty(response, 'results');
        const defResult = {
            requestId: command.id,
            items: defs.map(def => {
                return {
                    kind: getMappedVSCodeSymbol(def.type),
                    description: def.description,
                    signature: def.signature,
                    docstring: def.docstring,
                    text: def.text
                };
            })
        };
        this.safeResolve(command, defResult);
    }
    onSymbols(command, response) {
        // tslint:disable-next-line:no-any
        let defs = JediProxy.getProperty(response, 'results');
        defs = Array.isArray(defs) ? defs : [];
        const defResults = {
            requestId: command.id,
            definitions: []
        };
        defResults.definitions = defs.map(def => {
            const originalType = def.type;
            return {
                fileName: def.fileName,
                text: def.text,
                rawType: originalType,
                type: getMappedVSCodeType(originalType),
                kind: getMappedVSCodeSymbol(originalType),
                container: def.container,
                range: {
                    startLine: def.range.start_line,
                    startColumn: def.range.start_column,
                    endLine: def.range.end_line,
                    endColumn: def.range.end_column
                }
            };
        });
        this.safeResolve(command, defResults);
    }
    onUsages(command, response) {
        // tslint:disable-next-line:no-any
        let defs = JediProxy.getProperty(response, 'results');
        defs = Array.isArray(defs) ? defs : [];
        const refResult = {
            requestId: command.id,
            references: defs.map(item => {
                return {
                    columnIndex: item.column,
                    fileName: item.fileName,
                    lineIndex: item.line - 1,
                    moduleName: item.moduleName,
                    name: item.name
                };
            })
        };
        this.safeResolve(command, refResult);
    }
    onArguments(command, response) {
        // tslint:disable-next-line:no-any
        const defs = JediProxy.getProperty(response, 'results');
        this.safeResolve(command, {
            requestId: command.id,
            definitions: defs
        });
    }
    checkQueueLength() {
        if (this.commandQueue.length > 10) {
            const items = this.commandQueue.splice(0, this.commandQueue.length - 10);
            items.forEach(id => {
                if (this.commands.has(id)) {
                    const cmd1 = this.commands.get(id);
                    try {
                        this.safeResolve(cmd1, undefined);
                        // tslint:disable-next-line:no-empty
                    }
                    catch (ex) {
                    }
                    finally {
                        this.commands.delete(id);
                    }
                }
            });
        }
    }
    // tslint:disable-next-line:no-any
    createPayload(cmd) {
        const payload = {
            id: cmd.id,
            prefix: '',
            lookup: commandNames.get(cmd.command),
            path: cmd.fileName,
            source: cmd.source,
            line: cmd.lineIndex,
            column: cmd.columnIndex,
            config: this.getConfig()
        };
        if (cmd.command === CommandType.Symbols) {
            delete payload.column;
            delete payload.line;
        }
        return payload;
    }
    getPathFromPythonCommand(args) {
        return utils_1.execPythonFile(this.workspacePath, this.pythonSettings.pythonPath, args, this.workspacePath).then(stdout => {
            if (stdout.length === 0) {
                return '';
            }
            const lines = stdout.split(/\r?\n/g).filter(line => line.length > 0);
            return utils_1.validatePath(lines[0]);
        }).catch(() => {
            return '';
        });
    }
    onConfigChanged() {
        // We're only interested in changes to the python path.
        if (this.lastKnownPythonPath === this.pythonSettings.pythonPath) {
            return;
        }
        this.lastKnownPythonPath = this.pythonSettings.pythonPath;
        const filePaths = [
            // Sysprefix.
            this.getPathFromPythonCommand(['-c', 'import sys;print(sys.prefix)']),
            // exeucutable path.
            this.getPathFromPythonCommand(['-c', 'import sys;print(sys.executable)']),
            // Python specific site packages.
            this.getPathFromPythonCommand(['-c', 'from distutils.sysconfig import get_python_lib; print(get_python_lib())']),
            // Python global site packages, as a fallback in case user hasn't installed them in custom environment.
            this.getPathFromPythonCommand(['-m', 'site', '--user-site'])
        ];
        let PYTHONPATH = JediProxy.getProperty(process.env, 'PYTHONPATH');
        if (typeof PYTHONPATH !== 'string') {
            PYTHONPATH = '';
        }
        const customEnvironmentVars = utils_1.getCustomEnvVarsSync(vscode.Uri.file(this.pythonProcessCWD));
        if (customEnvironmentVars && JediProxy.getProperty(customEnvironmentVars, 'PYTHONPATH')) {
            let PYTHONPATHFromEnvFile = JediProxy.getProperty(customEnvironmentVars, 'PYTHONPATH');
            if (!path.isAbsolute(PYTHONPATHFromEnvFile) && this.workspacePath === 'string') {
                PYTHONPATHFromEnvFile = path.resolve(this.workspacePath, PYTHONPATHFromEnvFile);
            }
            PYTHONPATH += `${(PYTHONPATH.length > 0 ? +path.delimiter : '')}${PYTHONPATHFromEnvFile}`;
        }
        if (typeof PYTHONPATH === 'string' && PYTHONPATH.length > 0) {
            filePaths.push(Promise.resolve(PYTHONPATH.trim()));
        }
        Promise.all(filePaths)
            .then(paths => {
            // Last item return a path, we need only the folder.
            if (paths[1].length > 0) {
                paths[1] = path.dirname(paths[1]);
            }
            // On windows we also need the libs path (second item will return c:\xxx\lib\site-packages).
            // This is returned by "from distutils.sysconfig import get_python_lib; print(get_python_lib())".
            if (IS_WINDOWS && paths[2].length > 0) {
                paths.splice(3, 0, path.join(paths[2], '..'));
            }
            this.additionalAutoCopletePaths = paths.filter(p => p.length > 0);
        })
            .catch(ex => console.error('Python Extension: jediProxy.filePaths', ex));
    }
    getConfig() {
        // Add support for paths relative to workspace.
        const extraPaths = this.pythonSettings.autoComplete.extraPaths.map(extraPath => {
            if (path.isAbsolute(extraPath)) {
                return extraPath;
            }
            if (typeof this.workspacePath !== 'string') {
                return '';
            }
            return path.join(this.workspacePath, extraPath);
        });
        // Always add workspace path into extra paths.
        if (typeof this.workspacePath === 'string') {
            extraPaths.unshift(this.workspacePath);
        }
        const distinctExtraPaths = extraPaths.concat(this.additionalAutoCopletePaths)
            .filter(value => value.length > 0)
            .filter((value, index, self) => self.indexOf(value) === index);
        return {
            extraPaths: distinctExtraPaths,
            useSnippets: false,
            caseInsensitiveCompletion: true,
            showDescriptions: true,
            fuzzyMatcher: true
        };
    }
    safeResolve(command, result) {
        if (command && command.deferred) {
            command.deferred.resolve(result);
        }
    }
}
exports.JediProxy = JediProxy;
class JediProxyHandler {
    constructor(jediProxy) {
        this.jediProxy = jediProxy;
        this.commandCancellationTokenSources = new Map();
    }
    get JediProxy() {
        return this.jediProxy;
    }
    dispose() {
        if (this.jediProxy) {
            this.jediProxy.dispose();
        }
    }
    sendCommand(cmd, token) {
        const executionCmd = cmd;
        executionCmd.id = executionCmd.id || this.jediProxy.getNextCommandId();
        if (this.commandCancellationTokenSources.has(cmd.command)) {
            const ct = this.commandCancellationTokenSources.get(cmd.command);
            if (ct) {
                ct.cancel();
            }
        }
        const cancellation = new vscode.CancellationTokenSource();
        this.commandCancellationTokenSources.set(cmd.command, cancellation);
        executionCmd.token = cancellation.token;
        return this.jediProxy.sendCommand(executionCmd)
            .catch(reason => {
            console.error(reason);
            return undefined;
        });
    }
    sendCommandNonCancellableCommand(cmd, token) {
        const executionCmd = cmd;
        executionCmd.id = executionCmd.id || this.jediProxy.getNextCommandId();
        if (token) {
            executionCmd.token = token;
        }
        return this.jediProxy.sendCommand(executionCmd)
            .catch(reason => {
            console.error(reason);
            return undefined;
        });
    }
}
exports.JediProxyHandler = JediProxyHandler;
//# sourceMappingURL=jediProxy.js.map
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
// tslint:disable: no-any one-line no-suspicious-comment prefer-template prefer-const no-unnecessary-callback-wrapper no-function-expression no-string-literal no-control-regex no-shadowed-variable
// TODO: Cleanup this place
// Add options for execPythonFile
const child_process = require("child_process");
const fs = require("fs");
const fsExtra = require("fs-extra");
const os = require("os");
const path = require("path");
const vscode_1 = require("vscode");
const settings = require("./configSettings");
const envFileParser_1 = require("./envFileParser");
const helpers_1 = require("./helpers");
const interpreterInfoCache_1 = require("./interpreterInfoCache");
exports.IS_WINDOWS = /^win/.test(process.platform);
exports.Is_64Bit = os.arch() === 'x64';
exports.PATH_VARIABLE_NAME = exports.IS_WINDOWS ? 'Path' : 'PATH';
const PathValidity = new Map();
function validatePath(filePath) {
    if (filePath.length === 0) {
        return Promise.resolve('');
    }
    if (PathValidity.has(filePath)) {
        return Promise.resolve(PathValidity.get(filePath) ? filePath : '');
    }
    return new Promise(resolve => {
        fs.exists(filePath, exists => {
            PathValidity.set(filePath, exists);
            return resolve(exists ? filePath : '');
        });
    });
}
exports.validatePath = validatePath;
function fsExistsAsync(filePath) {
    return new Promise(resolve => {
        fs.exists(filePath, exists => {
            PathValidity.set(filePath, exists);
            return resolve(exists);
        });
    });
}
exports.fsExistsAsync = fsExistsAsync;
function fsReaddirAsync(root) {
    return new Promise(resolve => {
        // Now look for Interpreters in this directory
        fs.readdir(root, (err, subDirs) => {
            if (err) {
                return resolve([]);
            }
            resolve(subDirs.map(subDir => path.join(root, subDir)));
        });
    });
}
exports.fsReaddirAsync = fsReaddirAsync;
function getPythonInterpreterDirectory(resource) {
    return __awaiter(this, void 0, void 0, function* () {
        const cache = interpreterInfoCache_1.InterpreterInfoCache.get(resource);
        const pythonFileName = settings.PythonSettings.getInstance(resource).pythonPath;
        // If we already have it and the python path hasn't changed, yay
        if (cache.pythonInterpreterDirectory && cache.pythonInterpreterDirectory.length > 0
            && cache.pythonSettingsPath === pythonFileName) {
            return cache.pythonInterpreterDirectory;
        }
        // Check if we have the path
        if (path.basename(pythonFileName) === pythonFileName) {
            try {
                const pythonInterpreterPath = yield getPathFromPythonCommand(pythonFileName);
                const pythonInterpreterDirectory = path.dirname(pythonInterpreterPath);
                interpreterInfoCache_1.InterpreterInfoCache.setPaths(resource, pythonFileName, pythonInterpreterPath, pythonInterpreterDirectory);
                return pythonInterpreterDirectory;
                // tslint:disable-next-line:variable-name
            }
            catch (_ex) {
                interpreterInfoCache_1.InterpreterInfoCache.setPaths(resource, pythonFileName, pythonFileName, '');
                return '';
            }
        }
        return new Promise(resolve => {
            // If we can execute the python, then get the path from the fully qualified name
            child_process.execFile(pythonFileName, ['-c', 'print(1234)'], (error, stdout, stderr) => {
                // Yes this is a valid python path
                if (stdout.startsWith('1234')) {
                    const pythonInterpreterDirectory = path.dirname(pythonFileName);
                    interpreterInfoCache_1.InterpreterInfoCache.setPaths(resource, pythonFileName, pythonFileName, pythonInterpreterDirectory);
                    resolve(pythonInterpreterDirectory);
                }
                else {
                    // No idea, didn't work, hence don't reject, but return empty path
                    interpreterInfoCache_1.InterpreterInfoCache.setPaths(resource, pythonFileName, pythonFileName, '');
                    resolve('');
                }
            });
        });
    });
}
function getFullyQualifiedPythonInterpreterPath(resource) {
    return __awaiter(this, void 0, void 0, function* () {
        const pyDir = yield getPythonInterpreterDirectory(resource);
        const cache = interpreterInfoCache_1.InterpreterInfoCache.get(resource);
        return cache.pythonInterpreterPath;
    });
}
exports.getFullyQualifiedPythonInterpreterPath = getFullyQualifiedPythonInterpreterPath;
function getPathFromPythonCommand(pythonPath) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield new Promise((resolve, reject) => {
            child_process.execFile(pythonPath, ['-c', 'import sys;print(sys.executable)'], (_, stdout) => {
                if (stdout) {
                    const lines = stdout.split(/\r?\n/g).map(line => line.trim()).filter(line => line.length > 0);
                    resolve(lines.length > 0 ? lines[0] : '');
                }
                else {
                    reject();
                }
            });
        });
    });
}
exports.getPathFromPythonCommand = getPathFromPythonCommand;
function getEnvVariables(resource) {
    return __awaiter(this, void 0, void 0, function* () {
        const cache = interpreterInfoCache_1.InterpreterInfoCache.get(resource);
        if (cache.customEnvVariables) {
            return cache.customEnvVariables;
        }
        const pyPath = yield getPythonInterpreterDirectory(resource);
        let customEnvVariables = (yield getCustomEnvVars(resource)) || {};
        if (pyPath.length > 0) {
            // Ensure to include the path of the current python.
            let newPath = '';
            const currentPath = typeof customEnvVariables[exports.PATH_VARIABLE_NAME] === 'string' ? customEnvVariables[exports.PATH_VARIABLE_NAME] : process.env[exports.PATH_VARIABLE_NAME];
            if (exports.IS_WINDOWS) {
                newPath = `${pyPath}\\${path.delimiter}${path.join(pyPath, 'Scripts\\')}${path.delimiter}${currentPath}`;
                // This needs to be done for windows.
                process.env[exports.PATH_VARIABLE_NAME] = newPath;
            }
            else {
                newPath = `${pyPath}${path.delimiter}${currentPath}`;
            }
            customEnvVariables = envFileParser_1.mergeEnvVariables(customEnvVariables, process.env);
            customEnvVariables[exports.PATH_VARIABLE_NAME] = newPath;
        }
        interpreterInfoCache_1.InterpreterInfoCache.setCustomEnvVariables(resource, customEnvVariables);
        return customEnvVariables;
    });
}
function execPythonFile(resource, file, args, cwd, includeErrorAsResponse = false, stdOut = null, token) {
    return __awaiter(this, void 0, void 0, function* () {
        const resourceUri = typeof resource === 'string' ? vscode_1.Uri.file(resource) : resource;
        const env = yield getEnvVariables(resourceUri);
        const options = { cwd, env };
        if (stdOut) {
            return spawnFileInternal(file, args, options, includeErrorAsResponse, stdOut, token);
        }
        const fileIsPythonInterpreter = (file.toUpperCase() === 'PYTHON' || file === settings.PythonSettings.getInstance(resourceUri).pythonPath);
        const execAsModule = fileIsPythonInterpreter && args.length > 0 && args[0] === '-m';
        if (execAsModule) {
            return getFullyQualifiedPythonInterpreterPath(resourceUri)
                .then(p => execPythonModule(p, args, options, includeErrorAsResponse, token));
        }
        return execFileInternal(file, args, options, includeErrorAsResponse, token);
    });
}
exports.execPythonFile = execPythonFile;
function handleResponse(file, includeErrorAsResponse, error, stdout, stderr, token) {
    if (token && token.isCancellationRequested) {
        return Promise.resolve(undefined);
    }
    if (helpers_1.isNotInstalledError(error)) {
        return Promise.reject(error);
    }
    // pylint:
    //      In the case of pylint we have some messages (such as config file not found and using default etc...) being returned in stderr
    //      These error messages are useless when using pylint
    if (includeErrorAsResponse && (stdout.length > 0 || stderr.length > 0)) {
        return Promise.resolve(stdout + '\n' + stderr);
    }
    let hasErrors = (error && error.message.length > 0) || (stderr && stderr.length > 0);
    if (hasErrors && (typeof stdout !== 'string' || stdout.length === 0)) {
        let errorMsg = (error && error.message) ? error.message : (stderr && stderr.length > 0 ? stderr + '' : '');
        return Promise.reject(errorMsg);
    }
    else {
        return Promise.resolve(stdout + '');
    }
}
function handlePythonModuleResponse(includeErrorAsResponse, error, stdout, stderr, token) {
    if (token && token.isCancellationRequested) {
        return Promise.resolve(undefined);
    }
    if (helpers_1.isNotInstalledError(error)) {
        return Promise.reject(error);
    }
    // pylint:
    //      In the case of pylint we have some messages (such as config file not found and using default etc...) being returned in stderr
    //      These error messages are useless when using pylint
    if (includeErrorAsResponse && (stdout.length > 0 || stderr.length > 0)) {
        return Promise.resolve(stdout + '\n' + stderr);
    }
    if (!includeErrorAsResponse && stderr.length > 0) {
        return Promise.reject(stderr);
    }
    return Promise.resolve(stdout + '');
}
function execPythonModule(file, args, options, includeErrorAsResponse, token) {
    options.maxBuffer = options.maxBuffer ? options.maxBuffer : 1024 * 102400;
    return new Promise((resolve, reject) => {
        let proc = child_process.execFile(file, args, options, (error, stdout, stderr) => {
            handlePythonModuleResponse(includeErrorAsResponse, error, stdout, stderr, token)
                .then(resolve)
                .catch(reject);
        });
        if (token && token.onCancellationRequested) {
            token.onCancellationRequested(() => {
                if (proc) {
                    proc.kill();
                    proc = null;
                }
            });
        }
    });
}
function execFileInternal(file, args, options, includeErrorAsResponse, token) {
    options.maxBuffer = options.maxBuffer ? options.maxBuffer : 1024 * 102400;
    return new Promise((resolve, reject) => {
        let proc = child_process.execFile(file, args, options, (error, stdout, stderr) => {
            handleResponse(file, includeErrorAsResponse, error, stdout, stderr, token)
                .then(data => resolve(data))
                .catch(err => reject(err));
        });
        if (token && token.onCancellationRequested) {
            token.onCancellationRequested(() => {
                if (proc) {
                    proc.kill();
                    proc = null;
                }
            });
        }
    });
}
function spawnFileInternal(file, args, options, includeErrorAsResponse, stdOut, token) {
    return new Promise((resolve, reject) => {
        options.env = options.env || {};
        options.env['PYTHONIOENCODING'] = 'UTF-8';
        let proc = child_process.spawn(file, args, options);
        let error = '';
        let exited = false;
        if (token && token.onCancellationRequested) {
            token.onCancellationRequested(() => {
                if (!exited && proc) {
                    proc.kill();
                    proc = null;
                }
            });
        }
        proc.on('error', error => {
            reject(error);
        });
        proc.stdout.setEncoding('utf8');
        proc.stderr.setEncoding('utf8');
        proc.stdout.on('data', function (data) {
            if (token && token.isCancellationRequested) {
                return;
            }
            stdOut(data);
        });
        proc.stderr.on('data', function (data) {
            if (token && token.isCancellationRequested) {
                return;
            }
            if (includeErrorAsResponse) {
                stdOut(data);
            }
            else {
                error += data;
            }
        });
        proc.on('exit', function (code) {
            exited = true;
            if (token && token.isCancellationRequested) {
                return reject();
            }
            if (error.length > 0) {
                return reject(error);
            }
            resolve();
        });
    });
}
function execInternal(command, args, options, includeErrorAsResponse) {
    return new Promise((resolve, reject) => {
        child_process.exec([command].concat(args).join(' '), options, (error, stdout, stderr) => {
            handleResponse(command, includeErrorAsResponse, error, stdout, stderr)
                .then(data => resolve(data))
                .catch(err => reject(err));
        });
    });
}
function formatErrorForLogging(error) {
    let message = '';
    if (typeof error === 'string') {
        message = error;
    }
    else {
        if (error.message) {
            message = `Error Message: ${error.message}`;
        }
        if (error.name && error.message.indexOf(error.name) === -1) {
            message += `, (${error.name})`;
        }
        const innerException = error.innerException;
        if (innerException && (innerException.message || innerException.name)) {
            if (innerException.message) {
                message += `, Inner Error Message: ${innerException.message}`;
            }
            if (innerException.name && innerException.message.indexOf(innerException.name) === -1) {
                message += `, (${innerException.name})`;
            }
        }
    }
    return message;
}
exports.formatErrorForLogging = formatErrorForLogging;
function getSubDirectories(rootDir) {
    return new Promise(resolve => {
        fs.readdir(rootDir, (error, files) => {
            if (error) {
                return resolve([]);
            }
            const subDirs = [];
            files.forEach(name => {
                const fullPath = path.join(rootDir, name);
                try {
                    if (fs.statSync(fullPath).isDirectory()) {
                        subDirs.push(fullPath);
                    }
                }
                catch (ex) {
                }
            });
            resolve(subDirs);
        });
    });
}
exports.getSubDirectories = getSubDirectories;
function getCustomEnvVars(resource) {
    return __awaiter(this, void 0, void 0, function* () {
        const envFile = settings.PythonSettings.getInstance(resource).envFile;
        if (typeof envFile !== 'string' || envFile.length === 0) {
            return null;
        }
        const exists = yield fsExtra.pathExists(envFile);
        if (!exists) {
            return null;
        }
        try {
            const vars = envFileParser_1.parseEnvFile(envFile);
            if (vars && typeof vars === 'object' && Object.keys(vars).length > 0) {
                return vars;
            }
        }
        catch (ex) {
            console.error('Failed to parse env file', ex);
        }
        return null;
    });
}
exports.getCustomEnvVars = getCustomEnvVars;
function getCustomEnvVarsSync(resource) {
    const envFile = settings.PythonSettings.getInstance(resource).envFile;
    if (typeof envFile !== 'string' || envFile.length === 0) {
        return null;
    }
    const exists = fsExtra.pathExistsSync(envFile);
    if (!exists) {
        return null;
    }
    try {
        const vars = envFileParser_1.parseEnvFile(envFile);
        if (vars && typeof vars === 'object' && Object.keys(vars).length > 0) {
            return vars;
        }
    }
    catch (ex) {
        console.error('Failed to parse env file', ex);
    }
    return null;
}
exports.getCustomEnvVarsSync = getCustomEnvVarsSync;
function getWindowsLineEndingCount(document, offset) {
    const eolPattern = new RegExp('\r\n', 'g');
    const readBlock = 1024;
    let count = 0;
    let offsetDiff = offset.valueOf();
    // In order to prevent the one-time loading of large files from taking up too much memory
    for (let pos = 0; pos < offset; pos += readBlock) {
        let startAt = document.positionAt(pos);
        let endAt = null;
        if (offsetDiff >= readBlock) {
            endAt = document.positionAt(pos + readBlock);
            offsetDiff = offsetDiff - readBlock;
        }
        else {
            endAt = document.positionAt(pos + offsetDiff);
        }
        let text = document.getText(new vscode_1.Range(startAt, endAt));
        let cr = text.match(eolPattern);
        count += cr ? cr.length : 0;
    }
    return count;
}
exports.getWindowsLineEndingCount = getWindowsLineEndingCount;
function arePathsSame(path1, path2) {
    path1 = path.normalize(path1);
    path2 = path.normalize(path2);
    if (exports.IS_WINDOWS) {
        return path1.toUpperCase() === path2.toUpperCase();
    }
    else {
        return path1 === path2;
    }
}
exports.arePathsSame = arePathsSame;
function getInterpreterVersion(pythonPath) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield new Promise((resolve, reject) => {
            child_process.execFile(pythonPath, ['--version'], (error, stdout, stdErr) => {
                const out = (typeof stdErr === 'string' ? stdErr : '') + os.EOL + (typeof stdout === 'string' ? stdout : '');
                const lines = out.split(/\r?\n/g).map(line => line.trim()).filter(line => line.length > 0);
                resolve(lines.length > 0 ? lines[0] : '');
            });
        });
    });
}
exports.getInterpreterVersion = getInterpreterVersion;
//# sourceMappingURL=utils.js.map
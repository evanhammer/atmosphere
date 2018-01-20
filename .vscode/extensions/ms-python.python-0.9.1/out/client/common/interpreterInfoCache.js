"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const cache = new Map();
// tslint:disable-next-line:no-stateless-class
class InterpreterInfoCache {
    // tslint:disable-next-line:function-name
    static clear() {
        cache.clear();
    }
    // tslint:disable-next-line:function-name
    static get(resource) {
        const cacheKey = InterpreterInfoCache.getCacheKey(resource) || '';
        return cache.has(cacheKey) ? cache.get(cacheKey) : {};
    }
    // tslint:disable-next-line:function-name
    static setPaths(resource, pythonSettingsPath, pythonInterpreterPath, pythonInterpreterDirectory) {
        InterpreterInfoCache.setCacheData('pythonInterpreterDirectory', resource, pythonInterpreterDirectory);
        InterpreterInfoCache.setCacheData('pythonInterpreterPath', resource, pythonInterpreterPath);
        InterpreterInfoCache.setCacheData('pythonSettingsPath', resource, pythonSettingsPath);
    }
    // tslint:disable-next-line:no-any function-name
    static setCustomEnvVariables(resource, envVars) {
        // tslint:disable-next-line:no-any
        InterpreterInfoCache.setCacheData('customEnvVariables', resource, envVars);
    }
    // tslint:disable-next-line:no-any function-name
    static setCacheData(property, resource, value) {
        const cacheKey = InterpreterInfoCache.getCacheKey(resource) || '';
        // tslint:disable-next-line:prefer-type-cast
        const data = cache.has(cacheKey) ? cache.get(cacheKey) : {};
        data[property] = value;
        cache.set(cacheKey, data);
    }
    static getCacheKey(resource) {
        if (!Array.isArray(vscode_1.workspace.workspaceFolders) || vscode_1.workspace.workspaceFolders.length === 0) {
            return '';
        }
        if (!resource || vscode_1.workspace.workspaceFolders.length === 1) {
            return vscode_1.workspace.workspaceFolders[0].uri.fsPath;
        }
        const folder = vscode_1.workspace.getWorkspaceFolder(resource);
        return folder ? folder.uri.fsPath : '';
    }
}
exports.InterpreterInfoCache = InterpreterInfoCache;
//# sourceMappingURL=interpreterInfoCache.js.map
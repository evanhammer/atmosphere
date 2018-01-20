"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.INTERPRETER_LOCATOR_SERVICE = 'IInterpreterLocatorService';
exports.WINDOWS_REGISTRY_SERVICE = 'WindowsRegistryService';
exports.CONDA_ENV_FILE_SERVICE = 'CondaEnvFileService';
exports.CONDA_ENV_SERVICE = 'CondaEnvService';
exports.CURRENT_PATH_SERVICE = 'CurrentPathService';
exports.KNOWN_PATH_SERVICE = 'KnownPathsService';
exports.VIRTUAL_ENV_SERVICE = 'VirtualEnvService';
exports.IInterpreterVersionService = Symbol('IInterpreterVersionService');
exports.ICondaEnvironmentFile = Symbol('ICondaEnvironmentFile');
exports.IKnownSearchPathsForInterpreters = Symbol('IKnownSearchPathsForInterpreters');
exports.IKnownSearchPathsForVirtualEnvironments = Symbol('IKnownSearchPathsForVirtualEnvironments');
exports.IInterpreterLocatorService = Symbol('IInterpreterLocatorService');
exports.ICondaLocatorService = Symbol('ICondaLocatorService');
var InterpreterType;
(function (InterpreterType) {
    InterpreterType[InterpreterType["Unknown"] = 1] = "Unknown";
    InterpreterType[InterpreterType["Conda"] = 2] = "Conda";
    InterpreterType[InterpreterType["VirtualEnv"] = 4] = "VirtualEnv";
    InterpreterType[InterpreterType["VEnv"] = 8] = "VEnv";
})(InterpreterType = exports.InterpreterType || (exports.InterpreterType = {}));
//# sourceMappingURL=contracts.js.map
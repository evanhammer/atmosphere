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
const vscode_1 = require("vscode");
const telemetry_1 = require("../../telemetry");
const constants_1 = require("../../telemetry/constants");
const stopWatch_1 = require("../../telemetry/stopWatch");
class PythonPathUpdaterService {
    constructor(pythonPathSettingsUpdaterFactory, interpreterVersionService) {
        this.pythonPathSettingsUpdaterFactory = pythonPathSettingsUpdaterFactory;
        this.interpreterVersionService = interpreterVersionService;
    }
    updatePythonPath(pythonPath, configTarget, trigger, wkspace) {
        return __awaiter(this, void 0, void 0, function* () {
            const stopWatch = new stopWatch_1.StopWatch();
            const pythonPathUpdater = this.getPythonUpdaterService(configTarget, wkspace);
            let failed = false;
            try {
                yield pythonPathUpdater.updatePythonPath(path.normalize(pythonPath));
            }
            catch (reason) {
                failed = true;
                // tslint:disable-next-line:no-unsafe-any prefer-type-cast
                const message = reason && typeof reason.message === 'string' ? reason.message : '';
                vscode_1.window.showErrorMessage(`Failed to set 'pythonPath'. Error: ${message}`);
                console.error(reason);
            }
            // do not wait for this to complete
            this.sendTelemetry(stopWatch.elapsedTime, failed, trigger, pythonPath)
                .catch(ex => console.error('Python Extension: sendTelemetry', ex));
        });
    }
    sendTelemetry(duration, failed, trigger, pythonPath) {
        return __awaiter(this, void 0, void 0, function* () {
            const telemtryProperties = {
                failed, trigger
            };
            if (!failed) {
                const pyVersionPromise = this.interpreterVersionService.getVersion(pythonPath, '')
                    .then(pyVersion => pyVersion.length === 0 ? undefined : pyVersion);
                const pipVersionPromise = this.interpreterVersionService.getPipVersion(pythonPath)
                    .then(value => value.length === 0 ? undefined : value)
                    .catch(() => undefined);
                const versions = yield Promise.all([pyVersionPromise, pipVersionPromise]);
                if (versions[0]) {
                    telemtryProperties.version = versions[0];
                }
                if (versions[1]) {
                    telemtryProperties.pipVersion = versions[1];
                }
            }
            telemetry_1.sendTelemetryEvent(constants_1.PYTHON_INTERPRETER, duration, telemtryProperties);
        });
    }
    getPythonUpdaterService(configTarget, wkspace) {
        switch (configTarget) {
            case vscode_1.ConfigurationTarget.Global: {
                return this.pythonPathSettingsUpdaterFactory.getGlobalPythonPathConfigurationService();
            }
            case vscode_1.ConfigurationTarget.Workspace: {
                if (!wkspace) {
                    throw new Error('Workspace Uri not defined');
                }
                // tslint:disable-next-line:no-non-null-assertion
                return this.pythonPathSettingsUpdaterFactory.getWorkspacePythonPathConfigurationService(wkspace);
            }
            default: {
                if (!wkspace) {
                    throw new Error('Workspace Uri not defined');
                }
                // tslint:disable-next-line:no-non-null-assertion
                return this.pythonPathSettingsUpdaterFactory.getWorkspaceFolderPythonPathConfigurationService(wkspace);
            }
        }
    }
}
exports.PythonPathUpdaterService = PythonPathUpdaterService;
//# sourceMappingURL=pythonPathUpdaterService.js.map
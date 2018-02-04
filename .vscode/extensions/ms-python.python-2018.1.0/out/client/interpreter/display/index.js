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
const os_1 = require("os");
const path = require("path");
const configSettings_1 = require("../../common/configSettings");
const utils = require("../../common/utils");
const helpers_1 = require("../helpers");
// tslint:disable-next-line:completed-docs
class InterpreterDisplay {
    constructor(statusBar, interpreterService, virtualEnvMgr, versionProvider) {
        this.statusBar = statusBar;
        this.interpreterService = interpreterService;
        this.virtualEnvMgr = virtualEnvMgr;
        this.versionProvider = versionProvider;
        this.statusBar.command = 'python.setInterpreter';
    }
    dispose() {
        //
    }
    refresh() {
        return __awaiter(this, void 0, void 0, function* () {
            const wkspc = helpers_1.getActiveWorkspaceUri();
            yield this.updateDisplay(wkspc ? wkspc.folderUri : undefined);
        });
    }
    updateDisplay(resource) {
        return __awaiter(this, void 0, void 0, function* () {
            const interpreters = yield this.interpreterService.getInterpreters(resource);
            const interpreter = yield this.interpreterService.getActiveInterpreter(resource);
            const pythonPath = interpreter ? interpreter.path : configSettings_1.PythonSettings.getInstance(resource).pythonPath;
            this.statusBar.color = '';
            this.statusBar.tooltip = pythonPath;
            if (interpreter) {
                // tslint:disable-next-line:no-non-null-assertion
                this.statusBar.text = interpreter.displayName;
                if (interpreter.companyDisplayName) {
                    const toolTipSuffix = `${os_1.EOL}${interpreter.companyDisplayName}`;
                    this.statusBar.tooltip += toolTipSuffix;
                }
            }
            else {
                const defaultDisplayName = `${path.basename(pythonPath)} [Environment]`;
                yield Promise.all([
                    utils.fsExistsAsync(pythonPath),
                    this.versionProvider.getVersion(pythonPath, defaultDisplayName),
                    this.getVirtualEnvironmentName(pythonPath)
                ])
                    .then(([interpreterExists, displayName, virtualEnvName]) => {
                    const dislayNameSuffix = virtualEnvName.length > 0 ? ` (${virtualEnvName})` : '';
                    this.statusBar.text = `${displayName}${dislayNameSuffix}`;
                    if (!interpreterExists && displayName === defaultDisplayName && interpreters.length > 0) {
                        this.statusBar.color = 'yellow';
                        this.statusBar.text = '$(alert) Select Python Environment';
                    }
                });
            }
            this.statusBar.show();
        });
    }
    getVirtualEnvironmentName(pythonPath) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.virtualEnvMgr
                .detect(pythonPath)
                .then(env => env ? env.name : '');
        });
    }
}
exports.InterpreterDisplay = InterpreterDisplay;
//# sourceMappingURL=index.js.map
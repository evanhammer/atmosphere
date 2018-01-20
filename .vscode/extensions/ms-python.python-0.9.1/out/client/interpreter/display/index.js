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
const child_process = require("child_process");
const os_1 = require("os");
const path = require("path");
const configSettings_1 = require("../../common/configSettings");
const utils = require("../../common/utils");
const helpers_1 = require("../helpers");
// tslint:disable-next-line:completed-docs
class InterpreterDisplay {
    constructor(statusBar, interpreterLocator, virtualEnvMgr, versionProvider) {
        this.statusBar = statusBar;
        this.interpreterLocator = interpreterLocator;
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
            if (!wkspc) {
                return;
            }
            const pythonPath = yield this.getFullyQualifiedPathToInterpreter(configSettings_1.PythonSettings.getInstance(wkspc.folderUri).pythonPath);
            yield this.updateDisplay(pythonPath, wkspc.folderUri);
        });
    }
    getInterpreters(resource) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.interpreterLocator.getInterpreters(resource);
        });
    }
    updateDisplay(pythonPath, resource) {
        return __awaiter(this, void 0, void 0, function* () {
            const interpreters = yield this.getInterpreters(resource);
            const interpreter = interpreters.find(i => utils.arePathsSame(i.path, pythonPath));
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
    getFullyQualifiedPathToInterpreter(pythonPath) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise(resolve => {
                child_process.execFile(pythonPath, ['-c', 'import sys;print(sys.executable)'], (_, stdout) => {
                    resolve(helpers_1.getFirstNonEmptyLineFromMultilineString(stdout));
                });
            })
                .then(value => value.length === 0 ? pythonPath : value)
                .catch(() => pythonPath);
        });
    }
}
exports.InterpreterDisplay = InterpreterDisplay;
//# sourceMappingURL=index.js.map
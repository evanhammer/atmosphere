"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const configSettings_1 = require("../common/configSettings");
const constants_1 = require("../common/constants");
const utils_1 = require("../common/utils");
const telemetry_1 = require("../telemetry");
const constants_2 = require("../telemetry/constants");
class ReplProvider {
    constructor() {
        this.disposables = [];
        this.registerCommand();
    }
    dispose() {
        this.disposables.forEach(disposable => disposable.dispose());
    }
    registerCommand() {
        const disposable = vscode_1.commands.registerCommand(constants_1.Commands.Start_REPL, this.commandHandler, this);
        this.disposables.push(disposable);
    }
    commandHandler() {
        return __awaiter(this, void 0, void 0, function* () {
            const pythonPath = yield this.getPythonPath();
            if (!pythonPath) {
                return;
            }
            let pythonInterpreterPath;
            try {
                pythonInterpreterPath = yield utils_1.getPathFromPythonCommand(pythonPath).catch(() => pythonPath);
                // tslint:disable-next-line:variable-name
            }
            catch (_ex) {
                pythonInterpreterPath = pythonPath;
            }
            const term = vscode_1.window.createTerminal('Python', pythonInterpreterPath);
            term.show();
            this.disposables.push(term);
        });
    }
    getPythonPath() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!Array.isArray(vscode_1.workspace.workspaceFolders) || vscode_1.workspace.workspaceFolders.length === 0) {
                return configSettings_1.PythonSettings.getInstance().pythonPath;
            }
            if (vscode_1.workspace.workspaceFolders.length === 1) {
                return configSettings_1.PythonSettings.getInstance(vscode_1.workspace.workspaceFolders[0].uri).pythonPath;
            }
            // tslint:disable-next-line:no-any prefer-type-cast
            const workspaceFolder = yield vscode_1.window.showWorkspaceFolderPick({ placeHolder: 'Select a workspace' });
            return vscode_1.workspace ? configSettings_1.PythonSettings.getInstance(workspaceFolder.uri).pythonPath : undefined;
        });
    }
}
__decorate([
    telemetry_1.captureTelemetry(constants_2.REPL)
], ReplProvider.prototype, "commandHandler", null);
exports.ReplProvider = ReplProvider;
//# sourceMappingURL=replProvider.js.map
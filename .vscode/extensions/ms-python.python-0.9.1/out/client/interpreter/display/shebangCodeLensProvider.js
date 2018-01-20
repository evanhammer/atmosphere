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
const child_process = require("child_process");
const vscode = require("vscode");
const vscode_1 = require("vscode");
const settings = require("../../common/configSettings");
const utils_1 = require("../../common/utils");
const helpers_1 = require("../../interpreter/helpers");
class ShebangCodeLensProvider {
    constructor() {
        // tslint:disable-next-line:prefer-type-cast no-any
        this.onDidChangeCodeLenses = vscode.workspace.onDidChangeConfiguration;
    }
    // tslint:disable-next-line:function-name
    static detectShebang(document) {
        return __awaiter(this, void 0, void 0, function* () {
            const firstLine = document.lineAt(0);
            if (firstLine.isEmptyOrWhitespace) {
                return;
            }
            if (!firstLine.text.startsWith('#!')) {
                return;
            }
            const shebang = firstLine.text.substr(2).trim();
            const pythonPath = yield ShebangCodeLensProvider.getFullyQualifiedPathToInterpreter(shebang);
            return typeof pythonPath === 'string' && pythonPath.length > 0 ? pythonPath : undefined;
        });
    }
    static getFullyQualifiedPathToInterpreter(pythonPath) {
        return __awaiter(this, void 0, void 0, function* () {
            if (pythonPath.indexOf('bin/env ') >= 0 && !utils_1.IS_WINDOWS) {
                // In case we have pythonPath as '/usr/bin/env python'
                return new Promise(resolve => {
                    const command = child_process.exec(`${pythonPath} -c 'import sys;print(sys.executable)'`);
                    let result = '';
                    command.stdout.on('data', (data) => {
                        result += data.toString();
                    });
                    command.on('close', () => {
                        resolve(helpers_1.getFirstNonEmptyLineFromMultilineString(result));
                    });
                });
            }
            else {
                return new Promise(resolve => {
                    child_process.execFile(pythonPath, ['-c', 'import sys;print(sys.executable)'], (_, stdout) => {
                        resolve(helpers_1.getFirstNonEmptyLineFromMultilineString(stdout));
                    });
                });
            }
        });
    }
    provideCodeLenses(document, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const codeLenses = yield this.createShebangCodeLens(document);
            return Promise.resolve(codeLenses);
        });
    }
    createShebangCodeLens(document) {
        return __awaiter(this, void 0, void 0, function* () {
            const shebang = yield ShebangCodeLensProvider.detectShebang(document);
            const pythonPath = settings.PythonSettings.getInstance(document.uri).pythonPath;
            const resolvedPythonPath = yield ShebangCodeLensProvider.getFullyQualifiedPathToInterpreter(pythonPath);
            if (!shebang || shebang === resolvedPythonPath) {
                return [];
            }
            const firstLine = document.lineAt(0);
            const startOfShebang = new vscode.Position(0, 0);
            const endOfShebang = new vscode.Position(0, firstLine.text.length - 1);
            const shebangRange = new vscode.Range(startOfShebang, endOfShebang);
            const cmd = {
                command: 'python.setShebangInterpreter',
                title: 'Set as interpreter'
            };
            return [(new vscode_1.CodeLens(shebangRange, cmd))];
        });
    }
}
exports.ShebangCodeLensProvider = ShebangCodeLensProvider;
//# sourceMappingURL=shebangCodeLensProvider.js.map
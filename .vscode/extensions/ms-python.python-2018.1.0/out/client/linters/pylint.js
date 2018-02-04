"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
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
const types_1 = require("../common/platform/types");
const types_2 = require("../common/types");
const baseLinter_1 = require("./baseLinter");
class Pylint extends baseLinter_1.BaseLinter {
    constructor(outputChannel, serviceContainer) {
        super(types_2.Product.pylint, outputChannel, serviceContainer);
        this.fileSystem = serviceContainer.get(types_1.IFileSystem);
        this.platformService = serviceContainer.get(types_1.IPlatformService);
    }
    runLinter(document, cancellation) {
        return __awaiter(this, void 0, void 0, function* () {
            let minArgs = [];
            // Only use minimal checkers if
            //  a) there are no custom arguments and
            //  b) there is no pylintrc file
            const uri = document.uri;
            const settings = this.configService.getSettings(uri);
            if (settings.linting.pylintUseMinimalCheckers
                && this.info.linterArgs(uri).length === 0
                && !(yield Pylint.hasConfigurationFile(this.fileSystem, uri.fsPath, this.platformService))) {
                minArgs = [
                    '--disable=all',
                    '--enable=F,E,unreachable,duplicate-key,unnecessary-semicolon,global-variable-not-assigned,unused-variable,unused-wildcard-import,binary-op-exception,bad-format-string,anomalous-backslash-in-string,bad-open-mode'
                ];
            }
            const args = [
                '--msg-template=\'{line},{column},{category},{msg_id}:{msg}\'',
                '--reports=n',
                '--output-format=text',
                uri.fsPath
            ];
            const messages = yield this.run(minArgs.concat(args), document, cancellation);
            messages.forEach(msg => {
                msg.severity = this.parseMessagesSeverity(msg.type, this.pythonSettings.linting.pylintCategorySeverity);
            });
            return messages;
        });
    }
    // tslint:disable-next-line:member-ordering
    static hasConfigurationFile(fs, filePath, platformService) {
        return __awaiter(this, void 0, void 0, function* () {
            // https://pylint.readthedocs.io/en/latest/user_guide/run.html
            // https://github.com/PyCQA/pylint/blob/975e08148c0faa79958b459303c47be1a2e1500a/pylint/config.py
            // 1. pylintrc in the current working directory
            // 2. .pylintrc in the current working directory
            // 3. If the current working directory is in a Python module, Pylint searches
            //    up the hierarchy of Python modules until it finds a pylintrc file.
            //    This allows you to specify coding standards on a module by module basis.
            //    A directory is judged to be a Python module if it contains an __init__.py file.
            // 4. The file named by environment variable PYLINTRC
            // 5. if you have a home directory which isn’t /root:
            //      a) .pylintrc in your home directory
            //      b) .config/pylintrc in your home directory
            // 6. /etc/pylintrc
            if (process.env.PYLINTRC) {
                return true;
            }
            let dir = path.dirname(filePath);
            const pylintrc = 'pylintrc';
            const dotPylintrc = '.pylintrc';
            if ((yield fs.fileExistsAsync(path.join(dir, pylintrc))) || (yield fs.fileExistsAsync(path.join(dir, dotPylintrc)))) {
                return true;
            }
            let current = dir;
            let above = path.dirname(dir);
            do {
                if (!(yield fs.fileExistsAsync(path.join(current, '__init__.py')))) {
                    break;
                }
                if ((yield fs.fileExistsAsync(path.join(current, pylintrc))) || (yield fs.fileExistsAsync(path.join(current, dotPylintrc)))) {
                    return true;
                }
                current = above;
                above = path.dirname(above);
            } while (current !== above);
            dir = path.resolve('~');
            if (yield fs.fileExistsAsync(path.join(dir, dotPylintrc))) {
                return true;
            }
            if (yield fs.fileExistsAsync(path.join(dir, '.config', pylintrc))) {
                return true;
            }
            if (!platformService.isWindows) {
                if (yield fs.fileExistsAsync(path.join('/etc', pylintrc))) {
                    return true;
                }
            }
            return false;
        });
    }
}
exports.Pylint = Pylint;
//# sourceMappingURL=pylint.js.map
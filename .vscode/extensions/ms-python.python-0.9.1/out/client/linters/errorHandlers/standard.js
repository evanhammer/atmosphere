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
const vscode_1 = require("vscode");
const baseErrorHandler_1 = require("./baseErrorHandler");
class StandardErrorHandler extends baseErrorHandler_1.BaseErrorHandler {
    constructor(product, installer, helper, logger, outputChannel, serviceContainer) {
        super(product, installer, helper, logger, outputChannel, serviceContainer);
    }
    handleError(error, resource, execInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            if (typeof error === 'string' && error.indexOf('OSError: [Errno 2] No such file or directory: \'/') > 0) {
                return this.nextHandler ? this.nextHandler.handleError(error, resource, execInfo) : Promise.resolve(false);
            }
            const linterId = this.helper.translateToId(execInfo.product);
            this.logger.logError(`There was an error in running the linter ${linterId}`, error);
            this.outputChannel.appendLine(`Linting with ${linterId} failed.`);
            this.outputChannel.appendLine(error.toString());
            this.displayLinterError(linterId, resource);
            return true;
        });
    }
    displayLinterError(linterId, resource) {
        return __awaiter(this, void 0, void 0, function* () {
            const message = `There was an error in running the linter '${linterId}'`;
            const item = yield vscode_1.window.showErrorMessage(message, 'Disable linter', 'View Errors');
            switch (item) {
                case 'Disable linter': {
                    this.installer.disableLinter(this.product, resource)
                        .catch(this.logger.logError.bind(this, 'StandardErrorHandler.displayLinterError'));
                    break;
                }
                case 'View Errors': {
                    this.outputChannel.show();
                    break;
                }
                default: {
                    // Ignore this selection (e.g. user hit cancel).
                }
            }
        });
    }
}
exports.StandardErrorHandler = StandardErrorHandler;
//# sourceMappingURL=standard.js.map
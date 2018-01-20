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
const helpers_1 = require("../../common/helpers");
const types_1 = require("../../common/process/types");
const baseErrorHandler_1 = require("./baseErrorHandler");
class ModuleNotInstalledErrorHandler extends baseErrorHandler_1.BaseErrorHandler {
    constructor(product, installer, helper, logger, outputChannel, serviceContainer) {
        super(product, installer, helper, logger, outputChannel, serviceContainer);
    }
    handleError(error, resource, execInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!helpers_1.isNotInstalledError(error) || !execInfo.moduleName) {
                return this.nextHandler ? yield this.nextHandler.handleError(error, resource, execInfo) : false;
            }
            const pythonExecutionService = yield this.serviceContainer.get(types_1.IPythonExecutionFactory).create(resource);
            const isModuleInstalled = yield pythonExecutionService.isModuleInstalled(execInfo.moduleName);
            if (isModuleInstalled) {
                return this.nextHandler ? yield this.nextHandler.handleError(error, resource, execInfo) : false;
            }
            this.installer.promptToInstall(this.product, resource)
                .catch(this.logger.logError.bind(this, 'NotInstalledErrorHandler.promptToInstall'));
            const id = this.helper.translateToId(execInfo.product);
            const customError = `Linting with ${id} failed.\nYou could either install the '${id}' linter or turn it off in setings.json via "python.linting.${id}Enabled = false".`;
            this.outputChannel.appendLine(`\n${customError}\n${error}`);
            this.logger.logWarning(customError, error);
            return true;
        });
    }
}
exports.ModuleNotInstalledErrorHandler = ModuleNotInstalledErrorHandler;
//# sourceMappingURL=notInstalled.js.map
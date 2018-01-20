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
const types_1 = require("../common/types");
const baseLinter = require("./baseLinter");
const REGEX = '(?<file>.py):(?<line>\\d+): (?<type>\\w+): (?<message>.*)\\r?(\\n|$)';
class Linter extends baseLinter.BaseLinter {
    constructor(outputChannel, installer, helper, logger, serviceContainer) {
        super(types_1.Product.mypy, outputChannel, installer, helper, logger, serviceContainer);
    }
    runLinter(document, cancellation) {
        return __awaiter(this, void 0, void 0, function* () {
            const messages = yield this.run([document.uri.fsPath], document, cancellation, REGEX);
            messages.forEach(msg => {
                msg.severity = this.parseMessagesSeverity(msg.type, this.pythonSettings.linting.mypyCategorySeverity);
                msg.code = msg.type;
            });
            return messages;
        });
    }
}
exports.Linter = Linter;
//# sourceMappingURL=mypy.js.map
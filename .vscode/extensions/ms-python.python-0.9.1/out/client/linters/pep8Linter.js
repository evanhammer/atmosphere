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
const COLUMN_OFF_SET = 1;
class Linter extends baseLinter.BaseLinter {
    constructor(outputChannel, installer, helper, logger, serviceContainer) {
        super(types_1.Product.pep8, outputChannel, installer, helper, logger, serviceContainer, COLUMN_OFF_SET);
    }
    runLinter(document, cancellation) {
        return __awaiter(this, void 0, void 0, function* () {
            const messages = yield this.run(['--format=%(row)d,%(col)d,%(code).1s,%(code)s:%(text)s', document.uri.fsPath], document, cancellation);
            messages.forEach(msg => {
                msg.severity = this.parseMessagesSeverity(msg.type, this.pythonSettings.linting.pep8CategorySeverity);
            });
            return messages;
        });
    }
}
exports.Linter = Linter;
//# sourceMappingURL=pep8Linter.js.map
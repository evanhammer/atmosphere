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
class Linter extends baseLinter.BaseLinter {
    constructor(outputChannel, installer, helper, logger, serviceContainer) {
        super(types_1.Product.pylint, outputChannel, installer, helper, logger, serviceContainer);
    }
    runLinter(document, cancellation) {
        return __awaiter(this, void 0, void 0, function* () {
            const messages = yield this.run(['--msg-template=\'{line},{column},{category},{msg_id}:{msg}\'', '--reports=n', '--output-format=text', document.uri.fsPath], document, cancellation);
            messages.forEach(msg => {
                msg.severity = this.parseMessagesSeverity(msg.type, this.pythonSettings.linting.pylintCategorySeverity);
            });
            return messages;
        });
    }
}
exports.Linter = Linter;
//# sourceMappingURL=pylint.js.map
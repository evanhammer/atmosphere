"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const configSettings_1 = require("./../common/configSettings");
const autoPep8Formatter_1 = require("./../formatters/autoPep8Formatter");
const dummyFormatter_1 = require("./../formatters/dummyFormatter");
const yapfFormatter_1 = require("./../formatters/yapfFormatter");
class PythonFormattingEditProvider {
    constructor(context, serviceContainer) {
        this.formatters = new Map();
        const yapfFormatter = new yapfFormatter_1.YapfFormatter(serviceContainer);
        const autoPep8 = new autoPep8Formatter_1.AutoPep8Formatter(serviceContainer);
        const dummy = new dummyFormatter_1.DummyFormatter(serviceContainer);
        this.formatters.set(yapfFormatter.Id, yapfFormatter);
        this.formatters.set(autoPep8.Id, autoPep8);
        this.formatters.set(dummy.Id, dummy);
    }
    provideDocumentFormattingEdits(document, options, token) {
        return this.provideDocumentRangeFormattingEdits(document, undefined, options, token);
    }
    provideDocumentRangeFormattingEdits(document, range, options, token) {
        const settings = configSettings_1.PythonSettings.getInstance(document.uri);
        const formatter = this.formatters.get(settings.formatting.provider);
        return formatter.formatDocument(document, options, token, range);
    }
}
exports.PythonFormattingEditProvider = PythonFormattingEditProvider;
//# sourceMappingURL=formatProvider.js.map
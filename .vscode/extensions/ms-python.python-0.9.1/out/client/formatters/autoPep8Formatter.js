"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const configSettings_1 = require("../common/configSettings");
const installer_1 = require("../common/installer/installer");
const telemetry_1 = require("../telemetry");
const constants_1 = require("../telemetry/constants");
const stopWatch_1 = require("../telemetry/stopWatch");
const baseFormatter_1 = require("./baseFormatter");
class AutoPep8Formatter extends baseFormatter_1.BaseFormatter {
    constructor(serviceContainer) {
        super('autopep8', installer_1.Product.autopep8, serviceContainer);
    }
    formatDocument(document, options, token, range) {
        const stopWatch = new stopWatch_1.StopWatch();
        const settings = configSettings_1.PythonSettings.getInstance(document.uri);
        const autopep8Path = settings.formatting.autopep8Path;
        const autoPep8Args = Array.isArray(settings.formatting.autopep8Args) ? settings.formatting.autopep8Args : [];
        const hasCustomArgs = autoPep8Args.length > 0;
        const formatSelection = range ? !range.isEmpty : false;
        autoPep8Args.push('--diff');
        if (formatSelection) {
            // tslint:disable-next-line:no-non-null-assertion
            autoPep8Args.push(...['--line-range', (range.start.line + 1).toString(), (range.end.line + 1).toString()]);
        }
        const promise = super.provideDocumentFormattingEdits(document, options, token, autopep8Path, autoPep8Args);
        telemetry_1.sendTelemetryWhenDone(constants_1.FORMAT, promise, stopWatch, { tool: 'autoppep8', hasCustomArgs, formatSelection });
        return promise;
    }
}
exports.AutoPep8Formatter = AutoPep8Formatter;
//# sourceMappingURL=autoPep8Formatter.js.map
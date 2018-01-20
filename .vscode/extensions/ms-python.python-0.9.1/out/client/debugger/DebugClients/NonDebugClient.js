"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const DebugClient_1 = require("./DebugClient");
const LocalDebugClient_1 = require("./LocalDebugClient");
class NonDebugClient extends LocalDebugClient_1.LocalDebugClient {
    // tslint:disable-next-line:no-any
    constructor(args, debugSession, canLaunchTerminal) {
        super(args, debugSession, canLaunchTerminal);
    }
    get DebugType() {
        return DebugClient_1.DebugType.RunLocal;
    }
    Stop() {
        super.Stop();
        if (this.pyProc) {
            try {
                this.pyProc.kill();
                // tslint:disable-next-line:no-empty
            }
            catch (_a) { }
            this.pyProc = undefined;
        }
    }
    handleProcessOutput(proc, _failedToLaunch) {
        this.pythonProcess.attach(proc);
    }
    getLauncherFilePath() {
        const currentFileName = module.filename;
        const ptVSToolsPath = path.join(path.dirname(currentFileName), '..', '..', '..', '..', 'pythonFiles', 'PythonTools');
        return path.join(ptVSToolsPath, 'visualstudio_py_launcher_nodebug.py');
    }
}
exports.NonDebugClient = NonDebugClient;
//# sourceMappingURL=NonDebugClient.js.map
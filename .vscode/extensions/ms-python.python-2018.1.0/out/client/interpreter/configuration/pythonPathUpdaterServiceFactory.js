"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globalUpdaterService_1 = require("./services/globalUpdaterService");
const workspaceFolderUpdaterService_1 = require("./services/workspaceFolderUpdaterService");
const workspaceUpdaterService_1 = require("./services/workspaceUpdaterService");
class PythonPathUpdaterServiceFactory {
    getGlobalPythonPathConfigurationService() {
        return new globalUpdaterService_1.GlobalPythonPathUpdaterService();
    }
    getWorkspacePythonPathConfigurationService(wkspace) {
        return new workspaceUpdaterService_1.WorkspacePythonPathUpdaterService(wkspace);
    }
    getWorkspaceFolderPythonPathConfigurationService(workspaceFolder) {
        return new workspaceFolderUpdaterService_1.WorkspaceFolderPythonPathUpdaterService(workspaceFolder);
    }
}
exports.PythonPathUpdaterServiceFactory = PythonPathUpdaterServiceFactory;
//# sourceMappingURL=pythonPathUpdaterServiceFactory.js.map
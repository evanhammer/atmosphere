"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const condaInstaller_1 = require("./installer/condaInstaller");
const installer_1 = require("./installer/installer");
const pipInstaller_1 = require("./installer/pipInstaller");
const types_1 = require("./installer/types");
const logger_1 = require("./logger");
const persistentState_1 = require("./persistentState");
const constants_1 = require("./platform/constants");
const pathUtils_1 = require("./platform/pathUtils");
const registry_1 = require("./platform/registry");
const types_2 = require("./platform/types");
const service_1 = require("./terminal/service");
const types_3 = require("./terminal/types");
const types_4 = require("./types");
function registerTypes(serviceManager) {
    serviceManager.addSingletonInstance(types_4.IsWindows, constants_1.IS_WINDOWS);
    serviceManager.addSingletonInstance(types_4.Is64Bit, constants_1.IS_64_BIT);
    serviceManager.addSingleton(types_4.IPersistentStateFactory, persistentState_1.PersistentStateFactory);
    serviceManager.addSingleton(types_4.IInstaller, installer_1.Installer);
    serviceManager.addSingleton(types_1.IModuleInstaller, condaInstaller_1.CondaInstaller);
    serviceManager.addSingleton(types_1.IModuleInstaller, pipInstaller_1.PipInstaller);
    serviceManager.addSingleton(types_4.ILogger, logger_1.Logger);
    serviceManager.addSingleton(types_3.ITerminalService, service_1.TerminalService);
    serviceManager.addSingleton(types_4.IPathUtils, pathUtils_1.PathUtils);
    if (constants_1.IS_WINDOWS) {
        serviceManager.addSingleton(types_2.IRegistry, registry_1.RegistryImplementation);
    }
}
exports.registerTypes = registerTypes;
//# sourceMappingURL=serviceRegistry.js.map
"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("../common/types");
const contracts_1 = require("./contracts");
const interpreterVersion_1 = require("./interpreterVersion");
const index_1 = require("./locators/index");
const condaEnvFileService_1 = require("./locators/services/condaEnvFileService");
const condaEnvService_1 = require("./locators/services/condaEnvService");
const condaLocator_1 = require("./locators/services/condaLocator");
const currentPathService_1 = require("./locators/services/currentPathService");
const KnownPathsService_1 = require("./locators/services/KnownPathsService");
const virtualEnvService_1 = require("./locators/services/virtualEnvService");
const windowsRegistryService_1 = require("./locators/services/windowsRegistryService");
const index_2 = require("./virtualEnvs/index");
const types_2 = require("./virtualEnvs/types");
const venv_1 = require("./virtualEnvs/venv");
const virtualEnv_1 = require("./virtualEnvs/virtualEnv");
function registerTypes(serviceManager) {
    serviceManager.addSingletonInstance(contracts_1.ICondaEnvironmentFile, condaEnvFileService_1.getEnvironmentsFile());
    serviceManager.addSingletonInstance(contracts_1.IKnownSearchPathsForInterpreters, KnownPathsService_1.getKnownSearchPathsForInterpreters());
    serviceManager.addSingletonInstance(contracts_1.IKnownSearchPathsForVirtualEnvironments, virtualEnvService_1.getKnownSearchPathsForVirtualEnvs());
    serviceManager.addSingleton(contracts_1.ICondaLocatorService, condaLocator_1.CondaLocatorService);
    serviceManager.addSingleton(types_2.IVirtualEnvironmentIdentifier, virtualEnv_1.VirtualEnv);
    serviceManager.addSingleton(types_2.IVirtualEnvironmentIdentifier, venv_1.VEnv);
    serviceManager.addSingleton(types_2.IVirtualEnvironmentManager, index_2.VirtualEnvironmentManager);
    serviceManager.addSingleton(contracts_1.IInterpreterVersionService, interpreterVersion_1.InterpreterVersionService);
    serviceManager.addSingleton(contracts_1.IInterpreterLocatorService, index_1.PythonInterpreterLocatorService, contracts_1.INTERPRETER_LOCATOR_SERVICE);
    serviceManager.addSingleton(contracts_1.IInterpreterLocatorService, condaEnvFileService_1.CondaEnvFileService, contracts_1.CONDA_ENV_FILE_SERVICE);
    serviceManager.addSingleton(contracts_1.IInterpreterLocatorService, condaEnvService_1.CondaEnvService, contracts_1.CONDA_ENV_SERVICE);
    serviceManager.addSingleton(contracts_1.IInterpreterLocatorService, currentPathService_1.CurrentPathService, contracts_1.CURRENT_PATH_SERVICE);
    serviceManager.addSingleton(contracts_1.IInterpreterLocatorService, virtualEnvService_1.VirtualEnvService, contracts_1.VIRTUAL_ENV_SERVICE);
    const isWindows = serviceManager.get(types_1.IsWindows);
    if (isWindows) {
        serviceManager.addSingleton(contracts_1.IInterpreterLocatorService, windowsRegistryService_1.WindowsRegistryService, contracts_1.WINDOWS_REGISTRY_SERVICE);
    }
    else {
        serviceManager.addSingleton(contracts_1.IInterpreterLocatorService, KnownPathsService_1.KnownPathsService, contracts_1.KNOWN_PATH_SERVICE);
    }
}
exports.registerTypes = registerTypes;
//# sourceMappingURL=serviceRegistry.js.map
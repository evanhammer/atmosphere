// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const condaInstaller_1 = require("./condaInstaller");
const pipInstaller_1 = require("./pipInstaller");
const types_1 = require("./types");
function registerTypes(serviceManager) {
    serviceManager.addSingleton(types_1.IModuleInstaller, condaInstaller_1.CondaInstaller);
    serviceManager.addSingleton(types_1.IModuleInstaller, pipInstaller_1.PipInstaller);
}
exports.registerTypes = registerTypes;
//# sourceMappingURL=serviceRegistry.js.map
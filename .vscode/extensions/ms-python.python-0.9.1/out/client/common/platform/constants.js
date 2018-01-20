"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const os = require("os");
exports.WINDOWS_PATH_VARIABLE_NAME = 'Path';
exports.NON_WINDOWS_PATH_VARIABLE_NAME = 'PATH';
exports.IS_WINDOWS = /^win/.test(process.platform);
exports.IS_64_BIT = os.arch() === 'x64';
//# sourceMappingURL=constants.js.map
"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
class BaseErrorHandler {
    constructor(product, installer, helper, logger, outputChannel, serviceContainer) {
        this.product = product;
        this.installer = installer;
        this.helper = helper;
        this.logger = logger;
        this.outputChannel = outputChannel;
        this.serviceContainer = serviceContainer;
    }
    get nextHandler() {
        return this.handler;
    }
    setNextHandler(handler) {
        this.handler = handler;
    }
}
exports.BaseErrorHandler = BaseErrorHandler;
//# sourceMappingURL=baseErrorHandler.js.map
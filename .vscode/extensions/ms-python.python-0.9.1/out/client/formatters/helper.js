"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const types_1 = require("../common/types");
let FormatterHelper = class FormatterHelper {
    translateToId(formatter) {
        switch (formatter) {
            case types_1.Product.autopep8: return 'autopep8';
            case types_1.Product.yapf: return 'yapf';
            default: {
                throw new Error(`Unrecognized Formatter '${formatter}'`);
            }
        }
    }
    getSettingsPropertyNames(formatter) {
        const id = this.translateToId(formatter);
        return {
            argsName: `${id}Args`,
            pathName: `${id}Path`
        };
    }
};
FormatterHelper = __decorate([
    inversify_1.injectable()
], FormatterHelper);
exports.FormatterHelper = FormatterHelper;
//# sourceMappingURL=helper.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const inversify_1 = require("inversify");
const path = require("path");
const configSettings_1 = require("../common/configSettings");
const types_1 = require("../common/types");
let LinterHelper = class LinterHelper {
    constructor() {
        this.linterIdMapping = new Map();
        this.linterIdMapping.set(types_1.Product.flake8, 'flake8');
        this.linterIdMapping.set(types_1.Product.mypy, 'mypy');
        this.linterIdMapping.set(types_1.Product.pep8, 'pep8');
        this.linterIdMapping.set(types_1.Product.prospector, 'prospector');
        this.linterIdMapping.set(types_1.Product.pydocstyle, 'pydocstyle');
        this.linterIdMapping.set(types_1.Product.pylama, 'pylama');
        this.linterIdMapping.set(types_1.Product.pylint, 'pylint');
    }
    getExecutionInfo(linter, customArgs, resource) {
        const settings = configSettings_1.PythonSettings.getInstance(resource);
        const names = this.getSettingsPropertyNames(linter);
        const execPath = settings.linting[names.pathName];
        let args = Array.isArray(settings.linting[names.argsName]) ? settings.linting[names.argsName] : [];
        args = args.concat(customArgs);
        let moduleName;
        // If path information is not available, then treat it as a module,
        // Except for prospector as that needs to be run as an executable (its a python package).
        if (path.basename(execPath) === execPath && linter !== types_1.Product.prospector) {
            moduleName = execPath;
        }
        return { execPath, moduleName, args };
    }
    translateToId(linter) {
        if (this.linterIdMapping.has(linter)) {
            return this.linterIdMapping.get(linter);
        }
        throw new Error('Invalid linter');
    }
    getSettingsPropertyNames(linter) {
        const id = this.translateToId(linter);
        return {
            argsName: `${id}Args`,
            pathName: `${id}Path`,
            enabledName: `${id}Enabled`
        };
    }
};
LinterHelper = __decorate([
    inversify_1.injectable()
], LinterHelper);
exports.LinterHelper = LinterHelper;
//# sourceMappingURL=helper.js.map
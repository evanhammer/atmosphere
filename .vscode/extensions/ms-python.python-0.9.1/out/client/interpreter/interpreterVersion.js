"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process = require("child_process");
const inversify_1 = require("inversify");
const utils_1 = require("../common/utils");
const PIP_VERSION_REGEX = '\\d\\.\\d(\\.\\d)+';
let InterpreterVersionService = class InterpreterVersionService {
    getVersion(pythonPath, defaultValue) {
        return __awaiter(this, void 0, void 0, function* () {
            return utils_1.getInterpreterVersion(pythonPath)
                .then(version => version.length === 0 ? defaultValue : version)
                .catch(() => defaultValue);
        });
    }
    getPipVersion(pythonPath) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                child_process.execFile(pythonPath, ['-m', 'pip', '--version'], (error, stdout, stdErr) => {
                    if (stdout && stdout.length > 0) {
                        // Take the first available version number, see below example.
                        // pip 9.0.1 from /Users/donjayamanne/anaconda3/lib/python3.6/site-packages (python 3.6).
                        // Take the second part, see below example.
                        // pip 9.0.1 from /Users/donjayamanne/anaconda3/lib/python3.6/site-packages (python 3.6).
                        const re = new RegExp(PIP_VERSION_REGEX, 'g');
                        const matches = re.exec(stdout);
                        if (matches && matches.length > 0) {
                            resolve(matches[0].trim());
                            return;
                        }
                    }
                    reject();
                });
            });
        });
    }
};
InterpreterVersionService = __decorate([
    inversify_1.injectable()
], InterpreterVersionService);
exports.InterpreterVersionService = InterpreterVersionService;
//# sourceMappingURL=interpreterVersion.js.map
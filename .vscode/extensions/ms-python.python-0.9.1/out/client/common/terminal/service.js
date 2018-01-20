"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
const inversify_1 = require("inversify");
const vscode_1 = require("vscode");
const types_1 = require("../../ioc/types");
const types_2 = require("../types");
const IS_POWERSHELL = /powershell.exe$/i;
let TerminalService = class TerminalService {
    constructor(serviceContainer) {
        this.serviceContainer = serviceContainer;
        this.textPreviouslySentToTerminal = false;
    }
    sendCommand(command, args) {
        return __awaiter(this, void 0, void 0, function* () {
            const text = this.buildTerminalText(command, args);
            const term = yield this.getTerminal();
            term.show(false);
            term.sendText(text, true);
            this.textPreviouslySentToTerminal = true;
        });
    }
    getTerminal() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.terminal) {
                return this.terminal;
            }
            this.terminal = vscode_1.window.createTerminal('Python');
            this.terminal.show(false);
            // Sometimes the terminal takes some time to start up before it can start accepting input.
            // However if we have already sent text to the terminal, then no need to wait.
            if (!this.textPreviouslySentToTerminal) {
                yield new Promise(resolve => setTimeout(resolve, 1000));
            }
            const handler = vscode_1.window.onDidCloseTerminal((term) => {
                if (term === this.terminal) {
                    this.terminal = undefined;
                }
            });
            const disposables = this.serviceContainer.get(types_2.IDisposableRegistry);
            disposables.push(this.terminal);
            disposables.push(handler);
            return this.terminal;
        });
    }
    buildTerminalText(command, args) {
        const executable = command.indexOf(' ') ? `"${command}"` : command;
        const commandPrefix = this.terminalIsPowershell() ? '& ' : '';
        return `${commandPrefix}${executable} ${args.join(' ')}`.trim();
    }
    terminalIsPowershell(resource) {
        const isWindows = this.serviceContainer.get(types_2.IsWindows);
        if (!isWindows) {
            return false;
        }
        // tslint:disable-next-line:no-backbone-get-set-outside-model
        const terminalName = vscode_1.workspace.getConfiguration('terminal.integrated.shell', resource).get('windows');
        return typeof terminalName === 'string' && IS_POWERSHELL.test(terminalName);
    }
};
TerminalService = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_1.IServiceContainer))
], TerminalService);
exports.TerminalService = TerminalService;
//# sourceMappingURL=service.js.map
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
const vscode = require("vscode");
const vscode_1 = require("vscode");
const globals_1 = require("../globals");
const taskQueue_1 = require("../taskQueue");
const notation_1 = require("./notation");
const packagejson = require('../../../package.json');
/**
 * Every Vim option we support should
 * 1. Be added to contribution section of `package.json`.
 * 2. Named as `vim.{optionName}`, `optionName` is the name we use in Vim.
 * 3. Define a public property in `Configuration` with the same name and a default value.
 *    Or define a private property and define customized Getter/Setter accessors for it.
 *    Always remember to decorate Getter accessor as @enumerable()
 * 4. If user doesn't set the option explicitly
 *    a. we don't have a similar setting in Code, initialize the option as default value.
 *    b. we have a similar setting in Code, use Code's setting.
 *
 * Vim option override sequence.
 * 1. `:set {option}` on the fly
 * 2. TODO .vimrc.
 * 3. `vim.{option}`
 * 4. VS Code configuration
 * 5. VSCodeVim flavored Vim option default values
 *
 */
class ConfigurationClass {
    constructor() {
        /**
         * Delegate certain key combinations back to VSCode to be handled natively
         */
        this.handleKeys = [];
        /**
         * Use the system's clipboard when copying.
         */
        this.useSystemClipboard = false;
        /**
         * Enable ctrl- actions that would override existing VSCode actions.
         */
        this.useCtrlKeys = false;
        /**
         * Override default VSCode copy behavior.
         */
        this.overrideCopy = true;
        /**
         * Width in characters to word-wrap to.
         */
        this.textwidth = 80;
        /**
         * Should we highlight incremental search matches?
         */
        this.hlsearch = false;
        /**
         * Ignore case when searching with / or ?.
         */
        this.ignorecase = true;
        /**
         * In / or ?, default to ignorecase=true unless the user types a capital
         * letter.
         */
        this.smartcase = true;
        /**
         * Indent automatically?
         */
        this.autoindent = true;
        /**
         * Use EasyMotion plugin?
         */
        this.easymotion = false;
        /**
         * Use surround plugin?
         */
        this.surround = true;
        /**
         * Easymotion marker appearance settings
         */
        this.easymotionMarkerBackgroundColor = '';
        this.easymotionMarkerForegroundColorOneChar = '#ff0000';
        this.easymotionMarkerForegroundColorTwoChar = '#ffa500';
        this.easymotionMarkerWidthPerChar = 8;
        this.easymotionMarkerHeight = 14;
        this.easymotionMarkerFontFamily = 'Consolas';
        this.easymotionMarkerFontSize = '14';
        this.easymotionMarkerFontWeight = 'normal';
        this.easymotionMarkerYOffset = 0;
        this.easymotionKeys = 'hklyuiopnm,qwertzxcvbasdgjf;';
        /**
         * Timeout in milliseconds for remapped commands.
         */
        this.timeout = 1000;
        /**
         * Display partial commands on status bar?
         */
        this.showcmd = true;
        /**
         * Display mode name text on status bar?
         */
        this.showmodename = true;
        /**
         * What key should <leader> map to in key remappings?
         */
        this.leaderDefault = '\\';
        this.leader = this.leaderDefault;
        /**
         * How much search or command history should be remembered
         */
        this.history = 50;
        /**
         * Show results of / or ? search as user is typing?
         */
        this.incsearch = true;
        /**
         * Start in insert mode?
         */
        this.startInInsertMode = false;
        /**
         * Enable changing of the status bar color based on mode
         */
        this.statusBarColorControl = false;
        /**
         * Status bar colors to change to based on mode
         */
        this.statusBarColors = {
            normal: '#005f5f',
            insert: '#5f0000',
            visual: '#5f00af',
            visualline: '#005f87',
            visualblock: '#86592d',
            replace: '#000000',
        };
        /**
         * Color of search highlights.
         */
        this.searchHighlightColor = 'rgba(150, 150, 255, 0.3)';
        this.iskeyword = '/\\()"\':,.;<>~!@#$%^&*|+=[]{}`?-';
        /**
         * Array of all bound key combinations in angle bracket notation
         */
        this.boundKeyCombinations = [];
        /**
         * In visual mode, start a search with * or # using the current selection
         */
        this.visualstar = false;
        /**
         * Does dragging with the mouse put you into visual mode
         */
        this.mouseSelectionGoesIntoVisualMode = true;
        /**
         * Uses a hack to fix moving around folds.
         */
        this.foldfix = false;
        /**
         * Disables extension
         */
        this.disableExtension = false;
        /**
         * Neovim
         */
        this.enableNeovim = true;
        this.neovimPath = 'nvim';
        /**
         * Automatically apply the /g flag to substitute commands.
         */
        this.substituteGlobalFlag = false;
        /**
         * Cursor style to set based on mode
         */
        this.cursorStylePerMode = {
            normal: undefined,
            insert: undefined,
            visual: undefined,
            visualline: undefined,
            visualblock: undefined,
            replace: undefined,
        };
        /**
         * When typing a command show the initial colon ':' character
         */
        this.cmdLineInitialColon = false;
        /**
         * Keybindings
         */
        this.insertModeKeyBindings = [];
        this.insertModeKeyBindingsNonRecursive = [];
        this.otherModesKeyBindings = [];
        this.otherModesKeyBindingsNonRecursive = [];
        this.reload();
    }
    reload() {
        // read configurations
        let vimConfigs = this.getConfiguration('vim');
        /* tslint:disable:forin */
        // Disable forin rule here as we make accessors enumerable.`
        for (const option in this) {
            const val = vimConfigs[option];
            if (val !== null && val !== undefined) {
                this[option] = val;
            }
        }
        this.leader = notation_1.Notation.NormalizeKey(this.leader, this.leaderDefault);
        // normalize keys
        const keybindingList = [
            this.insertModeKeyBindings,
            this.insertModeKeyBindingsNonRecursive,
            this.otherModesKeyBindings,
            this.otherModesKeyBindingsNonRecursive,
        ];
        for (const keybindings of keybindingList) {
            for (let remapping of keybindings) {
                if (remapping.before) {
                    remapping.before.forEach((key, idx) => (remapping.before[idx] = notation_1.Notation.NormalizeKey(key, this.leader)));
                }
                if (remapping.after) {
                    remapping.after.forEach((key, idx) => (remapping.after[idx] = notation_1.Notation.NormalizeKey(key, this.leader)));
                }
            }
        }
        // read package.json for bound keys
        this.boundKeyCombinations = [];
        for (let keybinding of packagejson.contributes.keybindings) {
            if (keybinding.when.indexOf('listFocus') !== -1) {
                continue;
            }
            let key = keybinding.key;
            if (process.platform === 'darwin') {
                key = keybinding.mac || key;
            }
            else if (process.platform === 'linux') {
                key = keybinding.linux || key;
            }
            this.boundKeyCombinations.push({
                key: notation_1.Notation.NormalizeKey(key, this.leader),
                command: keybinding.command,
            });
        }
        // enable/disable certain key combinations
        for (const boundKey of this.boundKeyCombinations) {
            // By default, all key combinations are used
            let useKey = true;
            let handleKey = this.handleKeys[boundKey.key];
            if (handleKey !== undefined) {
                // enabled/disabled through `vim.handleKeys`
                useKey = handleKey;
            }
            else if (!this.useCtrlKeys && boundKey.key.slice(1, 3) === 'C-') {
                // user has disabled CtrlKeys and the current key is a CtrlKey
                // <C-c>, still needs to be captured to overrideCopy
                if (boundKey.key === '<C-c>' && this.overrideCopy) {
                    useKey = true;
                }
                else {
                    useKey = false;
                }
            }
            vscode.commands.executeCommand('setContext', `vim.use${boundKey.key}`, useKey);
        }
    }
    getConfiguration(section = '') {
        let resource = undefined;
        let activeTextEditor = vscode.window.activeTextEditor;
        if (activeTextEditor) {
            resource = activeTextEditor.document.uri;
        }
        return vscode.workspace.getConfiguration(section, resource);
    }
    cursorStyleFromString(cursorStyle) {
        const cursorType = {
            line: vscode.TextEditorCursorStyle.Line,
            block: vscode.TextEditorCursorStyle.Block,
            underline: vscode.TextEditorCursorStyle.Underline,
            'line-thin': vscode.TextEditorCursorStyle.LineThin,
            'block-outline': vscode.TextEditorCursorStyle.BlockOutline,
            'underline-thin': vscode.TextEditorCursorStyle.UnderlineThin,
        };
        return cursorType[cursorStyle];
    }
    get userCursor() {
        return this.cursorStyleFromString(this.userCursorString);
    }
    get disableExt() {
        return this.disableExtension;
    }
    set disableExt(isDisabled) {
        this.disableExtension = isDisabled;
        this.getConfiguration('vim').update('disableExtension', isDisabled, vscode_1.ConfigurationTarget.Global);
    }
}
__decorate([
    overlapSetting({ codeName: 'tabSize', default: 8 })
], ConfigurationClass.prototype, "tabstop", void 0);
__decorate([
    overlapSetting({ codeName: 'cursorStyle', default: 'line' })
], ConfigurationClass.prototype, "userCursorString", void 0);
__decorate([
    overlapSetting({ codeName: 'insertSpaces', default: false })
], ConfigurationClass.prototype, "expandtab", void 0);
__decorate([
    overlapSetting({
        codeName: 'lineNumbers',
        default: true,
        codeValueMapping: { true: 'on', false: 'off' },
    })
], ConfigurationClass.prototype, "number", void 0);
__decorate([
    overlapSetting({
        codeName: 'lineNumbers',
        default: false,
        codeValueMapping: { true: 'relative', false: 'off' },
    })
], ConfigurationClass.prototype, "relativenumber", void 0);
function overlapSetting(args) {
    return function (target, propertyKey) {
        Object.defineProperty(target, propertyKey, {
            get: function () {
                if (this['_' + propertyKey] !== undefined) {
                    return this['_' + propertyKey];
                }
                let val = this.getConfiguration('editor').get(args.codeName, args.default);
                if (args.codeValueMapping && val !== undefined) {
                    val = args.codeValueMapping[val];
                }
                return val;
            },
            set: function (value) {
                this['_' + propertyKey] = value;
                if (value === undefined || globals_1.Globals.isTesting) {
                    return;
                }
                taskQueue_1.taskQueue.enqueueTask(() => __awaiter(this, void 0, void 0, function* () {
                    if (args.codeValueMapping) {
                        value = args.codeValueMapping[value];
                    }
                    yield this.getConfiguration('editor').update(args.codeName, value, vscode.ConfigurationTarget.Global);
                }), 'config');
            },
            enumerable: true,
            configurable: true,
        });
    };
}
exports.Configuration = new ConfigurationClass();
//# sourceMappingURL=configuration.js.map
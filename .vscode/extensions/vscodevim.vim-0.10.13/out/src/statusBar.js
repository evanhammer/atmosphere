"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
class StatusBarClass {
    constructor() {
        this._statusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
        this._prevModeName = undefined;
        this._isRecordingMacro = false;
    }
    SetText(text, mode, isRecordingMacro, forceShow = false) {
        let updateStatusBar = this._prevModeName !== mode || this._isRecordingMacro !== isRecordingMacro || forceShow;
        this._prevModeName = mode;
        this._isRecordingMacro = isRecordingMacro;
        if (updateStatusBar) {
            this._statusBarItem.text = text || '';
            this._statusBarItem.show();
        }
    }
    SetColor(color) {
        const currentColorCustomizations = vscode.workspace
            .getConfiguration('workbench')
            .get('colorCustomizations');
        const mergedColorCustomizations = Object.assign(currentColorCustomizations, {
            'statusBar.background': `${color}`,
            'statusBar.noFolderBackground': `${color}`,
            'statusBar.debuggingBackground': `${color}`,
        });
        vscode.workspace
            .getConfiguration('workbench')
            .update('colorCustomizations', mergedColorCustomizations, true);
    }
    dispose() {
        this._statusBarItem.dispose();
    }
}
exports.StatusBar = new StatusBarClass();
//# sourceMappingURL=statusBar.js.map
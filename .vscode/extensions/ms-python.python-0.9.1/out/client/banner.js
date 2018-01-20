"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const browser_1 = require("./common/net/browser");
const BANNER_URL = 'https://aka.ms/pvsc-at-msft';
class BannerService {
    constructor(persistentStateFactory) {
        this.shouldShowBanner = persistentStateFactory.createGlobalPersistentState('SHOW_NEW_PUBLISHER_BANNER', true);
        this.showBanner();
    }
    showBanner() {
        if (!this.shouldShowBanner.value) {
            return;
        }
        this.shouldShowBanner.value = false;
        const message = 'The Python extension is now published by Microsoft!';
        const yesButton = 'Read more';
        vscode_1.window.showInformationMessage(message, yesButton).then((value) => {
            if (value === yesButton) {
                this.displayBanner();
            }
        });
    }
    displayBanner() {
        browser_1.launch(BANNER_URL);
    }
}
exports.BannerService = BannerService;
//# sourceMappingURL=banner.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const conda_1 = require("./conda");
class CondaHelper {
    getDisplayName(condaInfo = {}) {
        // Samples.
        // "3.6.1 |Anaconda 4.4.0 (64-bit)| (default, May 11 2017, 13:25:24) [MSC v.1900 64 bit (AMD64)]".
        // "3.6.2 |Anaconda, Inc.| (default, Sep 21 2017, 18:29:43) \n[GCC 4.2.1 Compatible Clang 4.0.1 (tags/RELEASE_401/final)]".
        const sysVersion = condaInfo['sys.version'];
        if (!sysVersion) {
            return conda_1.AnacondaDisplayName;
        }
        // Take the second part of the sys.version.
        const sysVersionParts = sysVersion.split('|', 2);
        if (sysVersionParts.length === 2) {
            const displayName = sysVersionParts[1].trim();
            return this.isIdentifiableAsAnaconda(displayName) ? displayName : `${displayName} : ${conda_1.AnacondaDisplayName}`;
        }
        else {
            return conda_1.AnacondaDisplayName;
        }
    }
    isIdentifiableAsAnaconda(value) {
        const valueToSearch = value.toLowerCase();
        return conda_1.AnacondaIdentfiers.some(item => valueToSearch.indexOf(item.toLowerCase()) !== -1);
    }
    getPythonVersion(condaInfo) {
        // Sample.
        // 3.6.2.final.0 (hence just take everything untill the third period).
        const pythonVersion = condaInfo.python_version;
        if (!pythonVersion) {
            return undefined;
        }
        return pythonVersion.split('.').filter((_, index) => index < 3).join('.');
    }
}
exports.CondaHelper = CondaHelper;
//# sourceMappingURL=condaHelper.js.map
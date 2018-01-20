"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../../common/utils");
// where to find the Python binary within a conda env.
exports.CONDA_RELATIVE_PY_PATH = utils_1.IS_WINDOWS ? ['python.exe'] : ['bin', 'python'];
// tslint:disable-next-line:variable-name
exports.AnacondaCompanyNames = ['Anaconda, Inc.', 'Continuum Analytics, Inc.'];
// tslint:disable-next-line:variable-name
exports.AnacondaCompanyName = 'Anaconda, Inc.';
// tslint:disable-next-line:variable-name
exports.AnacondaDisplayName = 'Anaconda';
// tslint:disable-next-line:variable-name
exports.AnacondaIdentfiers = ['Anaconda', 'Conda', 'Continuum'];
//# sourceMappingURL=conda.js.map
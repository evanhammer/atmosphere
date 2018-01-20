"use strict";
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
const os = require("os");
const path = require("path");
const vscode_1 = require("vscode");
const types_1 = require("../../formatters/types");
const types_2 = require("../../ioc/types");
const types_3 = require("../../linters/types");
const types_4 = require("../../unittests/common/types");
const configSettings_1 = require("../configSettings");
const constants_1 = require("../constants");
const types_5 = require("../process/types");
const types_6 = require("../terminal/types");
const types_7 = require("../types");
const types_8 = require("./types");
var types_9 = require("../types");
exports.Product = types_9.Product;
const CTagsInsllationScript = os.platform() === 'darwin' ? 'brew install ctags' : 'sudo apt-get install exuberant-ctags';
// tslint:disable-next-line:variable-name
const ProductNames = new Map();
ProductNames.set(types_7.Product.autopep8, 'autopep8');
ProductNames.set(types_7.Product.flake8, 'flake8');
ProductNames.set(types_7.Product.mypy, 'mypy');
ProductNames.set(types_7.Product.nosetest, 'nosetest');
ProductNames.set(types_7.Product.pep8, 'pep8');
ProductNames.set(types_7.Product.pylama, 'pylama');
ProductNames.set(types_7.Product.prospector, 'prospector');
ProductNames.set(types_7.Product.pydocstyle, 'pydocstyle');
ProductNames.set(types_7.Product.pylint, 'pylint');
ProductNames.set(types_7.Product.pytest, 'pytest');
ProductNames.set(types_7.Product.yapf, 'yapf');
ProductNames.set(types_7.Product.rope, 'rope');
exports.SettingToDisableProduct = new Map();
exports.SettingToDisableProduct.set(types_7.Product.flake8, 'linting.flake8Enabled');
exports.SettingToDisableProduct.set(types_7.Product.mypy, 'linting.mypyEnabled');
exports.SettingToDisableProduct.set(types_7.Product.nosetest, 'unitTest.nosetestsEnabled');
exports.SettingToDisableProduct.set(types_7.Product.pep8, 'linting.pep8Enabled');
exports.SettingToDisableProduct.set(types_7.Product.pylama, 'linting.pylamaEnabled');
exports.SettingToDisableProduct.set(types_7.Product.prospector, 'linting.prospectorEnabled');
exports.SettingToDisableProduct.set(types_7.Product.pydocstyle, 'linting.pydocstyleEnabled');
exports.SettingToDisableProduct.set(types_7.Product.pylint, 'linting.pylintEnabled');
exports.SettingToDisableProduct.set(types_7.Product.pytest, 'unitTest.pyTestEnabled');
// tslint:disable-next-line:variable-name
const ProductInstallationPrompt = new Map();
ProductInstallationPrompt.set(types_7.Product.ctags, 'Install CTags to enable Python workspace symbols');
var ProductType;
(function (ProductType) {
    ProductType[ProductType["Linter"] = 0] = "Linter";
    ProductType[ProductType["Formatter"] = 1] = "Formatter";
    ProductType[ProductType["TestFramework"] = 2] = "TestFramework";
    ProductType[ProductType["RefactoringLibrary"] = 3] = "RefactoringLibrary";
    ProductType[ProductType["WorkspaceSymbols"] = 4] = "WorkspaceSymbols";
})(ProductType || (ProductType = {}));
const ProductTypeNames = new Map();
ProductTypeNames.set(ProductType.Formatter, 'Formatter');
ProductTypeNames.set(ProductType.Linter, 'Linter');
ProductTypeNames.set(ProductType.RefactoringLibrary, 'Refactoring library');
ProductTypeNames.set(ProductType.TestFramework, 'Test Framework');
ProductTypeNames.set(ProductType.WorkspaceSymbols, 'Workspace Symbols');
const ProductTypes = new Map();
ProductTypes.set(types_7.Product.flake8, ProductType.Linter);
ProductTypes.set(types_7.Product.mypy, ProductType.Linter);
ProductTypes.set(types_7.Product.pep8, ProductType.Linter);
ProductTypes.set(types_7.Product.prospector, ProductType.Linter);
ProductTypes.set(types_7.Product.pydocstyle, ProductType.Linter);
ProductTypes.set(types_7.Product.pylama, ProductType.Linter);
ProductTypes.set(types_7.Product.pylint, ProductType.Linter);
ProductTypes.set(types_7.Product.ctags, ProductType.WorkspaceSymbols);
ProductTypes.set(types_7.Product.nosetest, ProductType.TestFramework);
ProductTypes.set(types_7.Product.pytest, ProductType.TestFramework);
ProductTypes.set(types_7.Product.unittest, ProductType.TestFramework);
ProductTypes.set(types_7.Product.autopep8, ProductType.Formatter);
ProductTypes.set(types_7.Product.yapf, ProductType.Formatter);
ProductTypes.set(types_7.Product.rope, ProductType.RefactoringLibrary);
let Installer = class Installer {
    constructor(serviceContainer, outputChannel, isWindows) {
        this.serviceContainer = serviceContainer;
        this.outputChannel = outputChannel;
        this.isWindows = isWindows;
    }
    // tslint:disable-next-line:no-empty
    dispose() { }
    promptToInstall(product, resource) {
        return __awaiter(this, void 0, void 0, function* () {
            const productType = ProductTypes.get(product);
            const productTypeName = ProductTypeNames.get(productType);
            const productName = ProductNames.get(product);
            if (!this.shouldDisplayPrompt(product)) {
                const message = `${productTypeName} '${productName}' not installed.`;
                this.outputChannel.appendLine(message);
                return types_7.InstallerResponse.Ignore;
            }
            const installOption = ProductInstallationPrompt.has(product) ? ProductInstallationPrompt.get(product) : `Install ${productName}`;
            const disableOption = `Disable ${productTypeName}`;
            const dontShowAgain = 'Don\'t show this prompt again';
            const alternateFormatter = product === types_7.Product.autopep8 ? 'yapf' : 'autopep8';
            const useOtherFormatter = `Use '${alternateFormatter}' formatter`;
            const options = [];
            options.push(installOption);
            if (productType === ProductType.Formatter) {
                options.push(...[useOtherFormatter]);
            }
            if (exports.SettingToDisableProduct.has(product)) {
                options.push(...[disableOption, dontShowAgain]);
            }
            const item = yield vscode_1.window.showErrorMessage(`${productTypeName} ${productName} is not installed`, ...options);
            if (!item) {
                return types_7.InstallerResponse.Ignore;
            }
            switch (item) {
                case installOption: {
                    return this.install(product, resource);
                }
                case disableOption: {
                    if (ProductTypes.has(product) && ProductTypes.get(product) === ProductType.Linter) {
                        return this.disableLinter(product, resource).then(() => types_7.InstallerResponse.Disabled);
                    }
                    else {
                        const settingToDisable = exports.SettingToDisableProduct.get(product);
                        return this.updateSetting(settingToDisable, false, resource).then(() => types_7.InstallerResponse.Disabled);
                    }
                }
                case useOtherFormatter: {
                    return this.updateSetting('formatting.provider', alternateFormatter, resource)
                        .then(() => types_7.InstallerResponse.Installed);
                }
                case dontShowAgain: {
                    const pythonConfig = vscode_1.workspace.getConfiguration('python');
                    const features = pythonConfig.get('disablePromptForFeatures', []);
                    features.push(productName);
                    return pythonConfig.update('disablePromptForFeatures', features, true).then(() => types_7.InstallerResponse.Ignore);
                }
                default: {
                    throw new Error('Invalid selection');
                }
            }
        });
    }
    translateProductToModuleName(product, purpose) {
        switch (product) {
            case types_7.Product.mypy: return 'mypy';
            case types_7.Product.nosetest: {
                return purpose === types_7.ModuleNamePurpose.install ? 'nose' : 'nosetests';
            }
            case types_7.Product.pylama: return 'pylama';
            case types_7.Product.prospector: return 'prospector';
            case types_7.Product.pylint: return 'pylint';
            case types_7.Product.pytest: return 'pytest';
            case types_7.Product.autopep8: return 'autopep8';
            case types_7.Product.pep8: return 'pep8';
            case types_7.Product.pydocstyle: return 'pydocstyle';
            case types_7.Product.yapf: return 'yapf';
            case types_7.Product.flake8: return 'flake8';
            case types_7.Product.unittest: return 'unittest';
            case types_7.Product.rope: return 'rope';
            default: {
                throw new Error(`Product ${product} cannot be installed as a Python Module.`);
            }
        }
    }
    install(product, resource) {
        return __awaiter(this, void 0, void 0, function* () {
            if (product === types_7.Product.unittest) {
                return types_7.InstallerResponse.Installed;
            }
            if (product === types_7.Product.ctags) {
                return this.installCTags();
            }
            const installer = yield this.getInstallationChannel(product, resource);
            if (!installer) {
                return types_7.InstallerResponse.Ignore;
            }
            const moduleName = this.translateProductToModuleName(product, types_7.ModuleNamePurpose.install);
            const logger = this.serviceContainer.get(types_7.ILogger);
            yield installer.installModule(moduleName)
                .catch(logger.logError.bind(logger, `Error in installing the module '${moduleName}'`));
            return this.isInstalled(product)
                .then(isInstalled => isInstalled ? types_7.InstallerResponse.Installed : types_7.InstallerResponse.Ignore);
        });
    }
    isInstalled(product, resource) {
        return __awaiter(this, void 0, void 0, function* () {
            if (product === types_7.Product.unittest) {
                return true;
            }
            let moduleName;
            try {
                moduleName = this.translateProductToModuleName(product, types_7.ModuleNamePurpose.run);
                // tslint:disable-next-line:no-empty
            }
            catch (_a) { }
            // User may have customized the module name or provided the fully qualifieid path.
            const executableName = this.getExecutableNameFromSettings(product, resource);
            const isModule = typeof moduleName === 'string' && moduleName.length > 0 && path.basename(executableName) === executableName;
            // Prospector is an exception, it can be installed as a module, but not run as one.
            if (product !== types_7.Product.prospector && isModule) {
                const pythonProcess = yield this.serviceContainer.get(types_5.IPythonExecutionFactory).create(resource);
                return pythonProcess.isModuleInstalled(executableName);
            }
            else {
                const process = this.serviceContainer.get(types_5.IProcessService);
                const prospectorPath = configSettings_1.PythonSettings.getInstance(resource).linting.prospectorPath;
                return process.exec(prospectorPath, ['--version'], { mergeStdOutErr: true })
                    .then(() => true)
                    .catch(() => false);
            }
        });
    }
    disableLinter(product, resource) {
        return __awaiter(this, void 0, void 0, function* () {
            if (resource && vscode_1.workspace.getWorkspaceFolder(resource)) {
                const settingToDisable = exports.SettingToDisableProduct.get(product);
                const pythonConfig = vscode_1.workspace.getConfiguration('python', resource);
                const isMultiroot = Array.isArray(vscode_1.workspace.workspaceFolders) && vscode_1.workspace.workspaceFolders.length > 1;
                const configTarget = isMultiroot ? vscode_1.ConfigurationTarget.WorkspaceFolder : vscode_1.ConfigurationTarget.Workspace;
                return pythonConfig.update(settingToDisable, false, configTarget);
            }
            else {
                const pythonConfig = vscode_1.workspace.getConfiguration('python');
                return pythonConfig.update('linting.enabledWithoutWorkspace', false, true);
            }
        });
    }
    shouldDisplayPrompt(product) {
        const productName = ProductNames.get(product);
        const pythonConfig = vscode_1.workspace.getConfiguration('python');
        const disablePromptForFeatures = pythonConfig.get('disablePromptForFeatures', []);
        return disablePromptForFeatures.indexOf(productName) === -1;
    }
    installCTags() {
        if (this.isWindows) {
            this.outputChannel.appendLine('Install Universal Ctags Win32 to enable support for Workspace Symbols');
            this.outputChannel.appendLine('Download the CTags binary from the Universal CTags site.');
            this.outputChannel.appendLine('Option 1: Extract ctags.exe from the downloaded zip to any folder within your PATH so that Visual Studio Code can run it.');
            this.outputChannel.appendLine('Option 2: Extract to any folder and add the path to this folder to the command setting.');
            this.outputChannel.appendLine('Option 3: Extract to any folder and define that path in the python.workspaceSymbols.ctagsPath setting of your user settings file (settings.json).');
            this.outputChannel.show();
        }
        else {
            const terminalService = this.serviceContainer.get(types_6.ITerminalService);
            const logger = this.serviceContainer.get(types_7.ILogger);
            terminalService.sendCommand(CTagsInsllationScript, [])
                .catch(logger.logError.bind(logger, `Failed to install ctags. Script sent '${CTagsInsllationScript}'.`));
        }
        return types_7.InstallerResponse.Ignore;
    }
    getInstallationChannel(product, resource) {
        return __awaiter(this, void 0, void 0, function* () {
            const productName = ProductNames.get(product);
            const channels = yield this.getInstallationChannels(resource);
            if (channels.length === 0) {
                vscode_1.window.showInformationMessage(`No installers available to install ${productName}.`);
                return;
            }
            if (channels.length === 1) {
                return channels[0];
            }
            const placeHolder = `Select an option to install ${productName}`;
            const options = channels.map(installer => {
                return {
                    label: `Install using ${installer.displayName}`,
                    description: '',
                    installer
                };
            });
            const selection = yield vscode_1.window.showQuickPick(options, { matchOnDescription: true, matchOnDetail: true, placeHolder });
            return selection ? selection.installer : undefined;
        });
    }
    getInstallationChannels(resource) {
        return __awaiter(this, void 0, void 0, function* () {
            const installers = this.serviceContainer.getAll(types_8.IModuleInstaller);
            const supportedInstallers = yield Promise.all(installers.map((installer) => __awaiter(this, void 0, void 0, function* () { return installer.isSupported(resource).then(supported => supported ? installer : undefined); })));
            return supportedInstallers.filter(installer => installer !== undefined).map(installer => installer);
        });
    }
    // tslint:disable-next-line:no-any
    updateSetting(setting, value, resource) {
        if (resource && vscode_1.workspace.getWorkspaceFolder(resource)) {
            const pythonConfig = vscode_1.workspace.getConfiguration('python', resource);
            return pythonConfig.update(setting, value, vscode_1.ConfigurationTarget.Workspace);
        }
        else {
            const pythonConfig = vscode_1.workspace.getConfiguration('python');
            return pythonConfig.update(setting, value, true);
        }
    }
    getExecutableNameFromSettings(product, resource) {
        const settings = configSettings_1.PythonSettings.getInstance(resource);
        const productType = ProductTypes.get(product);
        switch (productType) {
            case ProductType.WorkspaceSymbols: return settings.workspaceSymbols.ctagsPath;
            case ProductType.TestFramework: {
                const testHelper = this.serviceContainer.get(types_4.ITestsHelper);
                const settingsPropNames = testHelper.getSettingsPropertyNames(product);
                if (!settingsPropNames.pathName) {
                    // E.g. in the case of UnitTests we don't allow customizing the paths.
                    return this.translateProductToModuleName(product, types_7.ModuleNamePurpose.run);
                }
                return settings.unitTest[settingsPropNames.pathName];
            }
            case ProductType.Formatter: {
                const formatHelper = this.serviceContainer.get(types_1.IFormatterHelper);
                const settingsPropNames = formatHelper.getSettingsPropertyNames(product);
                return settings.formatting[settingsPropNames.pathName];
            }
            case ProductType.RefactoringLibrary: return this.translateProductToModuleName(product, types_7.ModuleNamePurpose.run);
            case ProductType.Linter: {
                const linterHelper = this.serviceContainer.get(types_3.ILinterHelper);
                const settingsPropNames = linterHelper.getSettingsPropertyNames(product);
                return settings.linting[settingsPropNames.pathName];
            }
            default: {
                throw new Error(`Unrecognized Product '${product}'`);
            }
        }
    }
};
Installer = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(types_2.IServiceContainer)),
    __param(1, inversify_1.inject(types_7.IOutputChannel)), __param(1, inversify_1.named(constants_1.STANDARD_OUTPUT_CHANNEL)),
    __param(2, inversify_1.inject(types_7.IsWindows))
], Installer);
exports.Installer = Installer;
//# sourceMappingURL=installer.js.map
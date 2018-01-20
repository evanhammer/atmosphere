'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// This line should always be right on top.
if (Reflect.metadata === undefined) {
    // tslint:disable-next-line:no-require-imports no-var-requires
    require('reflect-metadata');
}
const inversify_1 = require("inversify");
const os = require("os");
const vscode = require("vscode");
const vscode_1 = require("vscode");
const banner_1 = require("./banner");
const settings = require("./common/configSettings");
const constants_1 = require("./common/constants");
const featureDeprecationManager_1 = require("./common/featureDeprecationManager");
const helpers_1 = require("./common/helpers");
const serviceRegistry_1 = require("./common/process/serviceRegistry");
const serviceRegistry_2 = require("./common/serviceRegistry");
const types_1 = require("./common/types");
const serviceRegistry_3 = require("./common/variables/serviceRegistry");
const debugger_1 = require("./debugger");
const serviceRegistry_4 = require("./formatters/serviceRegistry");
const interpreter_1 = require("./interpreter");
const setInterpreterProvider_1 = require("./interpreter/configuration/setInterpreterProvider");
const contracts_1 = require("./interpreter/contracts");
const shebangCodeLensProvider_1 = require("./interpreter/display/shebangCodeLensProvider");
const interpreterVersion_1 = require("./interpreter/interpreterVersion");
const serviceRegistry_5 = require("./interpreter/serviceRegistry");
const container_1 = require("./ioc/container");
const serviceManager_1 = require("./ioc/serviceManager");
const types_2 = require("./ioc/types");
const provider_1 = require("./jupyter/provider");
const jediProxyFactory_1 = require("./languageServices/jediProxyFactory");
const serviceRegistry_6 = require("./linters/serviceRegistry");
const completionProvider_1 = require("./providers/completionProvider");
const definitionProvider_1 = require("./providers/definitionProvider");
const execInTerminalProvider_1 = require("./providers/execInTerminalProvider");
const formatProvider_1 = require("./providers/formatProvider");
const hoverProvider_1 = require("./providers/hoverProvider");
const lintProvider_1 = require("./providers/lintProvider");
const objectDefinitionProvider_1 = require("./providers/objectDefinitionProvider");
const referenceProvider_1 = require("./providers/referenceProvider");
const renameProvider_1 = require("./providers/renameProvider");
const replProvider_1 = require("./providers/replProvider");
const signatureProvider_1 = require("./providers/signatureProvider");
const simpleRefactorProvider_1 = require("./providers/simpleRefactorProvider");
const symbolProvider_1 = require("./providers/symbolProvider");
const updateSparkLibraryProvider_1 = require("./providers/updateSparkLibraryProvider");
const sortImports = require("./sortImports");
const telemetry_1 = require("./telemetry");
const constants_2 = require("./telemetry/constants");
const stopWatch_1 = require("./telemetry/stopWatch");
const blockFormatProvider_1 = require("./typeFormatters/blockFormatProvider");
const constants_3 = require("./unittests/common/constants");
const tests = require("./unittests/main");
const serviceRegistry_7 = require("./unittests/serviceRegistry");
const main_1 = require("./workspaceSymbols/main");
const PYTHON = { language: 'python' };
const activationDeferred = helpers_1.createDeferred();
exports.activated = activationDeferred.promise;
// tslint:disable-next-line:max-func-body-length
function activate(context) {
    return __awaiter(this, void 0, void 0, function* () {
        const cont = new inversify_1.Container();
        const serviceManager = new serviceManager_1.ServiceManager(cont);
        const serviceContainer = new container_1.ServiceContainer(cont);
        serviceManager.addSingletonInstance(types_2.IServiceContainer, serviceContainer);
        serviceManager.addSingletonInstance(types_1.IDisposableRegistry, context.subscriptions);
        serviceManager.addSingletonInstance(types_1.IMemento, context.globalState, types_1.GLOBAL_MEMENTO);
        serviceManager.addSingletonInstance(types_1.IMemento, context.workspaceState, types_1.WORKSPACE_MEMENTO);
        const standardOutputChannel = vscode_1.window.createOutputChannel('Python');
        const unitTestOutChannel = vscode_1.window.createOutputChannel('Python Test Log');
        serviceManager.addSingletonInstance(types_1.IOutputChannel, standardOutputChannel, constants_1.STANDARD_OUTPUT_CHANNEL);
        serviceManager.addSingletonInstance(types_1.IOutputChannel, unitTestOutChannel, constants_3.TEST_OUTPUT_CHANNEL);
        serviceRegistry_2.registerTypes(serviceManager);
        serviceRegistry_1.registerTypes(serviceManager);
        serviceRegistry_3.registerTypes(serviceManager);
        serviceRegistry_7.registerTypes(serviceManager);
        serviceRegistry_6.registerTypes(serviceManager);
        serviceRegistry_5.registerTypes(serviceManager);
        serviceRegistry_4.registerTypes(serviceManager);
        const persistentStateFactory = serviceManager.get(types_1.IPersistentStateFactory);
        const pythonSettings = settings.PythonSettings.getInstance();
        sendStartupTelemetry(exports.activated, serviceContainer);
        sortImports.activate(context, standardOutputChannel);
        const interpreterManager = new interpreter_1.InterpreterManager(serviceContainer);
        // This must be completed before we can continue.
        yield interpreterManager.autoSetInterpreter();
        interpreterManager.refresh()
            .catch(ex => console.error('Python Extension: interpreterManager.refresh', ex));
        context.subscriptions.push(interpreterManager);
        const interpreterVersionService = new interpreterVersion_1.InterpreterVersionService();
        context.subscriptions.push(new setInterpreterProvider_1.SetInterpreterProvider(interpreterManager, interpreterVersionService));
        context.subscriptions.push(...execInTerminalProvider_1.activateExecInTerminalProvider());
        context.subscriptions.push(updateSparkLibraryProvider_1.activateUpdateSparkLibraryProvider());
        simpleRefactorProvider_1.activateSimplePythonRefactorProvider(context, standardOutputChannel, serviceContainer);
        const jediFactory = new jediProxyFactory_1.JediFactory(context.asAbsolutePath('.'));
        context.subscriptions.push(...objectDefinitionProvider_1.activateGoToObjectDefinitionProvider(jediFactory));
        context.subscriptions.push(new replProvider_1.ReplProvider());
        // Enable indentAction
        // tslint:disable-next-line:no-non-null-assertion
        vscode.languages.setLanguageConfiguration(PYTHON.language, {
            onEnterRules: [
                {
                    beforeText: /^\s*(?:def|class|for|if|elif|else|while|try|with|finally|except|async).*?:\s*$/,
                    action: { indentAction: vscode.IndentAction.Indent }
                },
                {
                    beforeText: /^ *#.*$/,
                    afterText: /.+$/,
                    action: { indentAction: vscode.IndentAction.None, appendText: '# ' }
                },
                {
                    beforeText: /^\s+(continue|break|return)\b.*$/,
                    action: { indentAction: vscode.IndentAction.Outdent }
                }
            ]
        });
        context.subscriptions.push(jediFactory);
        context.subscriptions.push(vscode.languages.registerRenameProvider(PYTHON, new renameProvider_1.PythonRenameProvider(serviceContainer)));
        const definitionProvider = new definitionProvider_1.PythonDefinitionProvider(jediFactory);
        context.subscriptions.push(vscode.languages.registerDefinitionProvider(PYTHON, definitionProvider));
        context.subscriptions.push(vscode.languages.registerHoverProvider(PYTHON, new hoverProvider_1.PythonHoverProvider(jediFactory)));
        context.subscriptions.push(vscode.languages.registerReferenceProvider(PYTHON, new referenceProvider_1.PythonReferenceProvider(jediFactory)));
        context.subscriptions.push(vscode.languages.registerCompletionItemProvider(PYTHON, new completionProvider_1.PythonCompletionItemProvider(jediFactory), '.'));
        context.subscriptions.push(vscode.languages.registerCodeLensProvider(PYTHON, new shebangCodeLensProvider_1.ShebangCodeLensProvider()));
        const symbolProvider = new symbolProvider_1.PythonSymbolProvider(jediFactory);
        context.subscriptions.push(vscode.languages.registerDocumentSymbolProvider(PYTHON, symbolProvider));
        if (pythonSettings.devOptions.indexOf('DISABLE_SIGNATURE') === -1) {
            context.subscriptions.push(vscode.languages.registerSignatureHelpProvider(PYTHON, new signatureProvider_1.PythonSignatureProvider(jediFactory), '(', ','));
        }
        if (pythonSettings.formatting.provider !== 'none') {
            const formatProvider = new formatProvider_1.PythonFormattingEditProvider(context, serviceContainer);
            context.subscriptions.push(vscode.languages.registerDocumentFormattingEditProvider(PYTHON, formatProvider));
            context.subscriptions.push(vscode.languages.registerDocumentRangeFormattingEditProvider(PYTHON, formatProvider));
        }
        // tslint:disable-next-line:promise-function-async
        const linterProvider = new lintProvider_1.LintProvider(context, standardOutputChannel, (a, b) => Promise.resolve(false), serviceContainer);
        context.subscriptions.push(linterProvider);
        const jupyterExtInstalled = vscode.extensions.getExtension('donjayamanne.jupyter');
        if (jupyterExtInstalled) {
            if (jupyterExtInstalled.isActive) {
                // tslint:disable-next-line:no-unsafe-any
                jupyterExtInstalled.exports.registerLanguageProvider(PYTHON.language, new provider_1.JupyterProvider());
                // tslint:disable-next-line:no-unsafe-any
                linterProvider.documentHasJupyterCodeCells = jupyterExtInstalled.exports.hasCodeCells;
            }
            jupyterExtInstalled.activate().then(() => {
                // tslint:disable-next-line:no-unsafe-any
                jupyterExtInstalled.exports.registerLanguageProvider(PYTHON.language, new provider_1.JupyterProvider());
                // tslint:disable-next-line:no-unsafe-any
                linterProvider.documentHasJupyterCodeCells = jupyterExtInstalled.exports.hasCodeCells;
            });
        }
        tests.activate(context, unitTestOutChannel, symbolProvider, serviceContainer);
        context.subscriptions.push(new main_1.WorkspaceSymbols(serviceContainer));
        context.subscriptions.push(vscode.languages.registerOnTypeFormattingEditProvider(PYTHON, new blockFormatProvider_1.BlockFormatProviders(), ':'));
        // In case we have CR LF
        const triggerCharacters = os.EOL.split('');
        triggerCharacters.shift();
        context.subscriptions.push(vscode.debug.registerDebugConfigurationProvider('python', new debugger_1.SimpleConfigurationProvider()));
        activationDeferred.resolve();
        // tslint:disable-next-line:no-unused-expression
        new banner_1.BannerService(persistentStateFactory);
        const deprecationMgr = new featureDeprecationManager_1.FeatureDeprecationManager(persistentStateFactory, !!jupyterExtInstalled);
        deprecationMgr.initialize();
        context.subscriptions.push(new featureDeprecationManager_1.FeatureDeprecationManager(persistentStateFactory, !!jupyterExtInstalled));
    });
}
exports.activate = activate;
function sendStartupTelemetry(activatedPromise, serviceContainer) {
    return __awaiter(this, void 0, void 0, function* () {
        const stopWatch = new stopWatch_1.StopWatch();
        const logger = serviceContainer.get(types_1.ILogger);
        try {
            yield activatedPromise;
            const duration = stopWatch.elapsedTime;
            const condaLocator = serviceContainer.get(contracts_1.ICondaLocatorService);
            const condaVersion = yield condaLocator.getCondaVersion().catch(() => undefined);
            const props = condaVersion ? { condaVersion } : undefined;
            telemetry_1.sendTelemetryEvent(constants_2.EDITOR_LOAD, duration, props);
        }
        catch (ex) {
            logger.logError('sendStartupTelemetry failed.', ex);
        }
    });
}
//# sourceMappingURL=extension.js.map
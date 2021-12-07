"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var webpack_1 = require("webpack");
var friendly_errors_webpack_plugin_1 = __importDefault(require("friendly-errors-webpack-plugin"));
var case_sensitive_paths_webpack_plugin_1 = __importDefault(require("case-sensitive-paths-webpack-plugin"));
var fork_ts_checker_webpack_plugin_1 = __importDefault(require("fork-ts-checker-webpack-plugin"));
var react_refresh_webpack_plugin_1 = __importDefault(require("@pmmmwh/react-refresh-webpack-plugin"));
var simo_utils_1 = require("@chrissong/simo-utils");
var node_notifier_1 = __importDefault(require("node-notifier"));
var cssLoader_1 = __importDefault(require("./cssLoader"));
var utils_1 = require("../utils");
exports.default = (function (api) {
    api.chainWebpack(function (config) {
        var isDevelopment = api.env.NODE_ENV === 'development';
        if (!isDevelopment)
            return;
        var simoConfig = api.simoConfig, paths = api.paths;
        var port = simoConfig.port, host = simoConfig.host, proxy = simoConfig.proxy, browsersList = simoConfig.browsersList, devtool = simoConfig.devtool, tsTypeCheck = simoConfig.tsTypeCheck, fastRefresh = simoConfig.fastRefresh, open = simoConfig.open;
        var useTypescript = simo_utils_1.fs.existsSync(paths.appTsConfigPath);
        (0, cssLoader_1.default)(config, {
            isProd: false,
            cssExtract: false,
            sourceMap: true,
            filename: '[name].css',
            chunkFilename: '[id].css',
            publicPath: '../../',
            browsersList: browsersList,
        });
        config.mode('development').devtool(devtool);
        config.devServer
            .contentBase(api.resolve('public'))
            .watchContentBase(true)
            .publicPath('')
            .port(port)
            .host(host)
            .hot(true)
            .open(open)
            .progress(false)
            .stats(false)
            .clientLogLevel('none')
            .disableHostCheck(true)
            .compress(true)
            .overlay(true)
            .quiet(true)
            .inline(true)
            .when(proxy, function (config) {
            config.proxy((0, utils_1.getProxy)(proxy));
        });
        useTypescript &&
            tsTypeCheck &&
            config.plugin('forks-ts-checker').use(fork_ts_checker_webpack_plugin_1.default);
        config.plugin('error').use(friendly_errors_webpack_plugin_1.default, [
            {
                onErrors: function (severity, errors) {
                    if (severity !== 'error') {
                        return;
                    }
                    var error = errors[0];
                    node_notifier_1.default.notify({
                        title: 'Webpack error',
                        message: severity + ': ' + error,
                        icon: path_1.default.resolve(__dirname, '../statics/webpack_logo.ico'),
                    });
                },
            },
        ]);
        config.plugin('case').use(case_sensitive_paths_webpack_plugin_1.default);
        config.plugin('hmr').use(webpack_1.HotModuleReplacementPlugin);
        fastRefresh && config.plugin('refresh').use(react_refresh_webpack_plugin_1.default, [{ overlay: false }]);
    });
});

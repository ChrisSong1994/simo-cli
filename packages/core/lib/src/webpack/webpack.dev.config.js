"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var webpack_1 = require("webpack");
var friendly_errors_webpack_plugin_1 = __importDefault(require("friendly-errors-webpack-plugin"));
var case_sensitive_paths_webpack_plugin_1 = __importDefault(require("case-sensitive-paths-webpack-plugin"));
var fork_ts_checker_webpack_plugin_1 = __importDefault(require("fork-ts-checker-webpack-plugin"));
var react_refresh_webpack_plugin_1 = __importDefault(require("@pmmmwh/react-refresh-webpack-plugin"));
var simo_utils_1 = require("@chrissong/simo-utils");
var cssLoader_1 = __importDefault(require("./cssLoader"));
var utils_1 = require("../utils");
exports.default = (function (api) {
    api.chainWebpack(function (config) {
        if (api.mode !== 'development')
            return;
        var simoConfig = api.simoConfig, paths = api.paths;
        var port = simoConfig.port, host = simoConfig.host, proxy = simoConfig.proxy, browsersList = simoConfig.browsersList, devtool = simoConfig.devtool, tsTypeCheck = simoConfig.tsTypeCheck;
        var useTypescript = simo_utils_1.fs.existsSync(paths.appTsConfigPath);
        // 加载样式
        cssLoader_1.default(config, {
            isProd: false,
            sourceMap: true,
            filename: '[name].css',
            chunkFilename: '[id].css',
            publicPath: '../../',
            browsersList: browsersList,
        });
        /**
         * 配置模式与devtool,缓存等
         */
        config.mode('development').devtool(devtool);
        /**
         * devServer
         */
        config.devServer
            .contentBase(api.resolve('public'))
            .watchContentBase(true) // 检测public下文件变动
            .publicPath('')
            .port(port)
            .host(host)
            .hot(true)
            .open(false)
            .progress(false)
            .stats(false)
            .clientLogLevel('none')
            .disableHostCheck(true)
            .compress(true)
            .overlay(true)
            .quiet(true)
            .inline(true)
            .when(proxy, function (config) {
            config.proxy(utils_1.getProxy(proxy));
        });
        /**
         *  单独的ts类型检查进程
         */
        useTypescript &&
            tsTypeCheck &&
            config.plugin('forks-ts-checker').use(fork_ts_checker_webpack_plugin_1.default);
        /**
         * 错误
         */
        config.plugin('error').use(friendly_errors_webpack_plugin_1.default);
        /**
         * 大小写敏感
         */
        config.plugin('case').use(case_sensitive_paths_webpack_plugin_1.default);
        /**
         * 热更新
         */
        config.plugin('hmr').use(webpack_1.HotModuleReplacementPlugin);
        /**
         * reactRefresh
         */
        config.plugin('react-refresh').use(react_refresh_webpack_plugin_1.default);
    });
});
//# sourceMappingURL=webpack.dev.config.js.map
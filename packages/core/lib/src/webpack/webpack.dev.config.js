"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var friendly_errors_webpack_plugin_1 = __importDefault(require("friendly-errors-webpack-plugin"));
var lodash_1 = __importDefault(require("lodash"));
var cssLoader_1 = __importDefault(require("./cssLoader"));
exports.default = (function (api) {
    api.chainWebpack(function (config) {
        if (api.mode !== 'development')
            return;
        var _a = api.simoConfig, port = _a.port, host = _a.host, proxy = _a.proxy, output = _a.output;
        // 加载样式
        cssLoader_1.default(config, {
            isProd: false,
            sourceMap: true,
            filename: 'static/css/[name].css',
            chunkFilename: 'static/css/[id].css',
            publicPath: '../../',
        });
        /**
         * 配置模式与devtool
         */
        config.watch(false).mode('development');
        /**
         * devServer
         */
        config.devServer
            // 热更新ws地址与location.host保持一致
            .contentBase(api.resolve(lodash_1.default.get(output, 'path', 'dist')))
            .port(port)
            .host(host)
            .hot(true)
            .open(false)
            .compress(true)
            .when(proxy, function (config) {
            config.proxy(proxy);
        });
        /**
         * 错误
         */
        config.plugin('errors').use(friendly_errors_webpack_plugin_1.default);
    });
});
//# sourceMappingURL=webpack.dev.config.js.map
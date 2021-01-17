"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cssLoader_1 = __importDefault(require("./cssLoader"));
exports.default = (function (api) {
    api.chainWebpack(function (config) {
        if (api.mode !== 'development')
            return;
        var _a = api.simoConfig, port = _a.port, host = _a.host, proxy = _a.proxy, outputPath = _a.outputPath;
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
        debugger;
        /**
         * devServer
         */
        config.devServer
            // 热更新ws地址与location.host保持一致
            .contentBase(api.resolve(outputPath))
            .port(port)
            .host(host)
            .hot(true)
            .open(false)
            .compress(true)
            .when(proxy, function (config) {
            config.proxy(proxy);
        });
    });
});
//# sourceMappingURL=webpack.dev.config.js.map
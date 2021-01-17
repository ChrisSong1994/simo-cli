"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var terser_webpack_plugin_1 = __importDefault(require("terser-webpack-plugin"));
var webpack_bundle_analyzer_1 = require("webpack-bundle-analyzer");
var clean_webpack_plugin_1 = require("clean-webpack-plugin");
var cssLoader_1 = __importDefault(require("./cssLoader"));
exports.default = (function (api) {
    api.chainWebpack(function (config) {
        if (api.mode !== 'production')
            return;
        var report = api.simoConfig.report;
        // 加载样式
        cssLoader_1.default(config, {
            isProd: true,
            sourceMap: false,
            filename: 'static/css/[name].[contenthash:8].css',
            chunkFilename: 'static/css/[id].css',
            publicPath: '../../',
        });
        /**
         * 配置模式与devtool
         * 输出文件名设置
         */
        config
            .watch(false)
            .mode('production')
            .devtool('source-map')
            .output.filename('static/js/[name].[contenthash:8].js')
            .chunkFilename('static/js/[name].[contenthash:8].js');
        /**
         * 依赖打包大小分析
         */
        config.when(report, function (config) {
            config.plugin('bundle-analyzer').use(webpack_bundle_analyzer_1.BundleAnalyzerPlugin);
        });
        /**
         * 删除打包文件
         * */
        config.plugin('clean-webpack-plugin').use(clean_webpack_plugin_1.CleanWebpackPlugin);
        /**
         * 当文件过大时，不输出优化提示
         */
        config.performance.hints(false);
        config.optimization.noEmitOnErrors(true);
        /**
         * 设置压缩代码
         */
        config.optimization.minimize(true);
        /**
         * 压缩js
         */
        config.optimization.minimizer('terser').use(terser_webpack_plugin_1.default);
    });
});
//# sourceMappingURL=webpack.prod.config.js.map
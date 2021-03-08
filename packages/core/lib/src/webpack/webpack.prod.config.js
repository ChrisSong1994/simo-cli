"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var terser_webpack_plugin_1 = __importDefault(require("terser-webpack-plugin"));
var webpack_bundle_analyzer_1 = require("webpack-bundle-analyzer");
var clean_webpack_plugin_1 = require("clean-webpack-plugin");
var copy_webpack_plugin_1 = __importDefault(require("copy-webpack-plugin"));
var cssLoader_1 = __importDefault(require("./cssLoader"));
exports.default = (function (api) {
    api.chainWebpack(function (config) {
        if (api.mode !== 'production')
            return;
        var _a = api.simoConfig, staticPath = _a.staticPath, output = _a.output, publicPath = _a.publicPath, browsersList = _a.browsersList;
        // 加载样式
        cssLoader_1.default(config, {
            isProd: true,
            sourceMap: false,
            filename: '[name].[contenthash:8].css',
            chunkFilename: '[id].css',
            publicPath: publicPath,
            browsersList: browsersList,
        });
        /**
         * 配置模式与devtool
         * 输出文件名设置
         */
        config
            .watch(false)
            .mode('production')
            .devtool(api.argv.sourcemap ? 'source-map' : false)
            .output.filename('[name].[contenthash:8].js')
            .chunkFilename('[id].js');
        /**
         * 依赖打包大小分析
         */
        config.when(api.argv.report, function (config) {
            config.plugin('bundle-analyzer').use(webpack_bundle_analyzer_1.BundleAnalyzerPlugin);
        });
        // 静态文件拷贝
        config.when(staticPath, function () {
            if (typeof staticPath === 'string') {
                // 字符串路径将作为目录被拷贝到输出目录
                config.plugin('static-copy').use(copy_webpack_plugin_1.default, [
                    {
                        patterns: [
                            {
                                from: api.resolve(staticPath),
                                to: api.resolve(output.path),
                                toType: 'dir',
                                noErrorOnMissing: true,
                            },
                        ],
                    },
                ]);
            }
            // 数据将作为patterns值配置
            if (Array.isArray(staticPath)) {
                config.plugin('static-copy').use(copy_webpack_plugin_1.default, [
                    {
                        patterns: staticPath.map(function (item) { return (__assign(__assign({}, item), { from: api.resolve(item.from), to: api.resolve(item.to, output.path) })); }),
                    },
                ]);
            }
        });
        /**
         * 删除打包文件
         * */
        config.plugin('clean-webpack-plugin').use(clean_webpack_plugin_1.CleanWebpackPlugin);
        /**
         * 当文件过大时，不输出优化提示
         */
        config.performance.hints(false);
        /**
         * 设置压缩代码
         */
        config.optimization.minimize(true);
        /**
         * splitchunks
         */
        config.optimization.splitChunks({
            chunks: 'async',
            minSize: 20000,
            minRemainingSize: 0,
            minChunks: 1,
            maxAsyncRequests: 30,
            maxInitialRequests: 30,
            enforceSizeThreshold: 50000,
            cacheGroups: {
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    reuseExistingChunk: true,
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true,
                },
            },
        });
        /**
         * 压缩js
         */
        config.optimization.minimizer('terser').use(terser_webpack_plugin_1.default);
    });
});
//# sourceMappingURL=webpack.prod.config.js.map
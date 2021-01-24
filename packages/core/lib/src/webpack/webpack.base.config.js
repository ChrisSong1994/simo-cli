"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var webpack_1 = require("webpack");
var html_webpack_plugin_1 = __importDefault(require("html-webpack-plugin"));
var eslint_webpack_plugin_1 = __importDefault(require("eslint-webpack-plugin"));
exports.default = (function (api) {
    api.chainWebpack(function (config) {
        var env = api.env, simoConfig = api.simoConfig, context = api.context;
        var alias = simoConfig.alias, pages = simoConfig.pages, outputPath = simoConfig.outputPath, publicPath = simoConfig.publicPath, inlineLimit = simoConfig.inlineLimit, useTypescript = simoConfig.useTypescript;
        // 设置context
        config.context(context).target('web');
        // output配置
        config.output.path(api.resolve(outputPath)).publicPath(publicPath);
        // resolve 配置
        config.resolve
            .when(alias, function (config) {
            Object.keys(alias).forEach(function (key) {
                config.alias.set(key, api.resolve(alias[key]));
            });
        })
            .extensions.merge(['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json', '.wasm']);
        // loader 配置
        /**
         * babel-loader
         */
        config.module
            .rule('compile')
            .test(/\.(js|mjs|jsx|ts|tsx)$/)
            .exclude.add(api.resolve('node_modules'))
            .end()
            .use('babel-loader')
            .loader('babel-loader')
            .options({
            cacheDirectory: true,
            presets: [
                [
                    require.resolve('@chrissong/babel-preset-simo'),
                    {
                        env: true,
                        react: true,
                        typescript: useTypescript,
                    },
                ],
            ],
        });
        // 图片
        config.module
            .rule('images')
            .test(/\.(png|jpe?g|gif|webp|ico)(\?.*)?$/)
            .use('url-loader')
            .loader(require.resolve('url-loader'))
            .options({
            limit: inlineLimit || 10000,
            name: 'static/[name].[hash:8].[ext]',
            esModule: false,
            fallback: {
                loader: require.resolve('file-loader'),
                options: {
                    name: 'static/[name].[hash:8].[ext]',
                    esModule: false,
                },
            },
        });
        // 单独抽出svg 文件
        config.module
            .rule('svg')
            .test(/\.(svg)(\?.*)?$/)
            .use('file-loader')
            .loader(require.resolve('file-loader'))
            .options({
            name: 'static/[name].[hash:8].[ext]',
            esModule: false,
        });
        // 字体文件
        config.module
            .rule('fonts')
            .test(/\.(eot|woff|woff2|ttf)(\?.*)?$/)
            .use('file-loader')
            .loader(require.resolve('file-loader'))
            .options({
            name: 'static/[name].[hash:8].[ext]',
            esModule: false,
        });
        // 插件配置
        /**
         * eslint 插件配置
         * */
        config.plugin('eslint').use(eslint_webpack_plugin_1.default, [
            {
                context: context,
                extensions: ['js', 'mjs', 'jsx', 'ts', 'tsx'],
                eslintPath: require.resolve('eslint'),
                cache: true,
            },
        ]);
        /**
         * 编译进度
         * */
        config.plugin('progress').use(webpack_1.ProgressPlugin);
        /**
         * 忽略moment locale文件
         */
        config.plugin('ignore').use(webpack_1.IgnorePlugin, [
            {
                resourceRegExp: /^\.\/locale$/,
                contextRegExp: /moment$/,
            },
        ]);
        /**
         * 模版加载
         */
        config.when(pages, function (config) {
            var _loop_1 = function (key) {
                var _a = pages[key], entry = _a.entry, template = _a.template;
                if (Array.isArray(entry)) {
                    entry.forEach(function (en) { return config.entry(key).add(en); });
                }
                else {
                    config.entry(key).add(entry);
                }
                config.plugin("html-template-" + key).use(html_webpack_plugin_1.default, [
                    {
                        template: path_1.default.resolve(context, template),
                    },
                ]);
            };
            for (var key in pages) {
                _loop_1(key);
            }
        });
    });
});
//# sourceMappingURL=webpack.base.config.js.map
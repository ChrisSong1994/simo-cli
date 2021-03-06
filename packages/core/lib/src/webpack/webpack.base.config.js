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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var simo_utils_1 = require("@chrissong/simo-utils");
var webpack_1 = require("webpack");
var html_webpack_plugin_1 = __importDefault(require("html-webpack-plugin"));
var eslint_webpack_plugin_1 = __importDefault(require("eslint-webpack-plugin"));
var webpackbar_1 = __importDefault(require("webpackbar"));
exports.default = (function (api) {
    api.chainWebpack(function (config) {
        var simoConfig = api.simoConfig, context = api.context;
        var alias = simoConfig.alias, pages = simoConfig.pages, publicPath = simoConfig.publicPath, inlineLimit = simoConfig.inlineLimit, externals = simoConfig.externals, extraBabelPlugins = simoConfig.extraBabelPlugins, extraBabelPresets = simoConfig.extraBabelPresets, ignoreMomentLocale = simoConfig.ignoreMomentLocale, output = simoConfig.output;
        // 设置context
        config.context(context).target('web');
        // output配置
        config.output.merge(__assign(__assign({}, output), { publicPath: publicPath, path: api.resolve(output.path) || api.resolve('dist') }));
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
            sourceType: 'unambiguous',
            presets: __spreadArrays([
                [
                    require.resolve('@chrissong/babel-preset-simo'),
                    {
                        env: true,
                        react: true,
                        typescript: simo_utils_1.fs.existsSync(path_1.default.resolve(context, 'tsconfig.json')),
                    },
                ]
            ], (extraBabelPresets || [])),
            plugins: __spreadArrays((extraBabelPlugins || [])).filter(Boolean),
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
        //  排除依赖
        config.when(externals, function (config) {
            config.externals(externals);
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
        // config.plugin('progress').use(ProgressPlugin);
        /**
         * 打包进度条
         */
        config.plugin('process-bar').use(webpackbar_1.default);
        /**
         * 忽略moment locale文件
         */
        if (ignoreMomentLocale) {
            config.plugin('ignore').use(webpack_1.IgnorePlugin, [
                {
                    resourceRegExp: /^\.\/locale$/,
                    contextRegExp: /moment$/,
                },
            ]);
        }
        /**
         * 模版加载
         */
        config.when(pages, function (config) {
            var _loop_1 = function (key) {
                var _a = pages[key], entry = _a.entry, template = _a.template, htmlWebpackPluginOptions = _a.htmlWebpackPluginOptions;
                if (Array.isArray(entry)) {
                    entry.forEach(function (en) { return config.entry(key).add(en); });
                }
                else {
                    config.entry(key).add(entry);
                }
                config.plugin("html-template-" + key).use(html_webpack_plugin_1.default, [
                    __assign({ inject: Reflect.has(pages[key], 'htmlWebpackPluginOptions') ? true : false, template: path_1.default.resolve(context, template) }, htmlWebpackPluginOptions),
                ]);
            };
            for (var key in pages) {
                _loop_1(key);
            }
        });
    });
});
//# sourceMappingURL=webpack.base.config.js.map
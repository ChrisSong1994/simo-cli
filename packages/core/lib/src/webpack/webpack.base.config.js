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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
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
var webpack_build_notifier_1 = __importDefault(require("webpack-build-notifier"));
var node_polyfill_webpack_plugin_1 = __importDefault(require("node-polyfill-webpack-plugin"));
var lodash_1 = __importDefault(require("lodash"));
var webpackbar_1 = __importDefault(require("webpackbar"));
exports.default = (function (api) {
    api.chainWebpack(function (config) {
        var simoConfig = api.simoConfig, context = api.context, paths = api.paths, env = api.env;
        var useTypescript = simo_utils_1.fs.existsSync(paths.appTsConfigPath);
        var isDevelopment = env.NODE_ENV === 'development';
        var define = simoConfig.define, target = simoConfig.target, alias = simoConfig.alias, pages = simoConfig.pages, publicPath = simoConfig.publicPath, inlineLimit = simoConfig.inlineLimit, output = simoConfig.output, outputEnvironment = simoConfig.outputEnvironment, parallel = simoConfig.parallel, browsersList = simoConfig.browsersList, extraBabelOptions = simoConfig.extraBabelOptions, fastRefresh = simoConfig.fastRefresh, buildNotifier = simoConfig.buildNotifier;
        config
            .context(context)
            .target(isDevelopment ? 'web' : target)
            .cache({ type: 'filesystem', maxAge: 604800000 });
        config.output.merge(__assign({ publicPath: publicPath, path: api.resolve(lodash_1.default.get(output, 'path', 'dist')), environment: outputEnvironment }, lodash_1.default.omit(output, ['publicPath', 'path'])));
        config.resolve
            .when(alias, function (config) {
            Object.keys(alias).forEach(function (key) {
                config.alias.set(key, api.resolve(alias[key]));
            });
        })
            .extensions.merge([
            '.mjs',
            '.js',
            '.jsx',
            '.ts',
            '.tsx',
            '.json',
            '.wasm',
            '.less',
            '.scss',
            '.sass',
            'css',
        ]);
        var jsRule = config.module
            .rule('compile')
            .test(/\.(js|mjs|jsx|ts|tsx)$/)
            .exclude.add(api.resolve('node_modules'))
            .end();
        if (parallel)
            jsRule.use('thread-loader').loader(require.resolve('thread-loader'));
        jsRule
            .use('babel-loader')
            .loader('babel-loader')
            .options(__assign({ exclude: /(node_modules)/, cacheDirectory: true, sourceType: 'unambiguous', presets: __spreadArray([
                [
                    require.resolve('@chrissong/babel-preset-simo'),
                    {
                        targets: browsersList.join(','),
                        typescript: useTypescript,
                        refresh: fastRefresh,
                        isDev: isDevelopment,
                    },
                ]
            ], lodash_1.default.get(extraBabelOptions, 'presets', []), true), plugins: __spreadArray([], lodash_1.default.get(extraBabelOptions, 'plugins', []), true).filter(Boolean) }, lodash_1.default.omit(extraBabelOptions, ['presets', 'plugins'])));
        config.module
            .rule('modules')
            .test(/\.m?jsx?$/)
            .resolve.set('fullySpecified', false);
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
        config.module
            .rule('svg')
            .test(/\.(svg)(\?.*)?$/)
            .use('file-loader')
            .loader(require.resolve('file-loader'))
            .options({
            name: 'static/[name].[hash:8].[ext]',
            esModule: false,
        });
        config.module
            .rule('fonts')
            .test(/\.(eot|woff|woff2|ttf)(\?.*)?$/)
            .use('file-loader')
            .loader(require.resolve('file-loader'))
            .options({
            name: 'static/[name].[hash:8].[ext]',
            esModule: false,
        });
        config.module
            .rule('plaintext')
            .test(/\.(txt|text|md)$/)
            .use('raw-loader')
            .loader(require.resolve('raw-loader'));
        config
            .plugin('webpack-node-polyfill')
            .use(node_polyfill_webpack_plugin_1.default, [{ excludeAliases: ['console'] }]);
        config.when(Boolean(buildNotifier), function (config) {
            var opts = {
                title: 'simo build',
                logo: path_1.default.resolve(__dirname, '../statics/webpack_logo.ico'),
            };
            if (typeof buildNotifier === 'string') {
                opts = __assign(__assign({}, opts), { title: buildNotifier });
            }
            else if (typeof buildNotifier === 'object') {
                opts = __assign(__assign({}, opts), buildNotifier);
            }
            config.plugin('build-notifier').use(webpack_build_notifier_1.default, [opts]);
        });
        config.plugin('eslint').use(eslint_webpack_plugin_1.default, [
            {
                context: context,
                extensions: ['js', 'mjs', 'jsx', 'ts', 'tsx'],
                eslintPath: require.resolve('eslint'),
                cache: true,
            },
        ]);
        var newEnvs = __assign(__assign({}, define), env);
        var stringfyEnvs = {};
        Object.keys(newEnvs).forEach(function (key) { return (stringfyEnvs[key] = JSON.stringify(newEnvs[key])); });
        config.plugin('define').use(webpack_1.DefinePlugin, [stringfyEnvs]);
        config.plugin('progress').use(webpackbar_1.default, [
            isDevelopment
                ? {
                    name: 'simo serve',
                    color: 'green',
                }
                : {
                    name: 'simo build',
                    color: 'orange',
                },
        ]);
        config.plugin('ignore').use(webpack_1.IgnorePlugin, [
            {
                resourceRegExp: /^\.\/locale$/,
                contextRegExp: /moment$/,
            },
        ]);
        config.when(pages, function (config) {
            var _loop_1 = function (key) {
                var _a = pages[key], entry = _a.entry, template = _a.template, _b = _a.htmlWebpackPluginOptions, htmlWebpackPluginOptions = _b === void 0 ? {} : _b;
                if (Array.isArray(entry)) {
                    entry.forEach(function (en) { return config.entry(key).add(api.resolve(en)); });
                }
                else {
                    config.entry(key).add(api.resolve(entry));
                }
                if (template) {
                    config.plugin("html-template-" + key).use(html_webpack_plugin_1.default, [
                        __assign(__assign({ filename: key + ".html", template: api.resolve(template), inject: true, chunks: [key] }, htmlWebpackPluginOptions), { alwaysWriteToDisk: true }),
                    ]);
                }
            };
            for (var key in pages) {
                _loop_1(key);
            }
        });
    });
});

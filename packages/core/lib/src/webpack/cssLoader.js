"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mini_css_extract_plugin_1 = __importDefault(require("mini-css-extract-plugin"));
var css_minimizer_webpack_plugin_1 = __importDefault(require("css-minimizer-webpack-plugin"));
exports.default = (function (config, _a) {
    var isProd = _a.isProd, sourceMap = _a.sourceMap, filename = _a.filename, chunkFilename = _a.chunkFilename, browsersList = _a.browsersList, cssExtract = _a.cssExtract;
    function createCSSRule(_a) {
        var lang = _a.lang, test = _a.test, loader = _a.loader, options = _a.options;
        var baseRule = config.module.rule(lang).test(test);
        var extModulesRule = baseRule.oneOf('css-modules').resourceQuery(/modules/);
        applyLoaders(extModulesRule, true);
        var normalRule = baseRule.oneOf('normal');
        applyLoaders(normalRule, false);
        function applyLoaders(rule, modules) {
            if (isProd && cssExtract) {
                rule.use('extract-css-loader').loader(mini_css_extract_plugin_1.default.loader);
            }
            else {
                rule.use('style-loader').loader('style-loader');
            }
            var cssLoaderOptions = {
                modules: modules
                    ? {
                        localIdentName: '[path][name]-[local]_[hash:base64:5]',
                    }
                    : false,
                sourceMap: sourceMap,
                importLoaders: 10,
            };
            rule.use('css-loader').loader('css-loader').options(cssLoaderOptions);
            rule
                .use('postcss-loader')
                .loader(require.resolve('postcss-loader'))
                .options({
                ident: 'postcss',
                plugins: function () { return [
                    require('postcss-flexbugs-fixes'),
                    require('postcss-preset-env')({
                        autoprefixer: {},
                        stage: 3,
                    }),
                ]; },
            });
            if (loader) {
                rule.use(loader).loader(loader).options(Object.assign({ sourceMap: sourceMap }, options));
            }
        }
    }
    createCSSRule({ lang: 'css', test: /\.css$/ });
    createCSSRule({ lang: 'postcss', test: /\.p(ost)?css$/ });
    createCSSRule({
        lang: 'less',
        test: /\.less$/,
        loader: 'less-loader',
        options: {
            lessOptions: {
                javascriptEnabled: true,
            },
        },
    });
    createCSSRule({
        lang: 'sass',
        test: /\.s(c|a)ss$/,
        loader: 'sass-loader',
        options: { implementation: require('sass') },
    });
    if (isProd && cssExtract) {
        config.plugin('extract-css').use(mini_css_extract_plugin_1.default, [{ filename: filename, chunkFilename: chunkFilename }]);
        config.optimization.minimizer('css-minimizer').use(css_minimizer_webpack_plugin_1.default);
    }
});

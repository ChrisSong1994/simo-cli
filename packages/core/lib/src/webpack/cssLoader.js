"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mini_css_extract_plugin_1 = __importDefault(require("mini-css-extract-plugin"));
var optimize_css_assets_webpack_plugin_1 = __importDefault(require("optimize-css-assets-webpack-plugin"));
var postcss_safe_parser_1 = __importDefault(require("postcss-safe-parser"));
/**
 * @param {*} webpackConfig webpack-chain配置对象
 * @param {*} param
 * isProd  是否生产环境关联分离css为单独文件
 * sourceMap 是否生成sourceMap
 * filename 生成文件路径
 * chunkFilename  生成文件路径
 * publicPath 资源文件路径publicPath，以output文件夹为根路径
 */
exports.default = (function (config, _a) {
    var isProd = _a.isProd, sourceMap = _a.sourceMap, filename = _a.filename, chunkFilename = _a.chunkFilename, publicPath = _a.publicPath;
    var cssnanoOptions = {
        preset: [
            'default',
            {
                mergeLonghand: false,
                cssDeclarationSorter: false,
            },
        ],
    };
    // 创建样式规则
    function createCSSRule(_a) {
        var lang = _a.lang, test = _a.test, loader = _a.loader, options = _a.options;
        var baseRule = config.module.rule(lang).test(test);
        // 匹配 *.module.* 样式文件
        var extModulesRule = baseRule.oneOf('css-modules').resourceQuery(/modules/);
        applyLoaders(extModulesRule, true);
        // 普通样式文件
        var normalRule = baseRule.oneOf('normal');
        applyLoaders(normalRule, false);
        // 执行样式loader
        function applyLoaders(rule, modules) {
            if (isProd) {
                rule.use('extract-css-loader').loader(mini_css_extract_plugin_1.default.loader);
            }
            else {
                rule.use('style-loader').loader('style-loader');
            }
            var cssLoaderOptions = {
                modules: modules,
                sourceMap: sourceMap,
                importLoaders: 1 + (isProd ? 1 : 0),
            };
            rule.use('css-loader').loader('css-loader').options(cssLoaderOptions);
            rule
                .use('postcss-loader')
                .loader('postcss-loader')
                .options({
                sourceMap: sourceMap,
                postcssOptions: {
                    plugins: [
                        // https://github.com/luisrudge/postcss-flexbugs-fixes
                        require('postcss-flexbugs-fixes'),
                        require('autoprefixer'),
                    ],
                },
            });
            if (loader) {
                rule.use(loader).loader(loader).options(Object.assign({ sourceMap: sourceMap }, options));
            }
        }
    }
    createCSSRule({ lang: 'css', test: /\.css$/ });
    createCSSRule({ lang: 'postcss', test: /\.p(ost)?css$/ });
    createCSSRule({ lang: 'less', test: /\.less$/, loader: 'less-loader' });
    /**
     * css 压缩
     * */
    if (isProd) {
        // inject CSS extraction plugin
        config.plugin('extract-css').use(mini_css_extract_plugin_1.default, [{ filename: filename, chunkFilename: chunkFilename }]);
        /**
         * 压缩css
         */
        config.optimization.minimizer('optimize').use(optimize_css_assets_webpack_plugin_1.default, [
            {
                cssProcessorOptions: {
                    parser: postcss_safe_parser_1.default,
                    map: false,
                },
            },
        ]);
    }
});
//# sourceMappingURL=cssLoader.js.map
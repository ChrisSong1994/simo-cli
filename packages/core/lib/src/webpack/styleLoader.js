"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mini_css_extract_plugin_1 = require("mini-css-extract-plugin");
/**
 * @param {*} webpackConfig webpack-chain配置对象
 * @param {*} param
 * isProd  是否生产环境关联分离css为单独文件
 * sourceMap 是否生成sourceMap
 * filename 生成文件路径
 * chunkFilename  生成文件路径
 * publicPath 资源文件路径publicPath，以output文件夹为根路径
 */
exports.default = (config, { isProd, sourceMap, filename, chunkFilename, publicPath }) => {
    // 创建样式规则
    function createCSSRule({ lang, test, loader, options }) {
        const baseRule = config.module.rule(lang).test(test);
        // 匹配 *.module.* 样式文件
        const extModulesRule = baseRule.oneOf('normal-modules').test(/\.module\.\w+$/);
        applyLoaders(extModulesRule, true);
        // 普通样式文件
        const normalRule = baseRule.oneOf('normal');
        applyLoaders(extModulesRule, false);
        // 执行样式
        function applyLoaders(rule, modules) {
            if (isProd) {
                rule.use('extract-css-loader').loader(mini_css_extract_plugin_1.loader).options({
                    publicPath: publicPath,
                });
            }
            else {
                rule.use('style-loader').loader('style-loader');
            }
            const cssLoaderOptions = {
                modules,
                sourceMap,
                importLoaders: 2 + (isProd ? 1 : 0),
            };
            rule.use('css-loader').loader('css-loader').options(cssLoaderOptions);
            // if (isProd) {
            //   rule
            //     .use('cssnano')
            //     .loader('postcss-loader')
            //     .options({
            //       sourceMap,
            //       plugins: [require('cssnano')(cssnanoOptions)],
            //     });
            // }
            rule.use('postcss-loader').loader('postcss-loader').options({ sourceMap });
            if (loader) {
                rule.use(loader).loader(loader).options(Object.assign({ sourceMap }, options));
            }
        }
    }
    createCSSRule({ lang: 'css', test: /\.css$/ });
    createCSSRule({ lang: 'postcss', test: /\.p(ost)?css$/ });
    createCSSRule({ lang: 'scss', test: /\.scss$/, loader: 'sass-loader' });
    createCSSRule({
        lang: 'sass',
        test: /\.sass$/,
        loader: 'sass-der ',
        options: { indentedSyntax: true },
    });
    createCSSRule({ lang: 'less', test: /\.less$/, loader: 'less-loader' });
};
//# sourceMappingURL=styleLoader.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const html_webpack_plugin_1 = __importDefault(require("html-webpack-plugin"));
exports.default = (api) => {
    api.chainWebpack((config) => {
        const env = api.env;
        const { alias, pages = {} } = api.simoConfig;
        // 设置context
        config.context(api.context).target('web');
        // output配置
        config.output.path(api.resolve('build')).publicPath('./');
        // loader 配置
        // babel-loader
        config.module
            .rule('compile')
            .test(/\.(js|mjs|jsx|ts|tsx)$/)
            .use('babel')
            .loader('babel-loader');
        config.module
            .rule('images')
            .test(/\.(png|jpe?g|gif|webp|ico)(\?.*)?$/)
            .use('url-loader')
            .loader(require.resolve('url-loader'))
            .options({
            limit: api.simoConfig.inlineLimit || 10000,
            name: 'static/[name].[hash:8].[ext]',
            // require 图片的时候不用加 .default
            esModule: false,
            fallback: {
                loader: require.resolve('file-loader'),
                options: {
                    name: 'static/[name].[hash:8].[ext]',
                    esModule: false,
                },
            },
        });
        // 模版
        config
            .plugin('html-template')
            .use(html_webpack_plugin_1.default, [
            {
                template: path_1.default.resolve(api.context(), './public/index.html'),
            },
        ])
            .end();
    });
};
//# sourceMappingURL=webpack.base.config.js.map
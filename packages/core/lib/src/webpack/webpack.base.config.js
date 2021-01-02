"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const html_webpack_plugin_1 = __importDefault(require("html-webpack-plugin"));
exports.default = (api) => {
    api.chainWebpack((config) => {
        const env = api.env();
        const { alias, pages = {} } = api.simoConfig();
        // 设置context
        config.context(api.context()).target('web');
        // output配置
        config.output.path(api.resolve('build')).publicPath('./');
        // loader 配置
        // babel-loader
        config.module.rule('compile').test(/\.js$/).use('babel').loader('babel-loader');
        config.module.rule('');
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
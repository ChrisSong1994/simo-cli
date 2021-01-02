"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cssLoader_1 = __importDefault(require("./cssLoader"));
exports.default = (api) => {
    api.chainWebpack((config) => {
        if (api.mode !== 'development')
            return;
        // 加载样式
        cssLoader_1.default(config, {
            isProd: false,
            sourceMap: true,
            filename: 'static/css/[name].css',
            chunkFilename: 'static/css/[id].css',
            publicPath: '../../',
        });
        /**
         * 配置模式与devtool
         */
        config.watch(true).mode('development');
        /**
         * devServer
         */
        config.devServer
            // 热更新ws地址与location.host保持一致
            .port(8080)
            .hot(true)
            .open(true)
            .contentBase(api.resolve('dist'));
    });
};
//# sourceMappingURL=webpack.dev.config.js.map
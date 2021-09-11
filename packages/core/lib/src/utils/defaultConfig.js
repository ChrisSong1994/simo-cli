"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var simo_utils_1 = require("@chrissong/simo-utils");
exports.default = {
    target: 'web',
    // copyPath: 'src/statics', // 可选：string|object[] 静态文件拷贝目录
    output: {
        path: 'dist',
    },
    publicPath: './',
    // alias: {
    //   // 可选： 配置
    //   '@': './src',
    // },
    port: 8080,
    host: 'localhost',
    proxy: {
    // 可选：配置代理能力
    },
    devtool: 'cheap-module-source-map',
    externals: {
    // 可选： 设置哪些模块可以不被打包，通过 <script> 或其他方式引入
    // react: 'React',
    // lodash: 'lodash',
    },
    pages: {
        // 必选：页面的入口和模版配置
        index: {
            entry: './src/index.js',
            template: './public/index.html',
            htmlWebpackPluginOptions: {
                // 可选：配置html内变量
                __param: '111',
            },
        },
    },
    parallel: simo_utils_1.hasMultipleCores(),
    browsersList: ['> 1%', 'last 2 versions', 'not ie <= 10'],
    extraBabelOptions: {
        // 可选：默认{}
        presets: [],
        plugins: [],
    },
    define: {},
    tsTypeCheck: true,
    fastRefresh: true,
    chainWebpack: function () { },
};
//# sourceMappingURL=defaultConfig.js.map
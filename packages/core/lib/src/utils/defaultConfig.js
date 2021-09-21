"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var simo_utils_1 = require("@chrissong/simo-utils");
exports.default = {
    target: ['web', 'es5'],
    output: {
        path: 'dist',
    },
    outputEnvironment: {
        arrowFunction: false,
        bigIntLiteral: false,
        const: false,
        destructuring: false,
        dynamicImport: false,
        forOf: false,
        module: false,
    },
    cssExtract: false,
    buildNotifier: true,
    publicPath: './',
    port: 8080,
    host: 'localhost',
    inlineLimit: 1000,
    proxy: {},
    devtool: 'cheap-module-source-map',
    externals: {},
    pages: {
        index: {
            entry: './src/index.js',
            template: './public/index.html',
            htmlWebpackPluginOptions: {
                __param: '111',
            },
        },
    },
    parallel: (0, simo_utils_1.hasMultipleCores)(),
    browsersList: ['> 1%', 'last 2 versions', 'not ie <= 10'],
    extraBabelOptions: {
        presets: [],
        plugins: [],
    },
    define: {},
    tsTypeCheck: true,
    fastRefresh: true,
    watchFiles: [
        '.env',
        '.eslintrc',
        '.eslintrc.js',
        '.eslintignore',
        'tsconfig.json',
        'simo.config.js',
        'simo.config.ts',
    ],
    chainWebpack: function () { },
};

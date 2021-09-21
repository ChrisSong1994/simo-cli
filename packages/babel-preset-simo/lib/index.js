"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
exports.default = (function (_context, opts) {
    if (opts === void 0) { opts = {}; }
    var presets = [
        [
            require('@babel/preset-env').default,
            {
                modules: false,
            },
        ],
        [require('@babel/preset-react').default],
        opts.typescript && [
            require('@babel/preset-typescript'),
            {
                allowNamespaces: true,
            },
        ],
    ].filter(Boolean);
    var plugins = [
        opts.refresh && opts.isDev && [require('react-refresh/babel')],
        [require('@chrissong/babel-auto-css-modules').default],
        [require('@babel/plugin-proposal-decorators').default, { legacy: true }],
        [require('@babel/plugin-proposal-export-default-from').default, { loose: true }],
        [require('@babel/plugin-syntax-dynamic-import').default],
        [
            require('@babel/plugin-transform-runtime').default,
            {
                version: require('@babel/runtime/package.json').version,
                absoluteRuntime: path_1.default.dirname(require.resolve('@babel/runtime/package.json')),
                useESModules: true,
            },
        ],
    ].filter(Boolean);
    return {
        presets: presets,
        plugins: plugins,
    };
});

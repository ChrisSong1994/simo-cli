"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
function toObject(obj) {
    return typeof obj === 'object' ? obj : {};
}
var defaultEnvConfig = {
    exclude: [
        'transform-typeof-symbol',
        'transform-unicode-regex',
        'transform-sticky-regex',
        'transform-new-target',
        'transform-modules-umd',
        'transform-modules-systemjs',
        'transform-modules-amd',
        'transform-literals',
    ],
};
exports.default = (function (context, opts) {
    if (opts === void 0) { opts = {}; }
    var presets = [
        opts.env && [require('@babel/preset-env').default],
        opts.react && [require('@babel/preset-react').default],
        opts.typescript && [
            require('@babel/preset-typescript').default,
            {
                // https://babeljs.io/docs/en/babel-plugin-transform-typescript#impartial-namespace-support
                allowNamespaces: true,
            },
        ],
    ].filter(Boolean);
    var plugins = [
        [require('@chrissong/babel-auto-css-modules').default],
        [require('@babel/plugin-proposal-decorators').default, { legacy: true }],
        [require('@babel/plugin-proposal-class-properties').default, { loose: true }],
        [require('@babel/plugin-proposal-export-default-from').default, { loose: true }],
        [require('@babel/plugin-syntax-dynamic-import').default],
        [
            require('@babel/plugin-transform-runtime').default,
            {
                version: require('@babel/runtime/package.json').version,
                // https://babeljs.io/docs/en/babel-plugin-transform-runtime#absoluteruntime
                // lock the version of @babel/runtime
                // make sure we are using the correct version
                absoluteRuntime: path_1.default.dirname(require.resolve('@babel/runtime/package.json')),
                // https://babeljs.io/docs/en/babel-plugin-transform-runtime#useesmodules
                useESModules: true,
            },
        ],
    ];
    return {
        presets: presets,
        plugins: plugins,
    };
});
//# sourceMappingURL=index.js.map
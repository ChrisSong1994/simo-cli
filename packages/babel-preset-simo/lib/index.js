"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function toObject(obj) {
    return typeof obj === 'object' ? obj : {};
}
const defaultEnvConfig = {
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
exports.default = (context, opts = {}) => {
    const presets = [
        opts.env && [require('@babel/preset-env').default],
        opts.react && [require('@babel/preset-react').default],
        opts.typescript && [
            require('@babel/preset-typescript').default,
            {
                // https://babeljs.io/docs/en/babel-plugin-transform-typescript#impartial-namespace-support
                allowNamespaces: true,
            },
        ],
    ];
    // const presets = [require('@babel/preset-env').default, require('@babel/preset-react').default];
    const plugins = [
        require('@babel/plugin-syntax-dynamic-import').default,
        require('@chrissong/babel-auto-css-modules').default,
    ];
    return {
        presets,
        plugins,
    };
};
//# sourceMappingURL=index.js.map
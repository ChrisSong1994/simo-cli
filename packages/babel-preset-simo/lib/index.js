"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = () => {
    const presets = [require('@babel/preset-env').default, require('@babel/preset-react').default];
    const plugins = [require('@babel/plugin-syntax-dynamic-import')];
    return {
        presets,
        plugins,
    };
};
//# sourceMappingURL=index.js.map
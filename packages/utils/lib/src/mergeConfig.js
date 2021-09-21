"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
function mergeConfig(defaultConfig) {
    var configs = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        configs[_i - 1] = arguments[_i];
    }
    var ret = __assign({}, defaultConfig);
    configs.forEach(function (config) {
        if (!config)
            return;
        Object.keys(config).forEach(function (key) {
            var val = config[key];
            if (typeof val === 'function') {
                ret[key] = val(ret[key]);
            }
            else {
                ret[key] = val;
            }
        });
    });
    return ret;
}
exports.default = mergeConfig;

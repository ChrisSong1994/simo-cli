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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = __importDefault(require("lodash"));
var getProxyConfig = function (proxy) {
    if (lodash_1.default.isArray(proxy))
        return proxy;
    var result = Object.keys(proxy).map(function (context) {
        if (typeof proxy[context] === 'string') {
            return {
                context: context,
                target: proxy[context],
                changeOrigin: true,
                secure: false,
                logLevel: 'debug',
            };
        }
        else {
            return __assign({ context: context }, proxy[context]);
        }
    });
    return result;
};
exports.default = getProxyConfig;
//# sourceMappingURL=getProxy.js.map
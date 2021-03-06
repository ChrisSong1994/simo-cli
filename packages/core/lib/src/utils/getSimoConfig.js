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
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
var defaultConfig_1 = __importDefault(require("../constant/defaultConfig"));
exports.default = (function (cwd, env) {
    // 匹配 simo.config.(j|t)s
    var jsConfPathExist = fs_1.default.existsSync(path_1.default.resolve(cwd, './simo.config.js'));
    var tsConfPathExist = fs_1.default.existsSync(path_1.default.resolve(cwd, './simo.config.ts'));
    var config = null;
    if (!tsConfPathExist && !jsConfPathExist) {
        throw new Error(cwd + " \u8DEF\u5F84\u4E0B\u4E0D\u5B58\u5728 simo.config \u914D\u7F6E\u6587\u4EF6");
    }
    if (tsConfPathExist) {
        config = require(path_1.default.resolve(cwd, './simo.config.ts'));
    }
    else if (jsConfPathExist) {
        config = require(path_1.default.resolve(cwd, './simo.config.js'));
    }
    // 支持对象和函数两种方式
    return typeof config === 'function'
        ? __assign(__assign({}, defaultConfig_1.default), config(env)) : __assign(__assign({}, defaultConfig_1.default), { config: config });
});
//# sourceMappingURL=getSimoConfig.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
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
    return typeof config === 'function' ? config(env) : config;
});
//# sourceMappingURL=getSimoConfig.js.map
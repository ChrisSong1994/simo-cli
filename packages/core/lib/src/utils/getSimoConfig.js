"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
// import defineConfig from './defineConfig';
exports.default = (function (cwd) {
    // 匹配 simo.config.(j|t)s
    var jsConfPathExist = fs_1.default.existsSync(path_1.default.resolve(cwd, './simo.config.js'));
    var tsConfPathExist = fs_1.default.existsSync(path_1.default.resolve(cwd, './simo.config.ts'));
    if (!tsConfPathExist && !jsConfPathExist) {
        throw new Error(cwd + " \u8DEF\u5F84\u4E0B\u4E0D\u5B58\u5728 simo.config \u914D\u7F6E\u6587\u4EF6");
    }
    if (tsConfPathExist) {
        return require(path_1.default.resolve(cwd, './simo.config.ts'));
    }
    else if (jsConfPathExist) {
        return require(path_1.default.resolve(cwd, './simo.config.js'));
    }
});
//# sourceMappingURL=getSimoConfig.js.map
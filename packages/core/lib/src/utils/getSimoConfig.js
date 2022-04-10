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
exports.CONFIG_FILES = void 0;
var path_1 = __importDefault(require("path"));
var simo_utils_1 = require("@chrissong/simo-utils");
var defaultConfig_1 = __importDefault(require("./defaultConfig"));
var verifyConfig_1 = __importDefault(require("./verifyConfig"));
var getExistFile_1 = __importDefault(require("./getExistFile"));
exports.CONFIG_FILES = ['simo.config.js', 'simo.config.ts', '.simorc.ts', '.simorc.js'];
exports.default = (function (cwd, env) {
    var configFile = (0, getExistFile_1.default)({
        cwd: cwd,
        files: exports.CONFIG_FILES,
        returnRelative: false,
    });
    if (!configFile) {
        throw new Error("".concat(cwd, " \u8DEF\u5F84\u4E0B\u4E0D\u5B58\u5728 simo-cli \u7684\u914D\u7F6E\u6587\u4EF6"));
    }
    var config = require(path_1.default.resolve(cwd, configFile));
    if (typeof config === 'function') {
        config = __assign(__assign({}, defaultConfig_1.default), config(env));
    }
    else if (typeof config === 'object' && config !== null) {
        config = __assign(__assign({}, defaultConfig_1.default), config);
    }
    var _a = (0, verifyConfig_1.default)(config), error = _a.error, value = _a.value;
    if (error) {
        simo_utils_1.logger.error("\u914D\u7F6E\u9879\u9519\u8BEF:".concat(error));
        process.exit(1);
    }
    else {
        return value;
    }
});

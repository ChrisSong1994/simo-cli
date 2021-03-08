"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var schema = joi_1.default.object({
    publicPath: joi_1.default.string(),
    staticPath: joi_1.default.string(),
    target: joi_1.default.string(),
    alias: joi_1.default.object(),
    output: joi_1.default.object({
        path: joi_1.default.string(),
        filename: joi_1.default.string(),
        library: joi_1.default.string(),
        libraryTarget: joi_1.default.string(),
    }),
    devtool: joi_1.default.string(),
    parallel: joi_1.default.boolean(),
    port: joi_1.default.number().integer().min(0),
    host: joi_1.default.string(),
    proxy: joi_1.default.object(),
    externals: joi_1.default.object(),
    pages: joi_1.default.object(),
    browsersList: joi_1.default.array(),
    chainWebpack: joi_1.default.function(),
    extraBabelOptions: joi_1.default.object(),
    ignoreMomentLocale: joi_1.default.boolean(),
});
exports.default = (function (value) {
    return schema.validate(value);
});
//# sourceMappingURL=verifyConfig.js.map
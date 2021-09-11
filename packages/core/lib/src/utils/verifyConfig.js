"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var schema = joi_1.default.object({
    alias: joi_1.default.object(),
    browsersList: joi_1.default.array(),
    copyPath: joi_1.default.alternatives(joi_1.default.string(), joi_1.default.array()),
    chainWebpack: joi_1.default.function(),
    define: joi_1.default.object(),
    devtool: joi_1.default.string(),
    externals: joi_1.default.object(),
    extraBabelOptions: joi_1.default.object(),
    fastRefresh: joi_1.default.boolean(),
    host: joi_1.default.string(),
    pages: joi_1.default.object(),
    parallel: joi_1.default.boolean(),
    port: joi_1.default.number().integer().min(0),
    proxy: joi_1.default.object(),
    publicPath: joi_1.default.string(),
    output: joi_1.default.object({
        path: joi_1.default.string().required(),
        filename: joi_1.default.string(),
        chunkFilename: joi_1.default.string(),
        library: joi_1.default.string(),
        libraryTarget: joi_1.default.string(),
    }),
    target: joi_1.default.string(),
    tsTypeCheck: joi_1.default.boolean(),
});
exports.default = (function (value) {
    return schema.validate(value);
});
//# sourceMappingURL=verifyConfig.js.map
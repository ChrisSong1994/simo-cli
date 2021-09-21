"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var schema = joi_1.default.object({
    alias: joi_1.default.object(),
    browsersList: joi_1.default.array(),
    buildNotifier: joi_1.default.alternatives(joi_1.default.boolean(), joi_1.default.string(), joi_1.default.object()),
    copyPath: joi_1.default.alternatives(joi_1.default.string(), joi_1.default.array()),
    chainWebpack: joi_1.default.function(),
    cssExtract: joi_1.default.boolean(),
    define: joi_1.default.object(),
    devtool: joi_1.default.string(),
    externals: joi_1.default.alternatives(joi_1.default.string(), joi_1.default.function(), joi_1.default.object()),
    extraBabelOptions: joi_1.default.object(),
    fastRefresh: joi_1.default.boolean(),
    host: joi_1.default.string(),
    inlineLimit: joi_1.default.number(),
    pages: joi_1.default.object().required(),
    parallel: joi_1.default.boolean(),
    port: joi_1.default.number().integer().min(0),
    proxy: joi_1.default.object(),
    publicPath: joi_1.default.string(),
    output: joi_1.default.object({
        path: joi_1.default.string().required(),
        filename: joi_1.default.string(),
        chunkFilename: joi_1.default.string(),
        library: joi_1.default.alternatives(joi_1.default.string(), joi_1.default.array(), joi_1.default.object()),
    }).required(),
    outputEnvironment: joi_1.default.object(),
    target: joi_1.default.alternatives(joi_1.default.string(), joi_1.default.boolean(), joi_1.default.array()),
    tsTypeCheck: joi_1.default.boolean(),
    watchFiles: joi_1.default.array(),
});
exports.default = (function (value) {
    return schema.validate(value);
});

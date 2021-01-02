"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const webpack_1 = __importDefault(require("webpack"));
const simo_utils_1 = require("@chrissong/simo-utils");
const api_1 = __importDefault(require("../api"));
const build = async (options) => {
    const api = new api_1.default('production', options);
    const config = await api.resolveWebpackConfig();
    return new Promise((resolve, reject) => {
        webpack_1.default(config, (err, stats) => {
            if (err)
                return reject(err);
            // 打印结果
            process.stdout.write(stats.toString({
                colors: true,
                modules: false,
                children: false,
                chunks: false,
                chunkModules: false,
            }) + '\n\n');
            if (stats.hasErrors()) {
                simo_utils_1.logger.error('打包失败');
                reject(new Error('Webpack build failed'));
            }
            else if (stats.hasWarnings()) {
                simo_utils_1.logger.warn('打包成功，但具有警告信息');
                resolve('success');
            }
            else {
                simo_utils_1.logger.done('打包成功');
                resolve('success');
            }
        });
    });
};
exports.default = build;
//# sourceMappingURL=exec.js.map
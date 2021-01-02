"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const simo_utils_1 = require("@chrissong/simo-utils");
const utils_1 = require("../utils");
const exec_1 = __importDefault(require("./exec"));
/**
 * 使用子进程是为了修正webpack执行的时候的process.cwd
 * 如果不正确则可能出现打包错误
 */
exports.default = (cli, argv) => {
    simo_utils_1.logger.log('🚀  正在打包,请稍等...');
    simo_utils_1.loadEnv(process.cwd());
    // 先设置环境变量，以便在配置文件中使用
    const env = Object.assign(process.env, {
        CMD: 'build',
        NODE_ENV: 'production',
        BABEL_ENV: 'production',
    });
    exec_1.default({
        env: env,
        argv: argv,
        cwd: cli.root,
        simoConfig: utils_1.getSimoConfig(cli.root),
    }).catch((err) => {
        simo_utils_1.logger.log(err);
        process.exit(1);
    });
};
//# sourceMappingURL=index.js.map
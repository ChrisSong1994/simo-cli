"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = __importDefault(require("yargs"));
const process_1 = __importDefault(require("process"));
const simo_utils_1 = require("@chrissong/simo-utils");
const command_1 = __importDefault(require("./command"));
const exec_1 = __importDefault(require("./exec"));
const getSimoConfig_1 = __importDefault(require("../utils/getSimoConfig"));
const { cmd, desc, builder } = command_1.default;
yargs_1.default
    .command(cmd, desc, builder, (argv) => {
    const cwd = process_1.default.cwd();
    //   加载环境变量
    simo_utils_1.loadEnv(cwd);
    const env = Object.assign(process_1.default.env, {
        CMD: 'server',
        NODE_ENV: 'development',
        BABEL_ENV: 'development',
    });
    // 执行开发服务
    exec_1.default({ env, argv, cwd, simoConfig: getSimoConfig_1.default(cwd) }).catch((err) => {
        simo_utils_1.logger.log(err);
        if (process_1.default.send) { // 只存在于子进程当中
            process_1.default.send('EXIT_WITH_ERROR');
        }
    });
})
    .parse(process_1.default.argv.slice(2));
//# sourceMappingURL=server.js.map
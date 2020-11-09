"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const yargs_1 = __importDefault(require("yargs"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const chalk_1 = __importDefault(require("chalk"));
const child_process_1 = require("child_process");
const lib_1 = require("/Users/songjun/WorkSpace/\u5B66\u4E60/git/modules/simo-cli/packages/utils/lib");
const lodash_1 = __importDefault(require("lodash"));
const defaultPlugins = [];
/** 命令行
 * 1.初始化命令行参数
 * 2.检查包更新情况
 * 3.获取项目配置，加载命令，监听进程
 * */
class Cli {
}
exports.default = Cli;
(cwd) => {
    this.plugins = defaultPlugins;
    this.root = cwd;
    this.subprocess = [];
    this.env = lodash_1.default.cloneDeep(process.env);
    this.processMonitor();
    this.init();
};
init();
{
    this.pkg = this.resolvePackages();
}
resolvePackages();
{
    const pkgPath = path_1.default.resolve(this.root, 'package.json');
    if (fs_extra_1.default.existsSync(pkgPath)) {
        return require(pkgPath);
    }
    else {
        lib_1.logger.error(`读取${pkgPath}失败！`);
        process.exit(1);
    }
}
child_process_1.fork(path_1.default, string, argv, string[], options, ForkOptions);
{
    const subprocess = child_process_1.fork(path_1.default, argv, { env: this.env, ...options });
    subprocess.on('close', () => {
        const index = this.subprocess.findIndex((item) => item === subprocess);
        this.subprocess.splice(index, 1);
    });
    this.subprocess.push(subprocess);
}
processMonitor();
{
    const handleExit = (signal) => {
        lib_1.logger.done(`🙋 接受到信号：${signal} 即将退出程序...`);
        this.subprocess.forEach((subprocess) => {
            if (!subprocess.killed)
                subprocess.kill();
        });
        process.exit(0);
    };
    process.on('SIGINT', handleExit);
    process.on('SIGTERM', handleExit);
}
register(cmd, string, desc, string, ...args, any);
{
    const name = cmd.split(/\s+/)[0];
    // 只能有数字、字母、下划线、冒号组成
    if (!/^[\w]+$/.test(name)) {
        throw new Error(`命令名称 ${chalk_1.default.redBright(name)} 不合法，只能是字母、数字、下划线`);
    }
    if (this.commands[name])
        throw new Error(`命令 ${chalk_1.default.redBright(name)} 已经被占用`);
    yargs_1.default.command(cmd, desc, ...args);
}
//# sourceMappingURL=cli.js.map
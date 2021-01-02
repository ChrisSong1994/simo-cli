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
const simo_utils_1 = require("@chrissong/simo-utils");
const lodash_1 = __importDefault(require("lodash"));
const fkill_1 = __importDefault(require("fkill"));
const init_1 = __importDefault(require("./src/init"));
const server_1 = __importDefault(require("./src/server"));
const build_1 = __importDefault(require("./src/build"));
const defaultPlugins = [init_1.default, server_1.default, build_1.default];
/** 命令行
 * 1.初始化命令行参数
 * 2.检查包更新情况
 * 3.获取项目配置，加载命令，监听进程
 * */
class Cli {
    constructor(cwd, argv = []) {
        this.plugins = defaultPlugins;
        this.root = cwd;
        this.argv = argv;
        this.subprocess = [];
        this.commands = {};
        this.env = lodash_1.default.cloneDeep(process.env);
        this.processMonitor();
        this.init();
    }
    init() {
        this.pkg = this.resolvePackages();
        // 初始化插件
        this.plugins.forEach((plugin) => plugin(this));
    }
    // 读取项目package.json
    resolvePackages() {
        const pkgPath = path_1.default.resolve(this.root, 'package.json');
        if (fs_extra_1.default.existsSync(pkgPath)) {
            return require(pkgPath);
        }
        else {
            simo_utils_1.logger.error(`读取${pkgPath}失败！`);
            process.exit(1);
        }
    }
    // 创建子进程执行
    fork(path, argv, options) {
        const subprocess = child_process_1.fork(path, argv, {
            env: this.env,
            execArgv: [`--inspect-brk=127.0.0.1:${process.debugPort + 1}`],
            ...options,
        });
        subprocess.on('close', () => {
            const index = this.subprocess.findIndex((item) => item === subprocess);
            this.subprocess.splice(index, 1);
        });
        this.subprocess.push(subprocess);
        return subprocess;
    }
    /**
     * 退出进程
     * @param {Number} code
     **/
    async exit(code) {
        const subPIds = this.subprocess.map((subp) => subp.pid);
        await fkill_1.default(subPIds, { force: true, tree: true });
        process.exit(code);
    }
    // 进程监听
    processMonitor() {
        const handleExit = (signal) => {
            simo_utils_1.logger.done(`🙋 接受到信号：${signal} 即将退出程序...`);
            this.subprocess.forEach((subprocess) => {
                if (!subprocess.killed)
                    subprocess.kill();
            });
            process.exit(0);
        };
        process.on('SIGINT', handleExit);
        process.on('SIGTERM', handleExit);
    }
    // 注册命令
    register(cmd, desc, ...args) {
        const name = cmd.split(/\s+/)[0];
        // 只能有数字、字母、下划线、冒号组成
        if (!/^[\w]+$/.test(name)) {
            throw new Error(`命令名称 ${chalk_1.default.redBright(name)} 不合法，只能是字母、数字、下划线`);
        }
        if (this.commands[name]) {
            throw new Error(`命令 ${chalk_1.default.redBright(name)} 已经被占用`);
        }
        yargs_1.default.command(cmd, desc, ...args);
        this.commands[name] = { cmd, desc, ...args };
    }
    // 解析命令
    parse(argv) {
        this.argv = argv;
        if (this.argv.length) {
            yargs_1.default.parse(this.argv);
        }
        else {
            yargs_1.default.showHelp();
        }
    }
}
exports.default = Cli;
//# sourceMappingURL=cli.js.map
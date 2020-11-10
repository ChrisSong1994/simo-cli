"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const simo_utils_1 = require("@chrissong/simo-utils");
const path_1 = __importDefault(require("path"));
const fkill_1 = __importDefault(require("fkill"));
const chokidar_1 = __importDefault(require("chokidar"));
const createServer = (cli) => {
    debugger;
    return cli
        .fork(path_1.default.resolve(__dirname, './server'), cli.argv, {
        cwd: cli.root,
        env: cli.env,
        stdio: 'inherit',
    })
        .on('message', (msg) => msg === 'EXIT_WITH_ERROR' && cli.exit(1));
};
exports.default = (cli) => {
    simo_utils_1.logger.log('🚀  正在启动开发服务,请稍等...');
    debugger;
    let serverprocess = createServer(cli);
    // 监听配置文件修改
    const watcher = chokidar_1.default.watch([
        '.env',
        '.eslintrc',
        '.eslintrc.js',
        '.eslintignore',
        '.babelrc',
        'babel.config.js',
        '.browserslistrc',
        'simo.config.js',
        'tsconfig.json',
    ], {
        cwd: cli.cwd,
    });
    watcher.on('change', async () => {
        simo_utils_1.logger.log('🚀  检测到配置文件变化,服务正在自动重启...');
        await fkill_1.default(serverprocess.pid);
        serverprocess = createServer(cli);
    });
};
//# sourceMappingURL=index.js.map
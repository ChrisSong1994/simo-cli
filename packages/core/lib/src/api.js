"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const simo_utils_1 = require("@chrissong/simo-utils");
class Api {
    constructor(mode, options) {
        this.mode = mode;
        this.options = options;
        this.pkg = this.resolvePackage();
    }
    /**
     * 环境变量
     */
    get env() {
        return this.options.env;
    }
    /**
     * 命令行参数
     */
    get argv() {
        const argv = this.options.argv;
        return {
            ...argv,
            open: argv.open || false,
            port: argv.port || 8080,
            report: argv.report || false,
            sourcemap: argv.sourcemap || false,
        };
    }
    /**
     * 当前程序执行路径
     * 等同于process.cwd和webpack的context路径
     */
    get context() {
        return this.options.context;
    }
    /**
     * resolve路径
     * @param {String} dir
     */
    resolve(dir) {
        return path_1.default.resolve(this.context, dir);
    }
    /**
     * 获取package.json信息
     */
    resolvePackage() {
        const pkg = this.resolve('package.json');
        if (simo_utils_1.fs.existsSync(pkg)) {
            try {
                return require(pkg);
            }
            catch (e) {
                simo_utils_1.logger.error(`读取 ${pkg} 失败`);
                return {};
            }
        }
        return {};
    }
}
exports.default = Api;
//# sourceMappingURL=api.js.map
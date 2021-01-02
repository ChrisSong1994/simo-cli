"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const webpack_chain_1 = __importDefault(require("webpack-chain"));
const path_1 = __importDefault(require("path"));
const simo_utils_1 = require("@chrissong/simo-utils");
class Api {
    constructor(mode, options) {
        this.mode = mode;
        this.options = this.formatOptions(options);
        this.pkg = this.resolvePackage();
        this.plugins = this.resolvePlugins();
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
        return this.options.cwd;
    }
    /**
     * config配置文件对象
     */
    get simoConfig() {
        return this.options.simoConfig;
    }
    /**
     * resolve路径
     * @param {String} dir
     */
    resolve(dir) {
        return path_1.default.resolve(this.context, dir);
    }
    /**
     * 格式化options参数
     * @param {OptionType} option
     */
    formatOptions(option) {
        const { baseURL = '', chainWebpack, ...restConfig } = option.simoConfig;
        return {
            ...option,
            simoConfig: {
                ...restConfig,
                baseURL: baseURL.replace(/^\/+|\/+$/g, ''),
                chainWebpack: (config) => {
                    if (typeof chainWebpack === 'function')
                        chainWebpack(config);
                    return config;
                },
            },
        };
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
    /**
     * 读取package.json中的插件
     */
    resolvePlugins() {
        const plugins = [
            './webpack/webpack.base.config',
            './webpack/webpack.dev.config',
            './webpack/webpack.prod.config',
        ];
        return plugins.map((id) => {
            try {
                return require(id).default;
            }
            catch (err) {
                simo_utils_1.logger.error(`插件 ${id} 加载失败`);
                throw err;
            }
        });
    }
    /**
     * 获取webpack config
     */
    async resolveWebpackConfig() {
        const config = new webpack_chain_1.default();
        const { chainWebpack } = this.simoConfig;
        // 生成webpack配置
        await simo_utils_1.parallelToSerial(this.plugins.map(this.use(config)));
        return chainWebpack(config).toConfig(); // 加载配置项的webpack 配置
    }
    /**
     * 注册执行插件
     * @param {WebpackChain} config
     */
    use(config) {
        return (plugin) => {
            const api = {
                env: this.env,
                pkg: this.pkg,
                mode: this.mode,
                argv: this.argv,
                simoConfig: this.simoConfig,
                context: this.context,
                resolve: (dir) => this.resolve(dir),
                chainWebpack: (callback) => callback(config),
            };
            return () => plugin(api);
        };
    }
}
exports.default = Api;
//# sourceMappingURL=api.js.map
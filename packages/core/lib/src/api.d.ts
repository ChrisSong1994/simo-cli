import WebpackChain from 'webpack-chain';
import { OptionType } from '../type';
export default class Api {
    private mode;
    private options;
    private pkg;
    private plugins;
    constructor(mode: string, options: OptionType);
    /**
     * 环境变量
     */
    get env(): any;
    /**
     * 命令行参数
     */
    get argv(): any;
    /**
     * 当前程序执行路径
     * 等同于process.cwd和webpack的context路径
     */
    get context(): any;
    /**
     * config配置文件对象
     */
    get simoConfig(): any;
    /**
     * resolve路径
     * @param {String} dir
     */
    resolve(dir: string): string;
    /**
     * 格式化options参数
     * @param {OptionType} option
     */
    formatOptions(option: OptionType): {
        simoConfig: {
            baseURL: string;
            chainWebpack: (config: WebpackChain) => WebpackChain;
        };
        env: import("../type").ObjType;
        argv: import("../type").ObjType;
        cwd: string;
    };
    /**
     * 获取package.json信息
     */
    resolvePackage(): any;
    /**
     * 读取package.json中的插件
     */
    resolvePlugins(): any[];
    /**
     * 获取webpack config
     */
    resolveWebpackConfig(): Promise<WebpackChain>;
    /**
     * 注册执行插件
     * @param {WebpackChain} config
     */
    use(config: WebpackChain): (plugin: any) => () => any;
}

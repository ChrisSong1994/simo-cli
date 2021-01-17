import { OptionType, IWebpackConfig } from '../type';
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
            chainWebpack: (config: IWebpackConfig) => IWebpackConfig;
            useTypescript: boolean;
            base: string;
            port: number;
            host: string;
            report: boolean;
            inlineLimit: number;
            outputPath: string;
            publicPath: string;
            target: string;
            alias: import("../type").IObj | {
                '@': string;
            };
            proxy: {
                '/api': {
                    target: string;
                    changeOrigin: boolean;
                    pathRewrite: {
                        '^/api': string;
                    };
                }; /**
                 * 环境变量
                 */
            } | import("../type").IPages;
            devtool: string;
            externals: string[] | import("../type").IObj | {
                react: string;
            };
            pages: {
                index: {
                    entry: string;
                    template: string;
                };
            };
        };
        env: import("../type").IObj;
        argv: import("../type").IObj;
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
    resolveWebpackConfig(): Promise<IWebpackConfig>;
    /**
     * 注册执行插件
     * @param {IWebpackConfig} config
     */
    use(config: IWebpackConfig): (plugin: any) => () => any;
}

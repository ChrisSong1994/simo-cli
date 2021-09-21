import { OptionType, IWebpackConfig } from '../type';
export default class Api {
    private mode;
    private options;
    private pkg;
    private plugins;
    constructor(mode: string, options: OptionType);
    get env(): any;
    get argv(): any;
    get context(): any;
    get simoConfig(): any;
    resolve(dir: string): string;
    formatOptions(option: OptionType): {
        simoConfig: {
            chainWebpack: (config: IWebpackConfig) => IWebpackConfig;
            port?: number | undefined;
            host?: string | undefined;
            report?: boolean | undefined;
            inlineLimit?: number | undefined;
            output?: import("../type").IObj | undefined;
            publicPath?: string | undefined;
            target?: string | undefined;
            alias?: import("../type").IObj | undefined;
            proxy?: import("../type").IPages | undefined;
            devtool?: string | undefined;
            externals?: string[] | import("../type").IObj | undefined;
        };
        env: import("../type").IObj;
        argv: import("../type").IObj;
        cwd: string;
    };
    resolvePackage(): any;
    resolvePlugins(): any[];
    resolveWebpackConfig(): Promise<IWebpackConfig>;
    use(config: IWebpackConfig): (plugin: any) => () => any;
}

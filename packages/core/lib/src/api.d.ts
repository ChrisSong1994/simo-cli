import { OptionType } from '../type';
export default class Api {
    private mode;
    private options;
    private pkg;
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
     * resolve路径
     * @param {String} dir
     */
    resolve(dir: string): string;
    /**
     * 获取package.json信息
     */
    resolvePackage(): any;
}

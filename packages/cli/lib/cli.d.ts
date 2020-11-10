/// <reference types="node" />
import { ChildProcess, ForkOptions } from 'child_process';
/** 命令行
 * 1.初始化命令行参数
 * 2.检查包更新情况
 * 3.获取项目配置，加载命令，监听进程
 * */
export default class Cli {
    private plugins;
    private root;
    private subprocess;
    private pkg;
    private env;
    private commands;
    private argv;
    constructor(cwd: string, argv?: any);
    private init;
    private resolvePackages;
    fork(path: string, argv: string[], options: ForkOptions): ChildProcess;
    private processMonitor;
    register(cmd: string, desc: string, ...args: any): void;
    parse(argv: any[]): void;
}

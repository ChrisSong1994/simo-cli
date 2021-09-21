/// <reference types="node" />
import { ChildProcess, ForkOptions } from 'child_process';
export default class Cli {
    private plugins;
    private cwd;
    private subprocess;
    private pkg;
    private env;
    private commands;
    private argv;
    constructor(cwd: string, argv?: any);
    private init;
    private resolvePackages;
    fork(path: string, argv: string[], options: ForkOptions): ChildProcess;
    exit(code: number): Promise<void>;
    private processMonitor;
    register(cmd: string, desc: string, ...args: any): void;
    parse(argv: any[]): void;
}

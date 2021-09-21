import path from 'path';
import yargs from 'yargs';
import chalk from 'chalk';
import { ChildProcess, fork, ForkOptions } from 'child_process';
import { logger, fs, semverGt } from '@chrissong/simo-utils';
import { SignKeyObjectInput } from 'crypto';
import _ from 'lodash';
import fkill from 'fkill';
// import updateNotifier from 'update-notifier';

import create from './src/create';
import serve from './src/serve';
import build from './src/build';
import inspect from './src/inspect';
import template from './src/template';

const defaultPlugins: any[] = [create, serve, build, inspect, template];

interface Commonds {
  [propName: string]: {
    cwd: string;
    desc: string;
  };
}

/** 命令行
 * 1.初始化命令行参数
 * 2.检查包更新情况
 * 3.获取项目配置，加载命令，监听进程
 * */
export default class Cli {
  private plugins: any[]; //
  private cwd: string; // 项目跟路径
  private subprocess: ChildProcess[];
  private pkg: any;
  private env: NodeJS.ProcessEnv;
  private commands: Commonds;
  private argv: any[];

  constructor(cwd: string, argv: any = []) {
    this.plugins = defaultPlugins;
    this.cwd = cwd;
    this.argv = argv;
    this.subprocess = [];
    this.commands = {};
    this.env = _.cloneDeep(process.env);
    this.pkg = this.resolvePackages();
    this.processMonitor();
    this.init();
  }

  private init() {
    // 检查node版本 （wWebpack 5 对 Node.js 的版本要求至少是 10.13.0 (LTS) ）
    if (!semverGt(process.versions.node, '10.13.0')) {
      logger.warn(`请升级您所使用的Node.js版本到10.13.0以上`);
      process.exit(0);
    }

    // // 检查安装包更新情况
    // updateNotifier({
    //   pkg: this.pkg,
    //   updateCheckInterval: 1000 * 60 * 60 * 24 * 7,
    // }).notify();

    // 初始化插件
    this.plugins.forEach((plugin) => plugin(this));
  }

  // 读取项目package.json
  private resolvePackages() {
    const pkgPath = path.resolve(this.cwd, 'package.json');
    if (!fs.existsSync(pkgPath)) return {};
    try {
      return require(pkgPath);
    } catch (err) {
      logger.error(`读取${pkgPath}失败！`);
      return {};
    }
  }

  // 创建子进程执行
  public fork(path: string, argv: string[], options: ForkOptions) {
    const subprocess = fork(path, argv, {
      env: this.env,
      // execArgv: [`--inspect-brk=127.0.0.1:${process.debugPort + 1}`], // 开发模式
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
  public async exit(code: number) {
    const subPIds = this.subprocess.map((subp) => subp.pid);
    await fkill(subPIds as number[], { force: true, tree: true });
    process.exit(code);
  }

  // 进程监听
  private processMonitor() {
    const handleExit = (signal: SignKeyObjectInput) => {
      logger.done(`🙋 接受到信号：${signal} 即将退出程序...`);

      this.subprocess.forEach((subprocess) => {
        if (!subprocess.killed) subprocess.kill();
      });

      process.exit(0);
    };
    process.on('SIGINT', handleExit);
    process.on('SIGTERM', handleExit);
  }

  // 注册命令
  public register(cmd: string, desc: string, ...args: any) {
    const name = cmd.split(/\s+/)[0];
    // 只能有数字、字母、下划线、冒号组成
    if (!/^[\w]+$/.test(name)) {
      throw new Error(`命令名称 ${chalk.redBright(name)} 不合法，只能是字母、数字、下划线`);
    }

    if (this.commands[name]) {
      throw new Error(`命令 ${chalk.redBright(name)} 已经被占用`);
    }

    yargs.command(cmd, desc, ...args);
    this.commands[name] = { cmd, desc, ...args };
  }

  // 解析命令
  public parse(argv: any[]) {
    this.argv = argv;
    if (this.argv.length) {
      yargs.parse(this.argv);
    } else {
      yargs.showHelp();
    }
  }
}

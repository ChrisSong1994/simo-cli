import webapck from 'webpack';
import path from 'path';
import { fs, logger } from '@chrissong/simo-utils';

import { OptionType } from '../type';

export default class Api {
  private mode: string;
  private options: any;
  private pkg :OptionType;
  
  constructor(mode: string, options: OptionType) {
    this.mode = mode;
    this.options = options;
    this.pkg = this.resolvePackage()
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
  resolve(dir: string) {
    return path.resolve(this.context, dir);
  }

  /**
   * 获取package.json信息
   */
  resolvePackage() {
    const pkg = this.resolve('package.json');
    if (fs.existsSync(pkg)) {
      try {
        return require(pkg);
      } catch (e) {
        logger.error(`读取 ${pkg} 失败`);
        return {};
      }
    }
    return {};
  }

  //   加载webpack config

  // 格式化配置参数
}

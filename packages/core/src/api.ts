import path from 'path';
import WebpackChain from 'webpack-chain';
import { fs, logger, parallelToSerial } from '@chrissong/simo-utils';

import { OptionType, IWebpackConfig } from '../type';
import { getPaths } from './utils';

export default class Api {
  private mode: string;
  private options: any;
  private pkg: OptionType;
  private plugins: any[];

  constructor(mode: string, options: OptionType) {
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
      open: argv.open,
      port: argv.port,
      report: argv.report,
      sourcemap: argv.sourcemap,
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
  resolve(dir: string) {
    const absulatePath = path.resolve(this.context, dir);
    return absulatePath;
  }

  /**
   * 格式化options参数
   * @param {OptionType} option
   */
  formatOptions(option: OptionType) {
    const { chainWebpack, ...restConfig } = option.simoConfig;
    return {
      ...option,
      simoConfig: {
        ...restConfig,
        chainWebpack: (config: IWebpackConfig) => {
          if (typeof chainWebpack === 'function') chainWebpack(config);
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
      } catch (err) {
        logger.error(`插件 ${id} 加载失败`);
        throw err;
      }
    });
  }

  /**
   * 获取webpack config
   */
  async resolveWebpackConfig(): Promise<IWebpackConfig> {
    const config = new WebpackChain();
    const { chainWebpack } = this.simoConfig;
    // 生成webpack配置
    await parallelToSerial(this.plugins.map(this.use(config)));
    return chainWebpack(config).toConfig(); // 加载配置项的webpack 配置
  }

  /**
   * 注册执行插件
   * @param {IWebpackConfig} config
   */
  use(config: IWebpackConfig) {
    return (plugin: any) => {
      const api = {
        env: this.env,
        pkg: this.pkg,
        mode: this.mode,
        argv: this.argv,
        simoConfig: this.simoConfig,
        context: this.context,
        paths: getPaths(this.context),
        resolve: (dir: string) => this.resolve(dir),
        chainWebpack: (callback: (v: IWebpackConfig) => void) => callback(config),
      };
      return () => plugin(api);
    };
  }
}

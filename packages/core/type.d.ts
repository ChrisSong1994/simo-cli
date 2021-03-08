import WebpackChain, { DevServer } from 'webpack-chain';
import Webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

export interface IObj {
  [key: string]: any;
}

// webpack 链式调用实例
export interface IWebpackConfig extends WebpackChain {
  devServer: DevServer;
}

export interface IPages {
  [key: string]: {
    entry: string;
    template: string;
  };
}

// simo 配置
export interface ISimoConfig extends IObj {
  port?: number;
  host?: string;
  report?: boolean;
  inlineLimit?: number;
  output?: IObj;
  publicPath?: string;
  target?: string;
  alias?: IObj;
  proxy?: IPages;
  devtool?: string;
  externals?: string[] | IObj;
  chainWebpack: (v: IWebpackConfig) => void;
}

// 开发服务和打包参数
export type OptionType = {
  env: IObj;
  argv: IObj;
  cwd: string;
  simoConfig: ISimoConfig;
};

// 样式配置
export type StyleLoaderOption = {
  isProd: Boolean;
  sourceMap: Boolean;
  filename: string;
  chunkFilename: string;
  publicPath: string;
  browsersList: string[];
};

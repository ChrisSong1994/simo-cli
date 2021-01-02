import WebpackChain from 'webpack-chain';
import Webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';

export interface SimoConfigIntf {
  baseURL: string;
  chainWebpack: (v: WebpackChain) => void;
  [key: string]: any;
}

export type ObjType = {
  [key: string]: any;
} | null;

export type OptionType = {
  env: ObjType;
  argv: ObjType;
  cwd: string;
  simoConfig: SimoConfigIntf;
};

export type StyleLoaderOption = {
  isProd: Boolean;
  sourceMap: Boolean;
  filename: string;
  chunkFilename: string;
  publicPath: string;
};

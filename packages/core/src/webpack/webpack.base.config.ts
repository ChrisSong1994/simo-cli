import path from 'path';
import WebpackChain from 'webpack-chain';
import HtmlWebpackTemplate from 'html-webpack-plugin';

import { IAlias } from 'packages/core/type';

export default (api: any) => {
  api.chainWebpack((config: WebpackChain) => {
    const env = api.env;
    const { alias, pages = {} } = api.simoConfig;

    // 设置context
    config.context(api.context).target('web');

    // output配置
    config.output.path(api.resolve('build')).publicPath('./');

    // resolve 配置
    config.resolve;
    if (alias) {
      Object.keys(alias).forEach((key) => {
        config.resolve.alias.set(key, alias[key]);
      });
    }

    // loader 配置
    config.module
      .rule('compile')
      .test(/\.(js|mjs|jsx|ts|tsx)$/)
      .exclude.add(api.resolve('node_modules'))
      .end()
      .use('babel-loader')
      .loader('babel-loader')
      .options({
        presets: [
          [
            require.resolve('@chrissong/babel-preset-simo'),
            {
              env: true,
              react: true,
              typescript: true,
            },
          ],
        ],
      });

    // 图片
    config.module
      .rule('images')
      .test(/\.(png|jpe?g|gif|webp|ico)(\?.*)?$/)
      .use('url-loader')
      .loader(require.resolve('url-loader'))
      .options({
        limit: api.simoConfig.inlineLimit || 10000,
        name: 'static/[name].[hash:8].[ext]',
        // require 图片的时候不用加 .default
        esModule: false,
        fallback: {
          loader: require.resolve('file-loader'),
          options: {
            name: 'static/[name].[hash:8].[ext]',
            esModule: false,
          },
        },
      });

    // 单独抽出svg 文件
    config.module
      .rule('svg')
      .test(/\.(svg)(\?.*)?$/)
      .use('file-loader')
      .loader(require.resolve('file-loader'))
      .options({
        name: 'static/[name].[hash:8].[ext]',
        esModule: false,
      });

    // 字体文件
    config.module
      .rule('fonts')
      .test(/\.(eot|woff|woff2|ttf)(\?.*)?$/)
      .use('file-loader')
      .loader(require.resolve('file-loader'))
      .options({
        name: 'static/[name].[hash:8].[ext]',
        esModule: false,
      });

    // 模版
    config
      .plugin('html-template')
      .use(HtmlWebpackTemplate, [
        {
          template: path.resolve(api.context, './public/index.html'),
        },
      ])
      .end();
  });
};

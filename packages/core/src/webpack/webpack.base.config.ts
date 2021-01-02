import path from 'path';
import WebpackChain from 'webpack-chain';
import HtmlWebpackTemplate from 'html-webpack-plugin';

export default (api: any) => {
  api.chainWebpack((config: WebpackChain) => {
    const env = api.env;
    const { alias, pages = {} } = api.simoConfig;

    // 设置context
    config.context(api.context).target('web');

    // output配置
    config.output.path(api.resolve('build')).publicPath('./');

    // loader 配置
    // babel-loader
    config.module.rule('compile').test(/\.(js|mjs|jsx|ts|tsx)$/).use('babel').loader('babel-loader');

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

    // 模版
    config
      .plugin('html-template')
      .use(HtmlWebpackTemplate, [
        {
          template: path.resolve(api.context(), './public/index.html'),
        },
      ])
      .end();
  });
};

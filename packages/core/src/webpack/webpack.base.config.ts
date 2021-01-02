import path from 'path';
import WebpackChain from 'webpack-chain';
import HtmlWebpackTemplate from 'html-webpack-plugin';

export default (api: any) => {
  api.chainWebpack((config: WebpackChain) => {
    const env = api.env();
    const { alias, pages = {} } = api.simoConfig();

    // 设置context
    config.context(api.context()).target('web');

    // output配置
    config.output.path(api.resolve('build')).publicPath('./');

    // loader 配置
    // babel-loader
    config.module.rule('compile').test(/\.js$/).use('babel').loader('babel-loader');

    config.module.rule('');

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

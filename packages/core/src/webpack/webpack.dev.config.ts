import { DevServer } from 'webpack-chain';
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';
import _ from 'lodash';

import cssLoader from './cssLoader';
import { IWebpackConfig } from '../../type';

export default (api: any) => {
  api.chainWebpack((config: IWebpackConfig) => {
    if (api.mode !== 'development') return;
    const { port, host, proxy, output } = api.simoConfig;

    // 加载样式
    cssLoader(config, {
      isProd: false,
      sourceMap: true,
      filename: '[name].css',
      chunkFilename: '[id].css',
      publicPath: '../../',
    });

    /**
     * 配置模式与devtool
     */
    config.watch(false).mode('development');

    /**
     * devServer
     */
    config.devServer
      // 热更新ws地址与location.host保持一致
      .contentBase(api.resolve(_.get(output, 'path')))
      .port(port)
      .host(host)
      .hot(true)
      .open(false)
      .compress(true)
      .progress(false)
      .stats(false)
      .when(proxy, (config: DevServer) => {
        config.proxy(proxy);
      });

    /**
     * 错误
     */
    config.plugin('errors').use(FriendlyErrorsWebpackPlugin);
  });
};

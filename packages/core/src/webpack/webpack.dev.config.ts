import { DevServer } from 'webpack-chain';

import cssLoader from './cssLoader';
import { IWebpackConfig } from '../../type';

export default (api: any) => {
  api.chainWebpack((config: IWebpackConfig) => {
    if (api.mode !== 'development') return;
    const { port, host, proxy, outputPath } = api.simoConfig;

    // 加载样式
    cssLoader(config, {
      isProd: false,
      sourceMap: true,
      filename: 'static/css/[name].css',
      chunkFilename: 'static/css/[id].css',
      publicPath: '../../',
    });

    /**
     * 配置模式与devtool
     */
    config.watch(false).mode('development');

    debugger;
    /**
     * devServer
     */
    config.devServer
      // 热更新ws地址与location.host保持一致
      .contentBase(api.resolve(outputPath))
      .port(port)
      .host(host)
      .hot(true)
      .open(false)
      .compress(true)
      .when(proxy, (config: DevServer) => {
        config.proxy(proxy);
      });
  });
};

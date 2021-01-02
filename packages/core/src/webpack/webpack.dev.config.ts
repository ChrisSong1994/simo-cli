import cssLoader from './cssLoader';

export default (api: any) => {
  api.chainWebpack((config: any) => {
    if (api.mode !== 'development') return;

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
    config.watch(true).mode('development');

    /**
     * devServer
     */
    config.devServer
      // 热更新ws地址与location.host保持一致
      .port(8080)
      .hot(true)
      .open(true)
      .contentBase(api.resolve('dist'));
  });
};

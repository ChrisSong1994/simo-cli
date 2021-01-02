export default (api: any) => {
  api.chainWebpack((config: any) => {
    if (api.mode() !== 'production') return;

    /**
     * 配置模式与devtool
     * 输出文件名设置
     */
    config
      .watch(false)
      .mode('production')
      .devtool('source-map')
      .output.filename('static/js/[name].[contenthash:8].js')
      .chunkFilename('static/js/[name].[contenthash:8].js');

    /**
     * 不输出优化提示
     */
    config.performance.merge({
      hints: false,
    });

    /**
     * 设置压缩代码
     */
    config.optimization.minimize(true);
  });
};

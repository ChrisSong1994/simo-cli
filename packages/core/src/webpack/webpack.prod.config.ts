import TerserPlugin from 'terser-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

import { IWebpackConfig } from '../../type';
import cssLoader from './cssLoader';

export default (api: any) => {
  api.chainWebpack((config: IWebpackConfig) => {
    if (api.mode !== 'production') return;

    const { report } = api.simoConfig;

    // 加载样式
    cssLoader(config, {
      isProd: true,
      sourceMap: false,
      filename: 'static/css/[name].[contenthash:8].css',
      chunkFilename: 'static/css/[id].css',
      publicPath: '../../',
    });

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
     * 依赖打包大小分析
     */
    config.when(report, (config: IWebpackConfig) => {
      config.plugin('bundle-analyzer').use(BundleAnalyzerPlugin);
    });

    /**
     * 删除打包文件
     * */
    config.plugin('clean-webpack-plugin').use(CleanWebpackPlugin);

    /**
     * 当文件过大时，不输出优化提示
     */
    config.performance.hints(false);

    /**
     * 设置压缩代码
     */
    config.optimization.minimize(true);

    /**
     * splitchunks
     */
    config.optimization.splitChunks({
      chunks: 'async',
      minSize: 20000,
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    });

    /**
     * 压缩js
     */
    config.optimization.minimizer('terser').use(TerserPlugin);
  });
};

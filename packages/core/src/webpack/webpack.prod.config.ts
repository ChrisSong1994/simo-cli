import TerserPlugin from 'terser-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

import { IWebpackConfig } from '../../type';
import cssLoader from './cssLoader';

export default (api: any) => {
  api.chainWebpack((config: IWebpackConfig) => {
    if (api.mode !== 'production') return;

    const { report, staticPath, output, publicPath } = api.simoConfig;

    // 加载样式
    cssLoader(config, {
      isProd: true,
      sourceMap: false,
      filename: '[name].[contenthash:8].css',
      chunkFilename: '[id].css',
      publicPath: publicPath,
    });

    /**
     * 配置模式与devtool
     * 输出文件名设置
     */
    config
      .watch(false)
      .mode('production')
      .devtool(false)
      .output.filename('[name].[contenthash:8].js')
      .chunkFilename('[id].js');

    /**
     * 依赖打包大小分析
     */
    config.when(report, (config: IWebpackConfig) => {
      config.plugin('bundle-analyzer').use(BundleAnalyzerPlugin);
    });

    // 静态文件拷贝
    config.when(staticPath, () => {
      if (typeof staticPath === 'string') {
        // 字符串路径将作为目录被拷贝到输出目录
        config.plugin('static-copy').use(CopyWebpackPlugin, [
          {
            patterns: [
              {
                from: api.resolve(staticPath),
                to: api.resolve(output.path),
                toType: 'dir',
                noErrorOnMissing: true,
              },
            ],
          },
        ]);
      }

      // 数据将作为patterns值配置
      if (Array.isArray(staticPath)) {
        config.plugin('static-copy').use(CopyWebpackPlugin, [
          {
            patterns: staticPath.map((item) => ({
              ...item,
              from: api.resolve(item.from),
              to: api.resolve(item.to, output.path),
            })),
          },
        ]);
      }
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

import TerserPlugin from 'terser-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import _ from 'lodash';

import { IWebpackConfig } from '../../type';
import cssLoader from './cssLoader';

export default (api: any) => {
  api.chainWebpack(async (config: IWebpackConfig) => {
    if (api.mode !== 'production') return;

    const {
      copyPath,
      output,
      publicPath,
      browsersList,
      parallel,
      cssExtract,
      externals,
    } = api.simoConfig;

    // 加载样式
    cssLoader(config, {
      isProd: true,
      sourceMap: false,
      // @ts-ignore
      cssExtract: cssExtract,
      filename: '[name].css',
      chunkFilename: '[id].css',
      publicPath: publicPath,
      browsersList: browsersList,
    });

    /**
     * 配置模式与devtool
     * 输出文件名设置
     */
    config
      .watch(false)
      .mode('production')
      .devtool(api.argv.sourcemap ? 'source-map' : false)
      .output.filename(_.get(output, 'filename') || '[name].[contenthash:8].js')
      .chunkFilename('[id].js');

    //  排除依赖
    config.when(externals, (config: IWebpackConfig) => {
      config.externals(externals);
    });

    /**
     * 依赖打包大小分析
     */
    config.when(api.argv.report, (config: IWebpackConfig) => {
      config.plugin('bundle-analyzer').use(BundleAnalyzerPlugin);
    });

    // 静态文件拷贝
    config.when(copyPath, () => {
      if (typeof copyPath === 'string') {
        // 字符串路径将作为目录被拷贝到输出目录
        config.plugin('static-copy').use(CopyWebpackPlugin, [
          {
            patterns: [
              {
                from: api.resolve(copyPath),
                to: api.resolve(output.path),
                toType: 'dir',
                noErrorOnMissing: true,
              },
            ],
          },
        ]);
      }

      // 数据将作为patterns值配置
      if (Array.isArray(copyPath)) {
        config.plugin('static-copy').use(CopyWebpackPlugin, [
          {
            patterns: copyPath.map((item) => ({
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
    config.plugin('clean').use(CleanWebpackPlugin);

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
    // @ts-ignore
    config.optimization.minimizer('terser').use(TerserPlugin, [
      {
        parallel: parallel,
        extractComments: false,
      },
    ]);
  });
};

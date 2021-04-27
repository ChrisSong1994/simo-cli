import { HotModuleReplacementPlugin } from 'webpack';
import { DevServer } from 'webpack-chain';
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';
import CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import _ from 'lodash';
import { fs } from '@chrissong/simo-utils';

import cssLoader from './cssLoader';
import { IWebpackConfig } from '../../type';
import { getProxy } from '../utils';

export default (api: any) => {
  api.chainWebpack((config: IWebpackConfig) => {
    if (api.mode !== 'development') return;
    const { simoConfig, paths } = api;
    const { port, host, proxy, browsersList, devtool, tsTypeCheck } = simoConfig;
    const useTypescript = fs.existsSync(paths.appTsConfigPath);

    // 加载样式
    cssLoader(config, {
      isProd: false,
      sourceMap: true,
      filename: '[name].css',
      chunkFilename: '[id].css',
      publicPath: '../../',
      browsersList: browsersList,
    });

    /**
     * 配置模式与devtool,缓存等
     */
    config.mode('development').devtool(devtool)

    /**
     * devServer
     */
    config.devServer
      .contentBase(api.resolve('public'))
      .watchContentBase(true) // 检测public下文件变动
      .publicPath('')
      .port(port)
      .host(host)
      .hot(true)
      .open(false)
      .progress(false)
      .stats(false)
      .clientLogLevel('none')
      .disableHostCheck(true)
      .compress(true)
      .overlay(true)
      .quiet(true)
      .inline(true)
      .when(proxy, (config: DevServer) => {
        config.proxy(getProxy(proxy));
      });

    /**
     *  单独的ts类型检查进程
     */
    useTypescript &&
      tsTypeCheck &&
      config.plugin('forks-ts-checker').use(ForkTsCheckerWebpackPlugin);

    /**
     * 错误
     */
    config.plugin('error').use(FriendlyErrorsWebpackPlugin);

    /**
     * 大小写敏感
     */
    config.plugin('case').use(CaseSensitivePathsPlugin);

    /**
     * 热更新
     */
    config.plugin('hmr').use(HotModuleReplacementPlugin);

    /**
     * reactRefresh
     */
    config.plugin('react-refresh').use(ReactRefreshWebpackPlugin);
  });
};

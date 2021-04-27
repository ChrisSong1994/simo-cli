import { fs } from '@chrissong/simo-utils';
import { IgnorePlugin, DefinePlugin } from 'webpack';
import HtmlWebpackTemplate from 'html-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import LodashModuleReplacementPlugin from 'lodash-webpack-plugin';
import _ from 'lodash';
import WebpackBar from 'webpackbar';

import { IWebpackConfig, IObj } from '../../type';

export default (api: any) => {
  api.chainWebpack((config: IWebpackConfig) => {
    const { simoConfig, context, paths, env } = api;
    const useTypescript = fs.existsSync(paths.appTsConfigPath);
    const isDevelopment = env.NODE_ENV === 'development';

    const {
      define,
      target,
      alias,
      pages,
      publicPath,
      inlineLimit,
      externals,
      output,
      parallel,
      browsersList,
      extraBabelOptions,
      fastRefresh,
    } = simoConfig;

    // 设置context
    config.context(context).target(target);

    // output配置
    config.output.merge({
      publicPath: publicPath,
      path: api.resolve(_.get(output, 'path', 'dist')),
      ..._.omit(output, ['publicPath', 'path']),
    });

    // resolve 配置
    config.resolve
      .when(alias, (config) => {
        Object.keys(alias).forEach((key) => {
          config.alias.set(key, api.resolve(alias[key]));
        });
      })
      .extensions.merge([
        '.mjs',
        '.js',
        '.jsx',
        '.ts',
        '.tsx',
        '.json',
        '.wasm',
        '.less',
        '.scss',
        '.sass',
        'css',
      ]);

    // loader 配置
    /**
     * thread-loader  babel-loader
     */
    const jsRule = config.module
      .rule('compile')
      .test(/\.(js|mjs|jsx|ts|tsx)$/)
      .exclude.add(api.resolve('node_modules'))
      .end();

    if (parallel) jsRule.use('thread-loader').loader(require.resolve('thread-loader'));

    jsRule
      .use('babel-loader')
      .loader('babel-loader')
      .options({
        cacheDirectory: true,
        sourceType: 'unambiguous',
        presets: [
          [
            require.resolve('@chrissong/babel-preset-simo'),
            {
              targets: browsersList,
              typescript: useTypescript,
              refresh: fastRefresh,
              isDev: isDevelopment,
            },
          ],
          ...[..._.get(extraBabelOptions, 'presets', [])],
        ],
        plugins: [..._.get(extraBabelOptions, 'plugins', [])].filter(Boolean),
        ..._.omit(extraBabelOptions, ['presets', 'plugins']),
      });

    // 匹配规则配置
    config.module
      .rule('modules')
      .test(/\.m?jsx?$/)
      .resolve.set('fullySpecified', false);

    // 图片
    config.module
      .rule('images')
      .test(/\.(png|jpe?g|gif|webp|ico)(\?.*)?$/)
      .use('url-loader')
      .loader(require.resolve('url-loader'))
      .options({
        limit: inlineLimit || 10000,
        name: 'static/[name].[hash:8].[ext]',
        esModule: false, // require 图片的时候不用加 .default
        fallback: {
          loader: require.resolve('file-loader'),
          options: {
            name: 'static/[name].[hash:8].[ext]',
            esModule: false,
          },
        },
      });

    // 单独抽出svg 文件
    config.module
      .rule('svg')
      .test(/\.(svg)(\?.*)?$/)
      .use('file-loader')
      .loader(require.resolve('file-loader'))
      .options({
        name: 'static/[name].[hash:8].[ext]',
        esModule: false,
      });

    // 字体文件
    config.module
      .rule('fonts')
      .test(/\.(eot|woff|woff2|ttf)(\?.*)?$/)
      .use('file-loader')
      .loader(require.resolve('file-loader'))
      .options({
        name: 'static/[name].[hash:8].[ext]',
        esModule: false,
      });

    // 文档字符串
    config.module
      .rule('plaintext')
      .test(/\.(txt|text|md)$/)
      .use('raw-loader')
      .loader(require.resolve('raw-loader'));

    //  排除依赖
    config.when(externals, (config: IWebpackConfig) => {
      config.externals(externals);
    });

    // 插件配置

    /**
     * eslint 插件配置
     * */
    config.plugin('eslint').use(ESLintPlugin, [
      {
        context: context,
        extensions: ['js', 'mjs', 'jsx', 'ts', 'tsx'],
        eslintPath: require.resolve('eslint'),
        cache: true,
      },
    ]);

    /**
     * 自定义常量 .env优先
     */
    const newEnvs = { ...define, ...env };
    const stringfyEnvs: IObj = {};
    Object.keys(newEnvs).forEach((key) => (stringfyEnvs[key] = JSON.stringify(newEnvs[key])));
    config.plugin('define').use(DefinePlugin, [stringfyEnvs]);

    /**
     * 编译进度
     */
    config.plugin('progress').use(WebpackBar);

    /**
     * 忽略moment locale文件
     */
    config.plugin('ignore').use(IgnorePlugin, [
      {
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/,
      },
    ]);

    /**
     * lodash精简
     * */
    config.plugin('lodash').use(LodashModuleReplacementPlugin);

    /**
     * 模版加载
     */
    config.when(pages, (config: IWebpackConfig) => {
      for (let key in pages) {
        const { entry, template, htmlWebpackPluginOptions } = pages[key];

        if (Array.isArray(entry)) {
          entry.forEach((en) => config.entry(key).add(api.resolve(en)));
        } else {
          config.entry(key).add(api.resolve(entry));
        }

        // 模版
        config.plugin(`html-template-${key}`).use(HtmlWebpackTemplate, [
          {
            filename: `${key}.html`,
            template: api.resolve(template),
            inject: Reflect.has(pages[key], 'htmlWebpackPluginOptions') ? true : false,
            chunks: [key],
            ...htmlWebpackPluginOptions,
          },
        ]);
      }
    });
  });
};

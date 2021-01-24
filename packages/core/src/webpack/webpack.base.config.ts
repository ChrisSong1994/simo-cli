import path from 'path';
import { DefinePlugin, ProgressPlugin, IgnorePlugin } from 'webpack';
import HtmlWebpackTemplate from 'html-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';

import { IWebpackConfig } from '../../type';

export default (api: any) => {
  api.chainWebpack((config: IWebpackConfig) => {
    const { env, simoConfig, context } = api;
    const { alias, pages, outputPath, publicPath, inlineLimit, useTypescript } = simoConfig;

    // 设置context
    config.context(context).target('web');

    // output配置
    config.output.path(api.resolve(outputPath)).publicPath(publicPath);

    // resolve 配置
    config.resolve
      .when(alias, (config) => {
        Object.keys(alias).forEach((key) => {
          config.alias.set(key, api.resolve(alias[key]));
        });
      })
      .extensions.merge(['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json', '.wasm']);

    // loader 配置
    /**
     * babel-loader
     */
    config.module
      .rule('compile')
      .test(/\.(js|mjs|jsx|ts|tsx)$/)
      .exclude.add(api.resolve('node_modules'))
      .end()
      .use('babel-loader')
      .loader('babel-loader')
      .options({
        cacheDirectory: true,
        presets: [
          [
            require.resolve('@chrissong/babel-preset-simo'),
            {
              env: true,
              react: true,
              typescript: useTypescript,
            },
          ],
        ],
      });

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
     * 编译进度
     * */
    config.plugin('progress').use(ProgressPlugin);

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
     * 模版加载
     */
    config.when(pages, (config: IWebpackConfig) => {
      for (let key in pages) {
        const { entry, template } = pages[key];

        if (Array.isArray(entry)) {
          entry.forEach((en) => config.entry(key).add(en));
        } else {
          config.entry(key).add(entry);
        }

        config.plugin(`html-template-${key}`).use(HtmlWebpackTemplate, [
          {
            template: path.resolve(context, template),
          },
        ]);
      }
    });
  });
};

import path from 'path';
import { fs } from '@chrissong/simo-utils';
import { ProgressPlugin, IgnorePlugin } from 'webpack';
import HtmlWebpackTemplate from 'html-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import _ from 'lodash';

import { IWebpackConfig } from '../../type';

export default (api: any) => {
  api.chainWebpack((config: IWebpackConfig) => {
    const { simoConfig, context } = api;
    const {
      alias,
      pages,
      publicPath,
      inlineLimit,
      externals,
      extraBabelPlugins,
      extraBabelPresets,
      ignoreMomentLocale,
      output,
    } = simoConfig;

    // 设置context
    config.context(context).target('web');

    // output配置
    config.output.merge({
      ...output,
      publicPath: publicPath,
      path:api.resolve(output.path)  || api.resolve('dist'),
    });

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
        sourceType: "unambiguous",
        presets: [
          [
            require.resolve('@chrissong/babel-preset-simo'),
            {
              env: true,
              react: true,
              typescript: fs.existsSync(path.resolve(context, 'tsconfig.json')), // 判断当前是否需要使用 @babel/preset-typescript
            },
          ],
          ...(extraBabelPresets || []),
        ],
        plugins: [...(extraBabelPlugins || [])].filter(Boolean),
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
     * 编译进度
     * */
    config.plugin('progress').use(ProgressPlugin);

    /**
     * 忽略moment locale文件
     */
    if (ignoreMomentLocale) {
      config.plugin('ignore').use(IgnorePlugin, [
        {
          resourceRegExp: /^\.\/locale$/,
          contextRegExp: /moment$/,
        },
      ]);
    }

    /**
     * 模版加载
     */
    config.when(pages, (config: IWebpackConfig) => {
      for (let key in pages) {
        const { entry, template, htmlWebpackPluginOptions } = pages[key];

        if (Array.isArray(entry)) {
          entry.forEach((en) => config.entry(key).add(en));
        } else {
          config.entry(key).add(entry);
        }

        config.plugin(`html-template-${key}`).use(HtmlWebpackTemplate, [
          {
            inject: Reflect.has(pages[key], 'htmlWebpackPluginOptions') ? true : false,
            template: path.resolve(context, template),
            ...htmlWebpackPluginOptions,
          },
        ]);
      }
    });
  });
};

import WebpackChain from 'webpack-chain';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import postcssSafeParser from 'postcss-safe-parser';

import { StyleLoaderOption } from 'packages/core/type';

interface ICreateCSSRuleOpts {
  lang: string;
  test: RegExp;
  loader?: string;
  options?: object;
}

/**
 * @param {*} webpackConfig webpack-chain配置对象
 * @param {*} param
 * isProd  是否生产环境关联分离css为单独文件
 * sourceMap 是否生成sourceMap
 * filename 生成文件路径
 * chunkFilename  生成文件路径
 * publicPath 资源文件路径publicPath，以output文件夹为根路径
 */
export default (
  config: WebpackChain,
  { isProd, sourceMap, filename, chunkFilename, publicPath }: StyleLoaderOption,
) => {
  const cssnanoOptions = {
    preset: [
      'default',
      {
        mergeLonghand: false,
        cssDeclarationSorter: false,
      },
    ],
  };

  // 创建样式规则
  function createCSSRule({ lang, test, loader, options }: ICreateCSSRuleOpts) {
    const baseRule = config.module.rule(lang).test(test);

    // 匹配 *.module.* 样式文件
    const extModulesRule = baseRule.oneOf('css-modules').resourceQuery(/modules/);
    applyLoaders(extModulesRule, true);

    // 普通样式文件
    const normalRule = baseRule.oneOf('normal');
    applyLoaders(normalRule, false);

    // 执行样式loader
    function applyLoaders(
      rule: WebpackChain.Rule<WebpackChain.Rule<WebpackChain.Module>>,
      modules: boolean,
    ) {
      if (isProd) {
        rule.use('extract-css-loader').loader(MiniCssExtractPlugin.loader);
      } else {
        rule.use('style-loader').loader('style-loader');
      }

      const cssLoaderOptions = {
        modules, // 开启css module
        sourceMap,
        importLoaders: 1 + (isProd ? 1 : 0),
      };

      rule.use('css-loader').loader('css-loader').options(cssLoaderOptions);

      if (isProd) {
        rule.use('cssnano').loader('postcss-loader').options({
          sourceMap,
          // plugins: [require('autoprefixer'), require('cssnano')(cssnanoOptions)],
        });
      } else {
        rule.use('postcss-loader').loader('postcss-loader').options({ sourceMap });
      }

      if (loader) {
        rule.use(loader).loader(loader).options(Object.assign({ sourceMap }, options));
      }
    }
  }

  createCSSRule({ lang: 'css', test: /\.css$/ });
  createCSSRule({ lang: 'postcss', test: /\.p(ost)?css$/ });
  createCSSRule({ lang: 'less', test: /\.less$/, loader: 'less-loader' });

  /**
   * css 压缩
   * */
  if (isProd) {
    // inject CSS extraction plugin
    config.plugin('extract-css').use(MiniCssExtractPlugin, [{ filename, chunkFilename }]);

    /**
     * 压缩css
     */
    config.optimization.minimizer('optimize').use(OptimizeCSSAssetsPlugin, [
      {
        cssProcessorOptions: {
          parser: postcssSafeParser,
          map: false,
        },
      },
    ]);
  }
};

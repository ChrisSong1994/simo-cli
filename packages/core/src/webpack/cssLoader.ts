import WebpackChain from 'webpack-chain';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';

import { StyleLoaderOption } from '@chrissong/simo-core/type';

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
  { isProd, sourceMap, filename, chunkFilename, browsersList, cssExtract }: StyleLoaderOption,
) => {
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
      if (isProd && cssExtract) {
        rule.use('extract-css-loader').loader(MiniCssExtractPlugin.loader);
      } else {
        rule.use('style-loader').loader('style-loader');
      }

      const cssLoaderOptions = {
        modules: modules
          ? {
              localIdentName: '[name]_[hash:base64:5]',
            }
          : false, // 开启css module
        sourceMap,
        importLoaders: 10,
      };

      rule.use('css-loader').loader('css-loader').options(cssLoaderOptions);
      rule
        .use('postcss-loader')
        .loader(require.resolve('postcss-loader'))
        .options({
          // Necessary for external CSS imports to work
          // https://github.com/facebookincubator/create-react-app/issues/2677
          ident: 'postcss',
          plugins: () => [
            // https://github.com/luisrudge/postcss-flexbugs-fixes
            require('postcss-flexbugs-fixes'),
            // https://github.com/csstools/postcss-preset-env
            require('postcss-preset-env')({
              // TODO: set browsers
              autoprefixer: {
                // overrideBrowserslist: browsersList,
              },
              // https://cssdb.org/
              stage: 3,
            }),
          ],
        });

      if (loader) {
        rule.use(loader).loader(loader).options(Object.assign({ sourceMap }, options));
      }
    }
  }

  createCSSRule({ lang: 'css', test: /\.css$/ });
  createCSSRule({ lang: 'postcss', test: /\.p(ost)?css$/ });
  createCSSRule({
    lang: 'less',
    test: /\.less$/,
    loader: 'less-loader',
    options: {
      lessOptions: {
        // https://github.com/ant-design/ant-motion/issues/44
        // False by default starting in v3.0.0. Enables evaluation of JavaScript inline in .less files. This created a security problem for some developers who didn't expect user input for style sheets to have executable code.
        javascriptEnabled: true, // https://lesscss.org/usage/#less-options   less v3.0.0版本引入 默认false,使用minxin 的话需要改成true
      },
    },
  });
  createCSSRule({
    lang: 'sass',
    test: /\.s(c|a)ss$/,
    loader: 'sass-loader',
    options: { implementation: require('sass') },
  });

  /**
   * css 拆分和压缩
   * */
  if (isProd && cssExtract) {
    // inject CSS extraction plugin
    config.plugin('extract-css').use(MiniCssExtractPlugin, [{ filename, chunkFilename }]);

    /**
     * 压缩css
     */
    config.optimization.minimizer('css-minimizer').use(CssMinimizerPlugin);
  }
};

// 路径配置全部是相对路径
/**
 * @param {Object} env  运行时环境变量
 */

const simoConfig = (env) => {
  const { NODE_ENV } = env;
  const isProd = NODE_ENV === 'production';

  return {
    base: '/', // 可选：路由前缀  默认 /
    output: {
      path: 'dist',
      filename: isProd ? '[name].bundle.js' : '[name].js',
      // library: 'simo',
      // libraryTarget: 'var',
    },
    publicPath: './', // 可选：静态文件路径 默认 './'
    target: 'web', // 可选：默认web
    alias: {
      // 可选： 配置
      '@': './src',
    },
    port: '8080', // 可选：开发静态服务端口号：默认是8080，假如端口占用默认加一
    host: 'localhost', // 可选：静态服务的host
    proxy: {
      // 可选：配置代理能力
      '/api': {
        target: 'http://www.api.com/',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
      '/edge': 'https://cpgxpt.zhengqiyezhi666.com:13001/',
    },
    report: false, // 可选：是否显示打包文件大小的treeMap,只有在prod下可用,  默认false
    devtool: 'cheap-module-source-map', // 可选：development环境默认是 cheap-module-source-map，  production 默认是 none
    externals: {
      // 可选： 设置哪些模块可以不被打包，通过 <script> 或其他方式引入
      // react: 'React',
      // lodash: 'lodash',
    },
    pages: {
      // 必选：页面的入口和模版配置
      index: {
        entry: './src/index.js', // 页面入口文件
        template: './public/index.html', // 页面html模板文件
        htmlWebpackPluginOptions: {
          // 可选：配置html内变量
          __param: '111',
        },
      },
    },
    extraBabelPlugins: [], // 可选：默认为[] 额外的babel插件
    extraBabelPresets: [], // 可选：默认为[] 额外的babel预设
    ignoreMomentLocale: true, // 可选：默认为false 忽略moment的locale文件
    chainWebpack: (config) => {
      // 可选：webpack 链式配置回调
      // 删除插件
      config.plugins.delete('progress');
    },
  };
};

module.exports = simoConfig;

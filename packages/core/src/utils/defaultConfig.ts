import { hasMultipleCores } from '@chrissong/simo-utils';

export default {
  target: 'web', // 可选：默认web
  // copyPath: 'src/statics', // 可选：string|object[] 静态文件拷贝目录
  output: {
    path: 'dist',
    // filename:  '[name].js',
    // library: 'simo',
    // libraryTarget: 'var',
  },
  publicPath: './', // 可选：静态文件路径 默认 './' 会覆盖 output.publicPath
  // alias: {
  //   // 可选： 配置
  //   '@': './src',
  // },
  port: 8080, // 可选：开发静态服务端口号：默认是8080，假如端口占用默认加一
  host: 'localhost', // 可选：静态服务的host
  proxy: {
    // 可选：配置代理能力
  },
  devtool: 'cheap-module-source-map', // 可选：development环境默认是 cheap-module-source-map，  production 默认是 false
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
  parallel: hasMultipleCores(), // 可选：默认自检 是否使用多核
  browsersList: ['> 1%', 'last 2 versions', 'not ie <= 10'], // 可选: 浏览器规则配置
  extraBabelOptions: {
    // 可选：默认{}

    presets: [],
    plugins: [],
  },
  define: {}, // 可选：自定义常量
  tsTypeCheck: true, // 可选：是否开启编译ts类型检查
  fastRefresh: true, // 可选：保持组件状态仅在开发环境使用
  chainWebpack: () => {}, // 可选：
};

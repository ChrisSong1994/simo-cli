import { hasMultipleCores } from '@chrissong/simo-utils';

export default {
  target: ['web','es5'], // 可选：默认 ['web', 'es5']
  // copyPath: 'src/statics', // 可选：string|object[] 静态文件拷贝目录
  output: {
    path: 'dist',
    // filename:  '[name].js',
    // library: 'simo',
    // libraryTarget: 'var',
  },
  outputEnvironment: {
    // 注意这个是用来告诉webpack 有些环境的 es x 功能是否可用的
    // The environment supports arrow functions ('() => { ... }').
    arrowFunction: false,
    // The environment supports BigInt as literal (123n).
    bigIntLiteral: false,
    // The environment supports const and let for variable declarations.
    const: false,
    // The environment supports destructuring ('{ a, b } = obj').
    destructuring: false,
    // The environment supports an async import() function to import EcmaScript modules.
    dynamicImport: false,
    // The environment supports 'for of' iteration ('for (const x of array) { ... }').
    forOf: false,
    // The environment supports ECMAScript Module syntax to import ECMAScript modules (import ... from '...').
    module: false,
  },
  cssExtract: false, // 可选：默认分离css文件
  buildNotifier: true, // 可选：默认开启webpack 构建提醒
  publicPath: './', // 可选：静态文件路径 默认 './' 会覆盖 output.publicPath
  // alias: {
  //   // 可选： 配置
  //   '@': './src',
  // },
  port: 8080, // 可选：开发静态服务端口号：默认是8080，假如端口占用默认加一
  host: 'localhost', // 可选：静态服务的host
  inlineLimit: 1000, // 可选： 图片被打包称号base64大小限制
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
  watchFiles: [
    '.env',
    '.eslintrc',
    '.eslintrc.js',
    '.eslintignore',
    'tsconfig.json',
    'simo.config.js',
    'simo.config.ts',
  ], // 可选：增加监听文件配置，监听文件变化将会使本地服务器重启
  chainWebpack: () => {}, // 可选：
};

module.exports = {
  base: '', // 可选：路由前缀  默认 /
  alias: {
    // 可选： 配置
    '@': './src',
  },
  publicPath: './', // 可选：静态文件路径 默认 './'
  proxy: {
    // 可选：配置代理能力
    '/api': {
      target: 'http://www.api.com/',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
  externals: {
    // 可选： 设置哪些模块可以不被打包，通过 <script> 或其他方式引入
    react: 'window.React',
  },
  pages: {
    // 必选：页面的入口和模版配置
    // 页面
    index: {
      entry: './index.js', // 页面入口文件
      template: './index.html', // 页面html模板文件
    },
  },
  chainWebpack: (config) => {
    // 删除插件
    config.plugins.delete('progress');
  },
};

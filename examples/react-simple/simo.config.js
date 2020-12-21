module.exports = {
  type: '',
  pages: {
    // 页面
    index: {
      entry: './src/index.tsx', // 页面入口文件
      template: './index.html', // 页面html模板文件
    },
  },
  alias: {
    '~': './src', // 路径别名配置,
    src: './src',
    public: './public',
  }
};

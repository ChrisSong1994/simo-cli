// 路径配置全部是相对路径
/**
 * @param {Object} env  运行时环境变量
 */

const simoConfig = (env) => {
  const { NODE_ENV } = env;
  const isProd = NODE_ENV === "production";

  return {
    output: {
      path: "dist",
      filename: isProd ? "[name].bundle.js" : "[name].js",
    },
    alias: {
      ROOT: "./src",
    },
    port: 8020,
    define: {
      DOC_URL: JSON.stringify("https://git.shinemo.com/projects/XNPM/repos/simo-cli/browse"),
      API_URL: JSON.stringify(
        "https://git.shinemo.com/projects/XNPM/repos/simo-cli/browse/docs/config.md"
      ),
      GUID_URL: JSON.stringify(
        "https://git.shinemo.com/projects/XNPM/repos/simo-cli/browse/docs/guide.md"
      ),
    },
    pages: {
      // 必选：页面的入口和模版配置
      index: {
        // 配置chunk 名称
        entry: "./src/index.js", // 页面入口文件
        template: "./public/index.html", // 页面html模板文件
        htmlWebpackPluginOptions: {
          // 可选：配置html内变量
          // PUBLIC_URL: './',
        },
      },
    },

    chainWebpack: (config) => {
      // 可选：webpack 链式配置回调
      // 删除插件
      // config.plugins.delete('progress');
    },
  };
};

module.exports = simoConfig;

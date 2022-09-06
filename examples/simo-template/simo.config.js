// 路径配置全部是相对路径
/**
 * @param {Object} env  运行时环境变量
 */
const path = require("path");
const HtmlWebpackHardiskPlugin = require("html-webpack-harddisk-plugin");

const simoConfig = (env) => {
  const { NODE_ENV } = env;
  const isProd = NODE_ENV === "production";

  return {
    output: {
      path: "dist",
      filename: isProd ? "[name].bundle.js" : "[name].js",
    },
    mock: {
      path: "./mock", // 从./mock获取mock数据
    },
    alias: {
      ROOT: "./src",
    },
    port: 8020,
    open: false,
    define: {
      DOC_URL: JSON.stringify("https://github.com/ChrisSong1994/simo-cli"),
      API_URL: JSON.stringify("https://github.com/ChrisSong1994/simo-cli"),
      GUID_URL: JSON.stringify("https://github.com/ChrisSong1994/simo-cli"),
    },
    pages: {
      // 必选：页面的入口和模版配置
      index: {
        // 配置chunk 名称
        entry: "./src/index.js", // 页面入口文件
        template: "./public/index.html", // 页面html模板文件
        htmlWebpackPluginOptions: {
          alwaysWriteToDisk: true,
          // 可选：配置html内变量
          // PUBLIC_URL: './',
        },
      },
    },
    externals: {
      react: "React",
      "react-dom": "ReactDOM",
      moment: "moment",
      antd: "antd",
    },
    chainWebpack: (config) => {
      // 可选：webpack 链式配置回调
      // 删除插件
      config.plugin("html-webpack-harddisk-plugin").use(HtmlWebpackHardiskPlugin, [
        {
          outputPath: path.resolve(__dirname, "dist"),
        },
      ]);
    },
  };
};

module.exports = simoConfig;

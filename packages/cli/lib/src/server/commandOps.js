'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.default = {
  cmd: 'server',
  desc: '启动项目开发服务',
  builder: (yargs) => {
    yargs
      .option('open', {
        alias: 'o',
        type: 'boolean',
        default: false,
        describe: '是否自动打开浏览器',
      })
      .option('port', {
        alias: 'p',
        type: 'number',
        default: 8000,
        requiresArg: true,
        describe: '指定 devServer 端口号',
      });
  },
};
//# sourceMappingURL=commandOps.js.map

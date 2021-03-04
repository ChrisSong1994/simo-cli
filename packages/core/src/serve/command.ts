export default {
  cmd: 'serve',
  desc: '启动项目开发服务',
  builder: (yargs: any) => {
    yargs
      .option('open', {
        alias: 'o',
        type: 'boolean',
        default: true,
        describe: '是否自动打开浏览器',
      })
      .option('port', {
        alias: 'p',
        type: 'number',
        default: 8080,
        requiresArg: true,
        describe: '指定 devServer 端口号',
      });
  },
};

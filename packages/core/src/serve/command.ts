export default {
  cmd: 'serve',
  desc: '启动项目开发服务',
  builder: (yargs: any) => {
    yargs
      .option('open', {
        alias: 'o',
        type: 'boolean',
        default: false,
        describe: '是否自动打开浏览器',
      })
  },
};

import Cli from '../../cli';
import { build } from '@chrissong/simo-core';

export default (cli: Cli) => {
  cli.register(
    'build',
    '打包项目文件',
    (yargs: any) => {
      yargs
        .option('report', {
          alias: 'r',
          type: 'boolean',
          default: false,
          describe: '生成打包报告文件，可指定文件名',
        })
        .option('sourcemap', {
          alias: 's',
          type: 'boolean',
          default: false,
          describe: '是否生成source map',
        });
    },
    (argv: any) => {
      build(cli, argv);
    },
  );
};

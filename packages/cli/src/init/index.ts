import Cli from '../../cli';
import { init } from '@chrissong/simo-core';

export default (cli: Cli) => {
  cli.register(
    'init <name>',
    '初始化项目',
    (yargs: any) => {
      yargs.option('name', {
        type: 'string',
        describe: '项目名称',
      });
    },
    (argv: any) => {
      init(cli, argv);
    },
  );
};

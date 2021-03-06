import Cli from '../../cli';
import { inspect } from '@chrissong/simo-core';

export default (cli: Cli) => {
  cli.register(
    'inspect',
    '配置项检出',
    (yargs: any) => {
      yargs.option('filename', {
        alias: 'f',
        type: 'string',
        describe: '生成配置文件，可指定文件名',
      });
    },
    (argv: any) => {
      inspect(cli, argv);
    },
  );
};

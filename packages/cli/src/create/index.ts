import create from '@chrissong/create-simo-app';

import Cli from '../../cli';
import { IObj } from '../../type';

export default (cli: Cli) => {
  cli.register(
    'create <name>',
    '初始化项目名称',
    (yargs: any) => {
      yargs.positional('name', {
        type: 'string',
        describe: '项目名称',
      });
    },
    (argv: IObj) => {
      create(cli, argv);
    },
  );
};

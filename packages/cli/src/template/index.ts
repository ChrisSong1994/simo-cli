/**
 * simo template ls  查看模版列表
 * simo template add  --name  --repository  --description 注册模版仓库
 * simo template delete  --name  删除仓库
 *
 */
import { template } from '@chrissong/create-simo-app';
import { logger } from '@chrissong/simo-utils';

import Cli from '../../cli';
import { IObj } from '../../type';

export default (cli: Cli) => {
  cli.register(
    'template <action>',
    '模版仓库',
    (yargs: any) => {
      yargs
        .option('name', {
          alias: 'n',
          type: 'string',
          default: '',
          describe: '模版名称',
        })
        .option('repository', {
          alias: 'r',
          type: 'string',
          default: '',
          describe: '模版仓库地址',
        })
        .option('description', {
          alias: 'd',
          type: 'string',
          default: '',
          describe: '模版介绍',
        });
    },
    (argv: IObj) => {
      if (!['ls', 'add', 'remove'].includes(argv.action)) {
        logger.error('The command parameter <action> must be oneof ls、add、remove !');
      } else {
        template.default(cli, argv);
      }
    },
  );
};

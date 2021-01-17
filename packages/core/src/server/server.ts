import yargs from 'yargs';
import process from 'process';
import { loadEnv, logger } from '@chrissong/simo-utils';

import command from './command';
import exec from './exec';
import getSimoConfig from '../utils/getSimoConfig';

const { cmd, desc, builder } = command;

yargs
  .command(cmd, desc, builder, (argv) => {
    const cwd = process.cwd();
    //   加载环境变量
    loadEnv(cwd);
    const env = Object.assign(process.env, {
      CMD: 'server',
      NODE_ENV: 'development',
      BABEL_ENV: 'development',
    });

    // 执行开发服务
    exec({ env, argv, cwd, simoConfig: getSimoConfig(cwd) }).catch((err) => {
      logger.log(err);
      if (process.send) {
        // 只存在于子进程当中
        process.send('EXIT_WITH_ERROR');
      }
    });
  })
  .parse(process.argv.slice(2));

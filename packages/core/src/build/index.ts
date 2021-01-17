import { loadEnv, logger } from '@chrissong/simo-utils';

import { getSimoConfig } from '../utils';
import exec from './exec';

/**
 * 使用子进程是为了修正webpack执行的时候的process.cwd
 * 如果不正确则可能出现打包错误
 */
export default (cli: any, argv: any) => {
  logger.log('🚀  正在打包,请稍等...');

  loadEnv(process.cwd());
  // 先设置环境变量，以便在配置文件中使用
  const env = Object.assign(process.env, {
    CMD: 'build',
    NODE_ENV: 'production',
    BABEL_ENV: 'production',
  });

  exec({
    env: env,
    argv: argv,
    cwd: cli.cwd,
    simoConfig: getSimoConfig(cli.cwd),
  }).catch((err) => {
    logger.log(err);
    process.exit(1);
  });
};

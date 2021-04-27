import { loadEnv, logger } from '@chrissong/simo-utils';

import { getSimoConfig } from '../utils';
import exec from './exec';

const inspect = (cli: any, argv: any) => {
  loadEnv(process.cwd());
  const env = Object.assign(process.env, {
    NODE_ENV: 'production'
  });

  exec({
    env: env,
    argv: argv,
    cwd: cli.cwd,
    simoConfig: getSimoConfig(cli.cwd, env),
  }).catch((err) => {
    logger.log(err);
    process.exit(1);
  });
};

export default inspect;

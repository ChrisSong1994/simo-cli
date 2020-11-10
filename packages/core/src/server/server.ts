import yargs from 'yargs';
import command from './command';
import { loadEnv } from '@chrissong/simo-utils';
import  getSimoConfig  from '../utils/getSimoConfig';

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

    server({
      env,
      argv,
      cwd,
      simoConfig: getSimoConfig(cwd),
    });
  })
  .parse(process.argv.slice(2));

// 服务启动
const server = ({ env, argv, cwd, simoConfig }) => {




};

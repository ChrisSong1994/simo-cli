import yargs from 'yargs';
import command from './command';
import { loadEnv } from '@chrissong/simo-utils';
<<<<<<< HEAD
import getSimoConfig from '../utils/getSimoConfig';
=======
import  getSimoConfig  from '../utils/getSimoConfig';
>>>>>>> bb47201f42e3a2c211b98b37780175c73d9a1d35

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
<<<<<<< HEAD
const server = ({ env, argv, cwd, simoConfig }) => {};
=======
const server = ({ env, argv, cwd, simoConfig }) => {




};
>>>>>>> bb47201f42e3a2c211b98b37780175c73d9a1d35

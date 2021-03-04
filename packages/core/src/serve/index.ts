import { logger } from '@chrissong/simo-utils';
import path from 'path';
import fkill from 'fkill';
import chokidar from 'chokidar';

// 创建静态服务
const createServer = (cli: any) => {
  return cli
    .fork(path.resolve(__dirname, './serve'), cli.argv, {
      cwd: cli.cwd,
      env: cli.env,
      stdio: 'inherit',
    })
    .on('message', (msg: string) => msg === 'EXIT_WITH_ERROR' && cli.exit(1));
};


export default (cli: any, argv: any) => {
  logger.log('🚀  正在启动开发服务,请稍等...');

  //  创建服务
  let serverprocess = createServer(cli);

  // 监听配置文件修改
  const watcher = chokidar.watch(
    [
      '.env',
      '.eslintrc',
      '.eslintrc.js',
      '.eslintignore',
      '.babelrc',
      'babel.config.js',
      '.browserslistrc',
      'tsconfig.json',
      'simo.config.js',
    ],
    {
      cwd: cli.cwd,
    },
  );

  watcher.on('change', async () => {
    logger.log('🚀  检测到配置文件变化,服务正在自动重启...');
    
    await fkill(serverprocess.pid);

    serverprocess = createServer(cli);
  });
};

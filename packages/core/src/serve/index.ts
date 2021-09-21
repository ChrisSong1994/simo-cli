import { logger } from '@chrissong/simo-utils';
import path from 'path';
import fkill from 'fkill';
import chokidar from 'chokidar';
import { debounce } from 'lodash';
import getSimoConfig from '../utils/getSimoConfig';

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
  const { watchFiles } = getSimoConfig(process.cwd(), process.env);

  //  创建服务
  let serverprocess = createServer(cli);

  // 监听配置文件
  const watcher = chokidar.watch(watchFiles, {
    cwd: cli.cwd,
  });

  watcher.on(
    'change',
    debounce(async () => {
      logger.log('🚀  检测到配置文件变化,服务正在自动重启...');
      try {
        await fkill(serverprocess.pid);
      } catch (err) {
        return logger.error((err as Error).toString());
      }

      serverprocess = createServer(cli);
    }, 300),
  );
};

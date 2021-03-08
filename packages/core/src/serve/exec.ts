import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import {
  open,
  logger,
  address,
  chalk,
  clipboardy,
  hasYarn,
  findProcess,
} from '@chrissong/simo-utils';

import { OptionType } from '../../type';
import Api from '../api';

// 服务启动
const server = async (options: OptionType) => {
  const api = new Api('development', options);
  const config: any = await api.resolveWebpackConfig();

  // 检查端口占用
  const result = await findProcess('port', config.devServer.port);
  if (result.length) {
    logger.warn(`⛔ 端口号 ${chalk.underline(config.devServer.port)} 被占用，请修改端口号！`);
    return Promise.reject();
  }

  return new Promise<any>(async (resolve, reject) => {
    const compiler = webpack(config);
    const server = new WebpackDevServer(compiler, config.devServer);

    server.listen(config.devServer.port, config.devServer.host, (err) => {
      if (err) return reject(err);
      resolve(null);

      if (api.argv.open) {
        open(`http://${config.devServer.host}:${config.devServer.port}`);
      } else {
        const localUrl = `http://${config.devServer.host}:${config.devServer.port}`;
        const lanUrl = `http://${address.ip()}:${config.devServer.port}`;

        let copied = '';
        try {
          clipboardy.writeSync(localUrl);
          copied = chalk.dim('(copied to clipboard)');
        } catch (e) {
          copied = chalk.red(`(copy to clipboard failed)`);
        }

        logger.log(`
      App running at:
       - Local: ${chalk.cyan(localUrl)} ${copied} 
       - Network: ${chalk.cyan(lanUrl)} \n
      Note that the development build is not optimized.
      To create a production build, use ${chalk.cyan(hasYarn() ? 'yarn build' : 'npm build')}.
        `);
      }
    });
  });
};

export default server;

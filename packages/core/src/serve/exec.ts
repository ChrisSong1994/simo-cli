import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import { open } from '@chrissong/simo-utils';

import { OptionType } from '../../type';
import Api from '../api';

// 服务启动
const server = async (options: OptionType) => {
  const api = new Api('development', options);
  const config: any = await api.resolveWebpackConfig();

  return new Promise<any>((resolve, reject) => {
    debugger
    const compiler = webpack(config);
    const server = new WebpackDevServer(compiler, config.devServer);

    server.listen(config.devServer.port, config.devServer.host, (err) => {
      if (err) return reject(err);
      resolve(null);
      if (api.argv.open) {
        open(`http://localhost:${config.devServer.port}/${api.simoConfig.base}`);
      }
    });
  });
};

export default server;

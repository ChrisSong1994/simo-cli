import webpack from 'webpack';
import { logger } from '@chrissong/simo-utils';

import { OptionType } from '../../type';
import Api from '../api';

const build = async (options: OptionType) => {
  const api = new Api('production', options);
  const config: any = await api.resolveWebpackConfig();
  debugger;

  return new Promise<any>((resolve, reject) => {
    webpack(config, (err, stats) => {
      if (err) return reject(err);
      // 打印结果
      process.stdout.write(
        (stats as webpack.Stats).toString({
          colors: true,
          modules: false,
          children: false,
          chunks: false,
          chunkModules: false,
        }) + '\n\n',
      );
      if ((stats as webpack.Stats).hasErrors()) {
        logger.error('打包失败');
        reject(new Error('Webpack build failed'));
      } else if ((stats as webpack.Stats).hasWarnings()) {
        logger.warn('打包成功，但具有警告信息');
        resolve('success');
      } else {
        logger.done('打包成功');
        resolve('success');
      }
    });
  });
};

export default build;

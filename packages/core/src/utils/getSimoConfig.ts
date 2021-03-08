import path from 'path';
import fs from 'fs';
import { logger } from '@chrissong/simo-utils';

import { IObj } from '../../type';
import defaultConfig from './defaultConfig';
import verifyConfig from './verifyConfig';

export default (cwd: string, env: IObj) => {
  // 匹配 simo.config.(j|t)s
  const jsConfPathExist = fs.existsSync(path.resolve(cwd, './simo.config.js'));
  const tsConfPathExist = fs.existsSync(path.resolve(cwd, './simo.config.ts'));
  let config = null;

  if (!tsConfPathExist && !jsConfPathExist) {
    throw new Error(`${cwd} 路径下不存在 simo.config 配置文件`);
  }

  if (tsConfPathExist) {
    config = require(path.resolve(cwd, './simo.config.ts'));
  } else if (jsConfPathExist) {
    config = require(path.resolve(cwd, './simo.config.js'));
  }

  // 支持对象和函数两种方式
  if (typeof config === 'function') {
    config = { ...defaultConfig, ...config(env) };
  } else {
    config = { ...defaultConfig, config };
  }

  const { error, value } = verifyConfig(config);

  if (error) {
    logger.error(`配置项错误:${error}`);
    process.exit(1);
  } else {
    return value;
  }
};

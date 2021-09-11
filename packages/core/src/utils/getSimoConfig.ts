import path from 'path';
import fs from 'fs';
import { logger } from '@chrissong/simo-utils';

import { IObj } from '../../type';
import defaultConfig from './defaultConfig';
import verifyConfig from './verifyConfig';
import getExistFile from './getExistFile';

export const CONFIG_FILES = ['simo.config.js', 'simo.config.ts', '.simorc.ts', '.simorc.js'];

export default (cwd: string, env: IObj) => {
  const configFile = getExistFile({
    cwd,
    files: CONFIG_FILES,
    returnRelative: false,
  });

  if (!configFile) {
    throw new Error(`${cwd} 路径下不存在 simo-cli 的配置文件`);
  }

  let config = require(path.resolve(cwd, configFile));

  // 支持对象和函数两种方式
  if (typeof config === 'function') {
    config = { ...defaultConfig, ...config(env) };
  } else if (typeof config === 'object' && config !== null) {
    config = { ...defaultConfig, ...config };
  }

  const { error, value } = verifyConfig(config);

  if (error) {
    logger.error(`配置项错误:${error}`);
    process.exit(1);
  } else {
    return value;
  }
};

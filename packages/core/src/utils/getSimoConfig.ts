import path from 'path';
import fs from 'fs';

import { IObj } from '../../type';
import defaultConfig from '../constant/defaultConfig';

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
  return typeof config === 'function'
    ? { ...defaultConfig, ...config(env) }
    : { ...defaultConfig, config };
};

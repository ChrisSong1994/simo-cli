import path from 'path';
import fs from 'fs';

// import defineConfig from './defineConfig';

export default (cwd: string) => {
  // 匹配 simo.config.(j|t)s
  const jsConfPathExist = fs.existsSync(path.resolve(cwd, './simo.config.js'));
  const tsConfPathExist = fs.existsSync(path.resolve(cwd, './simo.config.ts'));

  if (!tsConfPathExist && !jsConfPathExist) {
    throw new Error(`${cwd} 路径下不存在 simo.config 配置文件`);
  }
  if (tsConfPathExist) {
    return require(path.resolve(cwd, './simo.config.ts'));
  } else if (jsConfPathExist) {
    return require(path.resolve(cwd, './simo.config.js'));
  }
};

import path from 'path';
import fs from 'fs';

export default (cwd: string) => {
  const configPath = path.resolve(cwd, './simo.config.js');
  if (fs.existsSync(configPath)) {
    throw new Error(`${cwd} 路径下没有 easy.config.js 配置文件`);
  } else {
    return require(configPath);
  }
};

import path from 'path';
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

/**
 * 加载项目环境变量
 * @param{string} cwd  项目目录
 */
const loadEnv = (cwd: string) => {
  const basePath = path.resolve(cwd, '.env');
  try {
    const env = dotenv.config({ path: basePath });
    dotenvExpand(env);
  } catch (err:any) {
    if (err.toString().indexOf('ENOENT') < 0) {
      throw err;
    }
  }
};

export default loadEnv;

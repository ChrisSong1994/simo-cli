import fs from 'fs-extra';

import rimrafPromify from './rimrafPromify';

/** 拷贝文件，对于目录会进行递归拷贝
 * @param {String}source
 * @param {String}target
 */
const copyFiles = async (source: string, target: string): Promise<void> => {
  try {
    // const isFile = await pathIsFile(target);
    // const isExists = fs.existsSync(target);
    // if (isExists && isFile) await rimrafPromify(target);
    await rimrafPromify(target);
    await fs.copy(source, target); // 拷贝文件夹会直接把文件内容递归拷贝
  } catch (err) {
    console.error(err);
  }
};

export default copyFiles;

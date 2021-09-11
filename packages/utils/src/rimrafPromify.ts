import rimraf from 'rimraf';

/** rimraf 函数的promise 改造
 * @param {String} pathStr
 */
const rimrafPromify = (pathStr: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    rimraf(pathStr, (error) => {
      if (error) return reject(error);
      resolve(pathStr);
    });
  });
};

export default rimrafPromify;

/**
 * 把任务集合转换为串行任务
 * 串行执行时可指定每次同时(并发)可执行任务的条数
 * @param {Array} items 任务列表
 * @param {Number} length 每次并发任务的条数
 * @return {Promise<Array>} Promise对象按切片执行结果
 */
const parallelToSerial = (items: Array<() => Promise<any>>, length: number = 1): Promise<any[]> => {
  return new Promise((resolve, reject) => {
    const res: any[] = [];
    function next(i: number) {
      const slice: any = items.slice(i, i + length);
      i += length;
      // 如果数据执行完之后就直接返回
      if (slice.length) {
        // 执行处理逻辑
        Promise.all(slice.map((item: () => Promise<any>) => item()))
          .then((value) => {
            res.push(...value);
            next(i);
          })
          .catch((err: any) => reject(err));
      } else {
        resolve(res);
      }
    }
    next(0);
  });
};

export default parallelToSerial;

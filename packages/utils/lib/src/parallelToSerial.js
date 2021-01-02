"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 把任务集合转换为串行任务
 * 串行执行时可指定每次同时(并发)可执行任务的条数
 * @param {Array} items 任务列表
 * @param {Number} length 每次并发任务的条数
 * @return {Promise<Array>} Promise对象按切片执行结果
 */
const parallelToSerial = (items, length = 1) => {
    return new Promise((resolve, reject) => {
        const res = [];
        function next(i) {
            const slice = items.slice(i, i + length);
            i += length;
            // 如果数据执行完之后就直接返回
            if (slice.length) {
                // 执行处理逻辑
                Promise.all(slice.map((item) => item()))
                    .then((value) => {
                    res.push(...value);
                    next(i);
                })
                    .catch((err) => reject(err));
            }
            else {
                resolve(res);
            }
        }
        next(0);
    });
};
exports.default = parallelToSerial;
//# sourceMappingURL=parallelToSerial.js.map
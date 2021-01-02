/**
 * 把任务集合转换为串行任务
 * 串行执行时可指定每次同时(并发)可执行任务的条数
 * @param {Array} items 任务列表
 * @param {Number} length 每次并发任务的条数
 * @return {Promise<Array>} Promise对象按切片执行结果
 */
declare const parallelToSerial: (items: Array<() => Promise<any>>, length?: number) => Promise<any[]>;
export default parallelToSerial;

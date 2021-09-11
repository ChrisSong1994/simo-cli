/**
 * 捕获promise返回的结果
 * @param {Promise} promise 任务列表
 * @return {Promise} 返回一个promise实例
 */
declare const errorCapture: (promise: Promise<any>) => Promise<any>;
export default errorCapture;

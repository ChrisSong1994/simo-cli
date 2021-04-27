/**
 * 捕获promise返回的结果
 * @param {Promise} promise 任务列表
 * @return {Promise} 返回一个promise实例
 */
const errorCapture = (promise: Promise<any>): Promise<any> => {
  return promise
    .then((data: any) => {
      return [null, data]
    })
    .catch((err: any) => [err, null])
}
export default errorCapture

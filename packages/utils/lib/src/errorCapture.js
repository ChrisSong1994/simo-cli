"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 捕获promise返回的结果
 * @param {Promise} promise 任务列表
 * @return {Promise} 返回一个promise实例
 */
var errorCapture = function (promise) {
    return promise
        .then(function (data) {
        return [null, data];
    })
        .catch(function (err) { return [err, null]; });
};
exports.default = errorCapture;
//# sourceMappingURL=errorCapture.js.map
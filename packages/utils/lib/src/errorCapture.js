"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errorCapture = function (promise) {
    return promise
        .then(function (data) {
        return [null, data];
    })
        .catch(function (err) { return [err, null]; });
};
exports.default = errorCapture;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var parallelToSerial = function (items, length) {
    if (length === void 0) { length = 1; }
    return new Promise(function (resolve, reject) {
        var res = [];
        function next(i) {
            var slice = items.slice(i, i + length);
            i += length;
            if (slice.length) {
                Promise.all(slice.map(function (item) { return item(); }))
                    .then(function (value) {
                    res.push.apply(res, value);
                    next(i);
                })
                    .catch(function (err) { return reject(err); });
            }
            else {
                resolve(res);
            }
        }
        next(0);
    });
};
exports.default = parallelToSerial;

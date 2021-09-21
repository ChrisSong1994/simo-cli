"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var rimraf_1 = __importDefault(require("rimraf"));
var rimrafPromify = function (pathStr) {
    return new Promise(function (resolve, reject) {
        (0, rimraf_1.default)(pathStr, function (error) {
            if (error)
                return reject(error);
            resolve(pathStr);
        });
    });
};
exports.default = rimrafPromify;

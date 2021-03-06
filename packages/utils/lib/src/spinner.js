"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pause = exports.resume = exports.stop = exports.start = void 0;
var ora_1 = __importDefault(require("ora"));
var spinner = ora_1.default();
var start = function (msg) {
    spinner.text = msg;
    spinner.start();
};
exports.start = start;
var stop = function () {
    spinner.stop();
};
exports.stop = stop;
var resume = function () {
    spinner.start();
};
exports.resume = resume;
var pause = function () {
    spinner.stop();
};
exports.pause = pause;
//# sourceMappingURL=spinner.js.map
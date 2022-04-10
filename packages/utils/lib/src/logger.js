"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = __importDefault(require("chalk"));
var format = function (label, msg) {
    return msg
        .split('\n')
        .map(function (line, i) { return (i === 0 ? "".concat(label, " ").concat(line) : line.padStart(chalk_1.default.reset(label).length)); })
        .join('\n');
};
var log = function (msg) {
    if (msg === void 0) { msg = ''; }
    return console.log(msg);
};
var done = function (msg) {
    if (msg === void 0) { msg = ''; }
    return console.log(format(chalk_1.default.bgGreen.black(' DONE '), msg));
};
var warn = function (msg) {
    if (msg === void 0) { msg = ''; }
    return console.warn(format(chalk_1.default.bgYellow.black(' WARN '), chalk_1.default.yellow(msg)));
};
var error = function (msg) {
    if (msg === void 0) { msg = ''; }
    return console.error(format(chalk_1.default.bgRed(' ERROR '), chalk_1.default.red(msg)));
};
exports.default = {
    log: log,
    done: done,
    error: error,
    warn: warn,
};

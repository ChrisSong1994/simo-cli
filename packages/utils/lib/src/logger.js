"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const format = (label, msg) => {
    return msg
        .split('\n')
        .map((line, i) => (i === 0 ? `${label} ${line}` : line.padStart(chalk_1.default.reset(label).length)))
        .join('\n');
};
const log = (msg = '') => console.log(msg);
const done = (msg = '') => console.log(format(chalk_1.default.bgGreen.black(' DONE '), msg));
const warn = (msg = '') => console.warn(format(chalk_1.default.bgYellow.black(' WARN '), chalk_1.default.yellow(msg)));
const error = (msg = '') => console.error(format(chalk_1.default.bgRed(' ERROR '), chalk_1.default.red(msg)));
exports.default = {
    log,
    done,
    error,
    warn,
};
//# sourceMappingURL=logger.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pause = exports.resume = exports.stop = exports.start = void 0;
const ora_1 = __importDefault(require("ora"));
const chalk_1 = __importDefault(require("chalk"));
const spinner = ora_1.default();
let lastMsg = null;
exports.start = (symbol, msg) => {
    if (!msg) {
        msg = symbol;
        symbol = chalk_1.default.green('🍺');
    }
    if (lastMsg) {
        spinner.stopAndPersist({
            symbol: lastMsg.symbol,
            text: lastMsg.text,
        });
    }
    spinner.text = ' ' + msg;
    lastMsg = {
        symbol: symbol + ' ',
        text: msg,
    };
    spinner.start();
};
exports.stop = (persist) => {
    if (lastMsg && persist !== false) {
        spinner.stopAndPersist({
            symbol: lastMsg.symbol,
            text: lastMsg.text,
        });
    }
    else {
        spinner.stop();
    }
    lastMsg = null;
};
exports.resume = () => {
    spinner.start();
};
exports.pause = () => {
    spinner.stop();
};
//# sourceMappingURL=spinner.js.map
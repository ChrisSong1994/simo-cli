"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pause = exports.resume = exports.stop = exports.start = void 0;
var ora_1 = __importDefault(require("ora"));
var chalk_1 = __importDefault(require("chalk"));
var spinner = ora_1.default();
var lastMsg = null;
var start = function (symbol, msg) {
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
exports.start = start;
var stop = function (persist) {
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
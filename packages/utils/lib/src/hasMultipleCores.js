"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var os_1 = __importDefault(require("os"));
exports.default = (function () {
    try {
        return os_1.default.cpus().length > 1;
    }
    catch (e) {
        return false;
    }
});

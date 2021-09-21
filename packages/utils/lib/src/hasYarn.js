"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var which_1 = __importDefault(require("which"));
exports.default = (function () {
    return which_1.default.sync('yarn', { nothrow: true });
});

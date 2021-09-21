"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var resolvePath = function (base, target) { return path_1.default.resolve(base, target); };
var getPaths = function (base) {
    return {
        appPkgPath: resolvePath(base, './package.json'),
        appTsConfigPath: resolvePath(base, './tsconfig.json'),
        appSimoConfigPath: resolvePath(base, './simo.config.js'),
    };
};
exports.default = getPaths;

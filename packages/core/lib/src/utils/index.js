"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getExistFile = exports.getPaths = exports.getProxy = exports.formatStats = exports.getSimoConfig = void 0;
var getSimoConfig_1 = require("./getSimoConfig");
Object.defineProperty(exports, "getSimoConfig", { enumerable: true, get: function () { return __importDefault(getSimoConfig_1).default; } });
var formatStats_1 = require("./formatStats");
Object.defineProperty(exports, "formatStats", { enumerable: true, get: function () { return __importDefault(formatStats_1).default; } });
var getProxy_1 = require("./getProxy");
Object.defineProperty(exports, "getProxy", { enumerable: true, get: function () { return __importDefault(getProxy_1).default; } });
var getPaths_1 = require("./getPaths");
Object.defineProperty(exports, "getPaths", { enumerable: true, get: function () { return __importDefault(getPaths_1).default; } });
var getExistFile_1 = require("./getExistFile");
Object.defineProperty(exports, "getExistFile", { enumerable: true, get: function () { return __importDefault(getExistFile_1).default; } });

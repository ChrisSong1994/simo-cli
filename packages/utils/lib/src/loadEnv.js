"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var dotenv_1 = __importDefault(require("dotenv"));
var dotenv_expand_1 = __importDefault(require("dotenv-expand"));
var loadEnv = function (cwd) {
    var basePath = path_1.default.resolve(cwd, '.env');
    try {
        var env = dotenv_1.default.config({ path: basePath });
        (0, dotenv_expand_1.default)(env);
    }
    catch (err) {
        if (err.toString().indexOf('ENOENT') < 0) {
            throw err;
        }
    }
};
exports.default = loadEnv;

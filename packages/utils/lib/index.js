"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergeConfig = exports.parallelToSerial = exports.spinner = exports.loadEnv = exports.updateNotifier = exports.logger = exports.execa = exports.chalk = exports.deepmerge = exports.open = exports.fs = void 0;
var fs_extra_1 = __importDefault(require("fs-extra"));
exports.fs = fs_extra_1.default;
var open_1 = __importDefault(require("open"));
exports.open = open_1.default;
var deepmerge_1 = __importDefault(require("deepmerge"));
exports.deepmerge = deepmerge_1.default;
var chalk_1 = __importDefault(require("chalk"));
exports.chalk = chalk_1.default;
var execa_1 = __importDefault(require("execa"));
exports.execa = execa_1.default;
var logger_1 = __importDefault(require("./src/logger"));
exports.logger = logger_1.default;
var updateNotifier_1 = __importDefault(require("./src/updateNotifier"));
exports.updateNotifier = updateNotifier_1.default;
var loadEnv_1 = __importDefault(require("./src/loadEnv"));
exports.loadEnv = loadEnv_1.default;
var spinner = __importStar(require("./src/spinner"));
exports.spinner = spinner;
var parallelToSerial_1 = __importDefault(require("./src/parallelToSerial"));
exports.parallelToSerial = parallelToSerial_1.default;
var mergeConfig_1 = __importDefault(require("./src/mergeConfig"));
exports.mergeConfig = mergeConfig_1.default;
//# sourceMappingURL=index.js.map
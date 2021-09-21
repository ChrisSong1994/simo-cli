"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var webpack_1 = __importDefault(require("webpack"));
var simo_utils_1 = require("@chrissong/simo-utils");
var lodash_1 = __importDefault(require("lodash"));
var path_1 = __importDefault(require("path"));
var api_1 = __importDefault(require("../api"));
var utils_1 = require("../utils");
exports.default = (function (options) { return __awaiter(void 0, void 0, void 0, function () {
    var api, config;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                api = new api_1.default('production', options);
                return [4, api.resolveWebpackConfig()];
            case 1:
                config = _a.sent();
                return [2, new Promise(function (resolve, reject) {
                        (0, webpack_1.default)(config, function (error, stats) {
                            if (error || !stats)
                                return reject(error);
                            if (error || stats.compilation.errors.length) {
                                simo_utils_1.logger.log(stats.toString({ colors: true, all: false, errors: true, warnings: true }));
                                process.exit(1);
                            }
                            else {
                                simo_utils_1.logger.log(stats.toString({ colors: true, all: false, errors: true, warnings: true }));
                                simo_utils_1.logger.log((0, utils_1.formatStats)(stats, lodash_1.default.get(options, 'simoConfig.output.path', ''), api));
                            }
                            if (stats.hasErrors()) {
                                simo_utils_1.logger.error(' 打包失败');
                                reject(new Error('Webpack build failed'));
                            }
                            else if (stats.hasWarnings()) {
                                simo_utils_1.logger.warn('打包成功，但具有警告信息');
                                resolve('success');
                            }
                            else {
                                simo_utils_1.logger.done('打包成功');
                                resolve('success');
                            }
                        });
                    }).then(function () {
                        if (simo_utils_1.fs.existsSync(api.resolve('./public'))) {
                            simo_utils_1.fs.copySync(api.resolve('./public'), api.resolve(lodash_1.default.get(options, 'simoConfig.output.path', '')), {
                                dereference: true,
                                filter: function (file) { return path_1.default.extname(file) !== '.html'; },
                            });
                        }
                    })];
        }
    });
}); });

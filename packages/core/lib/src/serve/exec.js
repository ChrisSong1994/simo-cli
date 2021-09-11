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
var webpack_dev_server_1 = __importDefault(require("webpack-dev-server"));
var simo_utils_1 = require("@chrissong/simo-utils");
var api_1 = __importDefault(require("../api"));
// 服务启动
var server = function (options) { return __awaiter(void 0, void 0, void 0, function () {
    var api, config, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                api = new api_1.default('development', options);
                return [4 /*yield*/, api.resolveWebpackConfig()];
            case 1:
                config = _a.sent();
                return [4 /*yield*/, simo_utils_1.findProcess('port', config.devServer.port)];
            case 2:
                result = _a.sent();
                if (result.length) {
                    simo_utils_1.logger.warn("\u26D4 \u7AEF\u53E3\u53F7 " + simo_utils_1.chalk.underline(config.devServer.port) + " \u88AB\u5360\u7528\uFF0C\u8BF7\u4FEE\u6539\u7AEF\u53E3\u53F7\uFF01");
                    return [2 /*return*/, Promise.reject()];
                }
                return [2 /*return*/, new Promise(function (resolve, reject) { return __awaiter(void 0, void 0, void 0, function () {
                        var compiler, server, isDefaultHost;
                        return __generator(this, function (_a) {
                            compiler = webpack_1.default(config);
                            server = new webpack_dev_server_1.default(compiler, config.devServer);
                            isDefaultHost = ['localhost', '0.0.0.0', '127.0.0.1'].includes(config.devServer.host);
                            server.listen(config.devServer.port, isDefaultHost ? '0.0.0.0' : config.devServer.host, function (err) {
                                if (err)
                                    return reject(err);
                                resolve(null);
                                if (api.argv.open) {
                                    simo_utils_1.open("http://" + config.devServer.host + ":" + config.devServer.port);
                                }
                                else {
                                    var localUrl = "http://" + config.devServer.host + ":" + config.devServer.port;
                                    var lanUrl = "http://" + simo_utils_1.address.ip() + ":" + config.devServer.port;
                                    var copied = '';
                                    try {
                                        simo_utils_1.clipboardy.writeSync(localUrl);
                                        copied = simo_utils_1.chalk.dim('(copied to clipboard)');
                                    }
                                    catch (e) {
                                        copied = simo_utils_1.chalk.red("(copy to clipboard failed)");
                                    }
                                    simo_utils_1.logger.log("\n      App running at:\n       - Local: " + simo_utils_1.chalk.cyan(localUrl) + " " + copied + "\n       " + (isDefaultHost ? " - Network: " + simo_utils_1.chalk.cyan(lanUrl) + " \n" : '') + "\n      Note that the development build is not optimized.\n      To create a production build, use " + simo_utils_1.chalk.cyan(simo_utils_1.hasYarn() ? 'yarn build' : 'npm build') + ".\n        ");
                                }
                            });
                            return [2 /*return*/];
                        });
                    }); })];
        }
    });
}); };
exports.default = server;
//# sourceMappingURL=exec.js.map
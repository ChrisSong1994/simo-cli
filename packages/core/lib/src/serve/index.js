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
var simo_utils_1 = require("@chrissong/simo-utils");
var path_1 = __importDefault(require("path"));
var fkill_1 = __importDefault(require("fkill"));
var chokidar_1 = __importDefault(require("chokidar"));
var lodash_1 = require("lodash");
var utils_1 = require("../utils");
var createServer = function (cli) {
    return cli
        .fork(path_1.default.resolve(__dirname, './serve'), cli.argv, {
        cwd: cli.cwd,
        env: cli.env,
        stdio: 'inherit',
    })
        .on('message', function (msg) { return msg === 'EXIT_WITH_ERROR' && cli.exit(1); });
};
exports.default = (function (cli, argv) {
    simo_utils_1.logger.log('🚀  正在启动开发服务,请稍等...');
    var watchFiles = (0, utils_1.getSimoConfig)(process.cwd(), process.env).watchFiles;
    var serverprocess = createServer(cli);
    function updateServer() {
        return __awaiter(this, void 0, void 0, function () {
            var err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        simo_utils_1.logger.log('🚀  检测到配置文件变化,服务正在自动重启...');
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4, (0, fkill_1.default)(serverprocess.pid)];
                    case 2:
                        _a.sent();
                        return [3, 4];
                    case 3:
                        err_1 = _a.sent();
                        return [2, simo_utils_1.logger.error(err_1.toString())];
                    case 4:
                        serverprocess = createServer(cli);
                        return [2];
                }
            });
        });
    }
    var watcher = chokidar_1.default.watch(watchFiles, {
        cwd: cli.cwd,
    });
    watcher.on('change', (0, lodash_1.debounce)(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            updateServer();
            return [2];
        });
    }); }, 300));
    serverprocess.on('message', function (msg) {
        if (msg === 'SIMO_SERVER_UPDATE') {
            updateServer();
        }
    });
});

"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var yargs_1 = __importDefault(require("yargs"));
var chalk_1 = __importDefault(require("chalk"));
var child_process_1 = require("child_process");
var simo_utils_1 = require("@chrissong/simo-utils");
var lodash_1 = __importDefault(require("lodash"));
var fkill_1 = __importDefault(require("fkill"));
// import updateNotifier from 'update-notifier';
var create_1 = __importDefault(require("./src/create"));
var serve_1 = __importDefault(require("./src/serve"));
var build_1 = __importDefault(require("./src/build"));
var inspect_1 = __importDefault(require("./src/inspect"));
var template_1 = __importDefault(require("./src/template"));
var defaultPlugins = [create_1.default, serve_1.default, build_1.default, inspect_1.default, template_1.default];
/** 命令行
 * 1.初始化命令行参数
 * 2.检查包更新情况
 * 3.获取项目配置，加载命令，监听进程
 * */
var Cli = /** @class */ (function () {
    function Cli(cwd, argv) {
        if (argv === void 0) { argv = []; }
        this.plugins = defaultPlugins;
        this.cwd = cwd;
        this.argv = argv;
        this.subprocess = [];
        this.commands = {};
        this.env = lodash_1.default.cloneDeep(process.env);
        this.pkg = this.resolvePackages();
        this.processMonitor();
        this.init();
    }
    Cli.prototype.init = function () {
        var _this = this;
        // 检查node版本 （wWebpack 5 对 Node.js 的版本要求至少是 10.13.0 (LTS) ）
        if (!simo_utils_1.semverGt(process.versions.node, '10.13.0')) {
            simo_utils_1.logger.warn("\u8BF7\u5347\u7EA7\u60A8\u6240\u4F7F\u7528\u7684Node.js\u7248\u672C\u523010.13.0\u4EE5\u4E0A");
            process.exit(0);
        }
        // // 检查安装包更新情况
        // updateNotifier({
        //   pkg: this.pkg,
        //   updateCheckInterval: 1000 * 60 * 60 * 24 * 7,
        // }).notify();
        // 初始化插件
        this.plugins.forEach(function (plugin) { return plugin(_this); });
    };
    // 读取项目package.json
    Cli.prototype.resolvePackages = function () {
        var pkgPath = path_1.default.resolve(this.cwd, 'package.json');
        if (!simo_utils_1.fs.existsSync(pkgPath))
            return {};
        try {
            return require(pkgPath);
        }
        catch (err) {
            simo_utils_1.logger.error("\u8BFB\u53D6" + pkgPath + "\u5931\u8D25\uFF01");
            return {};
        }
    };
    // 创建子进程执行
    Cli.prototype.fork = function (path, argv, options) {
        var _this = this;
        var subprocess = child_process_1.fork(path, argv, __assign({ env: this.env }, options));
        subprocess.on('close', function () {
            var index = _this.subprocess.findIndex(function (item) { return item === subprocess; });
            _this.subprocess.splice(index, 1);
        });
        this.subprocess.push(subprocess);
        return subprocess;
    };
    /**
     * 退出进程
     * @param {Number} code
     **/
    Cli.prototype.exit = function (code) {
        return __awaiter(this, void 0, void 0, function () {
            var subPIds;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        subPIds = this.subprocess.map(function (subp) { return subp.pid; });
                        return [4 /*yield*/, fkill_1.default(subPIds, { force: true, tree: true })];
                    case 1:
                        _a.sent();
                        process.exit(code);
                        return [2 /*return*/];
                }
            });
        });
    };
    // 进程监听
    Cli.prototype.processMonitor = function () {
        var _this = this;
        var handleExit = function (signal) {
            simo_utils_1.logger.done("\uD83D\uDE4B \u63A5\u53D7\u5230\u4FE1\u53F7\uFF1A" + signal + " \u5373\u5C06\u9000\u51FA\u7A0B\u5E8F...");
            _this.subprocess.forEach(function (subprocess) {
                if (!subprocess.killed)
                    subprocess.kill();
            });
            process.exit(0);
        };
        process.on('SIGINT', handleExit);
        process.on('SIGTERM', handleExit);
    };
    // 注册命令
    Cli.prototype.register = function (cmd, desc) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var name = cmd.split(/\s+/)[0];
        // 只能有数字、字母、下划线、冒号组成
        if (!/^[\w]+$/.test(name)) {
            throw new Error("\u547D\u4EE4\u540D\u79F0 " + chalk_1.default.redBright(name) + " \u4E0D\u5408\u6CD5\uFF0C\u53EA\u80FD\u662F\u5B57\u6BCD\u3001\u6570\u5B57\u3001\u4E0B\u5212\u7EBF");
        }
        if (this.commands[name]) {
            throw new Error("\u547D\u4EE4 " + chalk_1.default.redBright(name) + " \u5DF2\u7ECF\u88AB\u5360\u7528");
        }
        yargs_1.default.command.apply(yargs_1.default, __spreadArrays([cmd, desc], args));
        this.commands[name] = __assign({ cmd: cmd, desc: desc }, args);
    };
    // 解析命令
    Cli.prototype.parse = function (argv) {
        this.argv = argv;
        if (this.argv.length) {
            yargs_1.default.parse(this.argv);
        }
        else {
            yargs_1.default.showHelp();
        }
    };
    return Cli;
}());
exports.default = Cli;
//# sourceMappingURL=cli.js.map
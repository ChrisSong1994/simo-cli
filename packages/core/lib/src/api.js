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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var webpack_chain_1 = __importDefault(require("webpack-chain"));
var simo_utils_1 = require("@chrissong/simo-utils");
var utils_1 = require("./utils");
var Api = (function () {
    function Api(mode, options) {
        this.mode = mode;
        this.options = this.formatOptions(options);
        this.pkg = this.resolvePackage();
        this.plugins = this.resolvePlugins();
    }
    Object.defineProperty(Api.prototype, "env", {
        get: function () {
            return this.options.env;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Api.prototype, "argv", {
        get: function () {
            var argv = this.options.argv;
            return __assign(__assign({}, argv), { open: argv.open, port: argv.port, report: argv.report, sourcemap: argv.sourcemap });
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Api.prototype, "context", {
        get: function () {
            return this.options.cwd;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Api.prototype, "simoConfig", {
        get: function () {
            return this.options.simoConfig;
        },
        enumerable: false,
        configurable: true
    });
    Api.prototype.resolve = function (dir) {
        var absulatePath = path_1.default.resolve(this.context, dir);
        return absulatePath;
    };
    Api.prototype.formatOptions = function (option) {
        var _a = option.simoConfig, chainWebpack = _a.chainWebpack, restConfig = __rest(_a, ["chainWebpack"]);
        return __assign(__assign({}, option), { simoConfig: __assign(__assign({}, restConfig), { chainWebpack: function (config) {
                    if (typeof chainWebpack === 'function')
                        chainWebpack(config);
                    return config;
                } }) });
    };
    Api.prototype.resolvePackage = function () {
        var pkg = this.resolve('package.json');
        if (simo_utils_1.fs.existsSync(pkg)) {
            try {
                return require(pkg);
            }
            catch (e) {
                simo_utils_1.logger.error("\u8BFB\u53D6 " + pkg + " \u5931\u8D25");
                return {};
            }
        }
        return {};
    };
    Api.prototype.resolvePlugins = function () {
        var plugins = [
            './webpack/webpack.base.config',
            './webpack/webpack.dev.config',
            './webpack/webpack.prod.config',
        ];
        return plugins.map(function (id) {
            try {
                return require(id).default;
            }
            catch (err) {
                simo_utils_1.logger.error("\u63D2\u4EF6 " + id + " \u52A0\u8F7D\u5931\u8D25");
                throw err;
            }
        });
    };
    Api.prototype.resolveWebpackConfig = function () {
        return __awaiter(this, void 0, void 0, function () {
            var config, chainWebpack;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        config = new webpack_chain_1.default();
                        chainWebpack = this.simoConfig.chainWebpack;
                        return [4, (0, simo_utils_1.parallelToSerial)(this.plugins.map(this.use(config)))];
                    case 1:
                        _a.sent();
                        return [2, chainWebpack(config).toConfig()];
                }
            });
        });
    };
    Api.prototype.use = function (config) {
        var _this = this;
        return function (plugin) {
            var api = {
                env: _this.env,
                pkg: _this.pkg,
                mode: _this.mode,
                argv: _this.argv,
                simoConfig: _this.simoConfig,
                context: _this.context,
                paths: (0, utils_1.getPaths)(_this.context),
                resolve: function (dir) { return _this.resolve(dir); },
                chainWebpack: function (callback) { return callback(config); },
            };
            return function () { return plugin(api); };
        };
    };
    return Api;
}());
exports.default = Api;

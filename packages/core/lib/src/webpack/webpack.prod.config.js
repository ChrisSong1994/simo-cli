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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var terser_webpack_plugin_1 = __importDefault(require("terser-webpack-plugin"));
var webpack_bundle_analyzer_1 = require("webpack-bundle-analyzer");
var clean_webpack_plugin_1 = require("clean-webpack-plugin");
var copy_webpack_plugin_1 = __importDefault(require("copy-webpack-plugin"));
var lodash_1 = __importDefault(require("lodash"));
var cssLoader_1 = __importDefault(require("./cssLoader"));
exports.default = (function (api) {
    api.chainWebpack(function (config) { return __awaiter(void 0, void 0, void 0, function () {
        var _a, copyPath, output, publicPath, browsersList, parallel, cssExtract, externals;
        return __generator(this, function (_b) {
            if (api.mode !== 'production')
                return [2];
            _a = api.simoConfig, copyPath = _a.copyPath, output = _a.output, publicPath = _a.publicPath, browsersList = _a.browsersList, parallel = _a.parallel, cssExtract = _a.cssExtract, externals = _a.externals;
            (0, cssLoader_1.default)(config, {
                isProd: true,
                sourceMap: false,
                cssExtract: cssExtract,
                filename: '[name].css',
                chunkFilename: '[id].css',
                publicPath: publicPath,
                browsersList: browsersList,
            });
            config
                .watch(false)
                .mode('production')
                .devtool(api.argv.sourcemap ? 'source-map' : false)
                .output.filename(lodash_1.default.get(output, 'filename') || '[name].[contenthash:8].js')
                .chunkFilename('[id].js');
            config.when(externals, function (config) {
                config.externals(externals);
            });
            config.when(api.argv.report, function (config) {
                config.plugin('bundle-analyzer').use(webpack_bundle_analyzer_1.BundleAnalyzerPlugin);
            });
            config.when(copyPath, function () {
                if (typeof copyPath === 'string') {
                    config.plugin('static-copy').use(copy_webpack_plugin_1.default, [
                        {
                            patterns: [
                                {
                                    from: api.resolve(copyPath),
                                    to: api.resolve(output.path),
                                    toType: 'dir',
                                    noErrorOnMissing: true,
                                },
                            ],
                        },
                    ]);
                }
                if (Array.isArray(copyPath)) {
                    config.plugin('static-copy').use(copy_webpack_plugin_1.default, [
                        {
                            patterns: copyPath.map(function (item) { return (__assign(__assign({}, item), { from: api.resolve(item.from), to: api.resolve(item.to, output.path) })); }),
                        },
                    ]);
                }
            });
            config.plugin('clean').use(clean_webpack_plugin_1.CleanWebpackPlugin);
            config.performance.hints(false);
            config.optimization.minimize(true);
            config.optimization.splitChunks({
                chunks: 'async',
                minSize: 20000,
                minRemainingSize: 0,
                minChunks: 1,
                maxAsyncRequests: 30,
                maxInitialRequests: 30,
                enforceSizeThreshold: 50000,
                cacheGroups: {
                    defaultVendors: {
                        test: /[\\/]node_modules[\\/]/,
                        priority: -10,
                        reuseExistingChunk: true,
                    },
                    default: {
                        minChunks: 2,
                        priority: -20,
                        reuseExistingChunk: true,
                    },
                },
            });
            config.optimization.minimizer('terser').use(terser_webpack_plugin_1.default, [
                {
                    parallel: parallel,
                    extractComments: false,
                },
            ]);
            return [2];
        });
    }); });
});

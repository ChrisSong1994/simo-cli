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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanRequireCache = exports.getMockData = exports.normalizeConfig = exports.parseKey = exports.getMockConfig = void 0;
var simo_utils_1 = require("@chrissong/simo-utils");
var assert_1 = __importDefault(require("assert"));
var fs_1 = require("fs");
var path_1 = require("path");
var VALID_METHODS = ['get', 'post', 'put', 'patch', 'delete'];
var BODY_PARSED_METHODS = ['post', 'put', 'patch', 'delete'];
var getMockConfig = function (files) {
    return files.reduce(function (memo, mockFile) {
        try {
            var m = require(mockFile);
            memo = __assign(__assign({}, memo), (m.default || m));
            return memo;
        }
        catch (e) {
            throw new Error(e.stack);
        }
    }, {});
};
exports.getMockConfig = getMockConfig;
function parseKey(key) {
    var method = 'get';
    var path = key;
    if (/\s+/.test(key)) {
        var splited = key.split(/\s+/);
        method = splited[0].toLowerCase();
        path = splited[1];
    }
    (0, assert_1.default)(VALID_METHODS.includes(method), "Invalid method " + method + " for path " + path + ", please check your mock files.");
    return {
        method: method,
        path: path,
    };
}
exports.parseKey = parseKey;
function createHandler(method, path, handler) {
    return function (req, res, next) {
        if (BODY_PARSED_METHODS.includes(method)) {
            simo_utils_1.bodyParser.json({ limit: '5mb', strict: false })(req, res, function () {
                simo_utils_1.bodyParser.urlencoded({ limit: '5mb', extended: true })(req, res, function () {
                    sendData();
                });
            });
        }
        else {
            sendData();
        }
        function sendData() {
            if (typeof handler === 'function') {
                (0, simo_utils_1.multer)().any()(req, res, function () {
                    handler(req, res, next);
                });
            }
            else {
                res.json(handler);
            }
        }
    };
}
var normalizeConfig = function (config) {
    return Object.keys(config).reduce(function (memo, key) {
        var handler = config[key];
        var type = typeof handler;
        (0, assert_1.default)(type === 'function' || type === 'object', "mock value of " + key + " should be function or object, but got " + type);
        var _a = parseKey(key), method = _a.method, path = _a.path;
        var keys = [];
        var re = (0, simo_utils_1.pathToRegexp)(path, keys);
        memo.push({
            method: method,
            path: path,
            re: re,
            keys: keys,
            handler: createHandler(method, path, handler),
        });
        return memo;
    }, []);
};
exports.normalizeConfig = normalizeConfig;
var getMockData = function (cwd, ignore) {
    var mockPaths = __spreadArray([], (simo_utils_1.glob.sync('mock/**/*.[jt]s', {
        cwd: cwd,
        ignore: ignore,
    }) || []), true).map(function (path) { return (0, path_1.join)(cwd, path); })
        .filter(function (path) { return path && (0, fs_1.existsSync)(path); });
    var mockData = (0, exports.normalizeConfig)((0, exports.getMockConfig)(mockPaths));
    var mockWatcherPaths = __spreadArray(__spreadArray([], (mockPaths || []), true), [(0, path_1.join)(cwd, 'mock')], false).filter(function (path) { return path && (0, fs_1.existsSync)(path); });
    return {
        mockData: mockData,
        mockPaths: mockPaths,
        mockWatcherPaths: mockWatcherPaths,
    };
};
exports.getMockData = getMockData;
var cleanRequireCache = function (paths) {
    Object.keys(require.cache).forEach(function (file) {
        if (paths.some(function (path) {
            return file.indexOf(path) > -1;
        })) {
            delete require.cache[file];
        }
    });
};
exports.cleanRequireCache = cleanRequireCache;

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
var readline_1 = __importDefault(require("readline"));
var PACKAGE_MANAGER_CONFIG = {
    npm: ['install', '--loglevel', 'error'],
    xnpm: ['install', '--loglevel', 'error'],
    yarn: ['install'],
};
exports.default = (function (targetDir, pkgManager) { return __awaiter(void 0, void 0, void 0, function () {
    var args, cmd;
    return __generator(this, function (_a) {
        args = PACKAGE_MANAGER_CONFIG[pkgManager];
        cmd = pkgManager + " " + args.join(' ');
        simo_utils_1.logger.log("\uD83D\uDE80  \u5B89\u88C5\u9879\u76EE\u4F9D\u8D56 " + simo_utils_1.chalk.cyan(cmd) + "\uFF0C\u8BF7\u7A0D\u7B49...");
        return [2, new Promise(function (resolve, reject) {
                var child = (0, simo_utils_1.execa)(pkgManager, args, {
                    cwd: targetDir,
                    stdio: ['inherit', 'inherit', 'pipe'],
                });
                if (pkgManager === 'yarn') {
                    child.stderr &&
                        child.stderr.on('data', function (buf) {
                            var str = buf.toString();
                            if (/warning/.test(str))
                                return;
                            var progressBarMatch = str.match(/\[.*\] (\d+)\/(\d+)/);
                            if (progressBarMatch) {
                                renderProgressBar(progressBarMatch[1], progressBarMatch[2]);
                                return;
                            }
                            process.stderr.write(buf);
                        });
                }
                child.on('close', function (code) {
                    if (code !== 0) {
                        reject("pkgManager failed: " + pkgManager + " " + args.join(' '));
                        return;
                    }
                    resolve();
                });
            })];
    });
}); });
function renderProgressBar(curr, total) {
    var ratio = Math.min(Math.max(curr / total, 0), 1);
    var bar = " " + curr + "/" + total;
    var availableSpace = Math.max(0, process.stderr.columns - bar.length - 3);
    var width = Math.min(total, availableSpace);
    var completeLength = Math.round(width * ratio);
    var complete = '#'.repeat(completeLength);
    var incomplete = '-'.repeat(width - completeLength);
    toStartOfLine(process.stderr);
    process.stderr.write("[" + complete + incomplete + "]" + bar);
}
function toStartOfLine(stream) {
    if (!simo_utils_1.chalk.supportsColor) {
        stream.write('\r');
        return;
    }
    readline_1.default.cursorTo(stream, 0);
}

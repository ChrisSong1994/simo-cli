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
var api_1 = __importDefault(require("../api"));
exports.default = (function (options) { return __awaiter(void 0, void 0, void 0, function () {
    var api, config, result, targetFile, isOverWrite;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                simo_utils_1.spinner.start('📄  配置打印中...');
                api = new api_1.default('production', options);
                return [4, api.resolveWebpackConfig()];
            case 1:
                config = _a.sent();
                result = JSON.stringify(config, undefined, 2);
                if (!options.argv.filename) return [3, 9];
                targetFile = api.resolve(options.argv.filename + ".json");
                if (!simo_utils_1.fs.existsSync(targetFile)) return [3, 6];
                simo_utils_1.spinner.pause();
                return [4, simo_utils_1.inquirer.prompt([
                        {
                            name: 'isOverWrite',
                            message: "\u5F53\u524D\u6587\u4EF6\u5939\u5DF2\u5B58\u5728" + simo_utils_1.chalk.cyan(options.argv.filename + ".json") + ",\u662F\u5426\u8986\u76D6?",
                            type: 'confirm',
                            default: true,
                        },
                    ])];
            case 2:
                isOverWrite = (_a.sent()).isOverWrite;
                simo_utils_1.spinner.resume();
                if (!isOverWrite) return [3, 5];
                return [4, simo_utils_1.fs.remove(targetFile)];
            case 3:
                _a.sent();
                return [4, simo_utils_1.fs.writeFile(targetFile, result)];
            case 4:
                _a.sent();
                _a.label = 5;
            case 5: return [2, simo_utils_1.spinner.stop()];
            case 6: return [4, simo_utils_1.fs.writeFile(targetFile, result)];
            case 7:
                _a.sent();
                return [2, simo_utils_1.spinner.stop()];
            case 8: return [3, 10];
            case 9:
                simo_utils_1.logger.log(result);
                return [2, simo_utils_1.spinner.stop()];
            case 10: return [2];
        }
    });
}); });

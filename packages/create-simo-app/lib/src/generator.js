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
exports.pullProject = exports.copyDirectory = exports.copyTpl = void 0;
var path_1 = __importDefault(require("path"));
var os_1 = __importDefault(require("os"));
var glob_1 = __importDefault(require("glob"));
var mustache_1 = __importDefault(require("mustache"));
var git_clone_1 = __importDefault(require("git-clone"));
var simo_utils_1 = require("@chrissong/simo-utils");
var copyTpl = function (cwd, params) {
    var tpl = simo_utils_1.fs.readFileSync(params.templatePath, 'utf-8');
    var content = mustache_1.default.render(tpl, params.context);
    console.log(simo_utils_1.chalk.green('Write:') + " " + path_1.default.relative(cwd, params.target));
    simo_utils_1.fs.writeFileSync(params.target, content, 'utf-8');
};
exports.copyTpl = copyTpl;
var copyDirectory = function (params) {
    var files = glob_1.default.sync('**/*', {
        cwd: params.path,
        dot: true,
        ignore: ['**/node_modules/**'],
    });
    files.forEach(function (file) {
        var absFile = path_1.default.join(params.path, file);
        var absTarget = path_1.default.join(params.target, file);
        if (simo_utils_1.fs.statSync(absFile).isDirectory()) {
            if (!simo_utils_1.fs.existsSync(absTarget)) {
                return simo_utils_1.fs.mkdirSync(absTarget);
            }
            return;
        }
        else {
            if (file.endsWith('.tpl')) {
                (0, exports.copyTpl)(params.target, {
                    templatePath: absFile,
                    target: path_1.default.join(params.target, file.replace(/\.tpl$/, '')),
                    context: params.context,
                });
            }
            else {
                console.log(simo_utils_1.chalk.green('Copy: ') + " " + file);
                simo_utils_1.fs.copyFileSync(absFile, absTarget);
            }
        }
    });
};
exports.copyDirectory = copyDirectory;
var pullProject = function (params) { return __awaiter(void 0, void 0, void 0, function () {
    var repository, context, target, tmpdir, _a, err, res, pkgPath, pkgJson;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                repository = params.repository, context = params.context, target = params.target;
                tmpdir = path_1.default.join(os_1.default.tmpdir(), 'simo');
                return [4, simo_utils_1.fs.remove(tmpdir)];
            case 1:
                _b.sent();
                simo_utils_1.spinner.start("\u231B \u514B\u9686\u9879\u76EE");
                return [4, (0, simo_utils_1.errorCapture)(new Promise(function (resolve, reject) {
                        (0, git_clone_1.default)(repository, tmpdir, function (err) {
                            simo_utils_1.spinner.stop();
                            if (!err) {
                                simo_utils_1.logger.done("\u514B\u9686\u6A21\u677F " + simo_utils_1.chalk.yellow(repository + ")") + " \u6210\u529F");
                                return resolve(tmpdir);
                            }
                            else {
                                simo_utils_1.logger.error("\u514B\u9686\u6A21\u677F " + simo_utils_1.chalk.yellow(repository + ")") + " \u5931\u8D25");
                                return reject(err);
                            }
                        });
                    }))];
            case 2:
                _a = _b.sent(), err = _a[0], res = _a[1];
                if (err)
                    process.exit(1);
                simo_utils_1.spinner.start("\u231B \u514B\u9686\u4EE3\u7801");
                pkgPath = path_1.default.resolve(tmpdir, './package.json');
                return [4, simo_utils_1.fs.readJson(pkgPath)];
            case 3:
                pkgJson = _b.sent();
                pkgJson = __assign(__assign({}, pkgJson), context);
                return [4, simo_utils_1.fs.writeJson(pkgPath, pkgJson, { spaces: 2 })];
            case 4:
                _b.sent();
                return [4, Promise.all(simo_utils_1.fs.readdirSync(tmpdir).map(function (file) {
                        return simo_utils_1.fs.move(path_1.default.join(tmpdir, file), path_1.default.join(target, file), {
                            overwrite: true,
                        });
                    }))];
            case 5:
                _b.sent();
                simo_utils_1.spinner.stop();
                return [2];
        }
    });
}); };
exports.pullProject = pullProject;

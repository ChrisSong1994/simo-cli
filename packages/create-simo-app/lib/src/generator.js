"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyDirectory = exports.copyTpl = void 0;
var path_1 = __importDefault(require("path"));
var glob_1 = __importDefault(require("glob"));
var mustache_1 = __importDefault(require("mustache"));
var simo_utils_1 = require("@chrissong/simo-utils");
var copyTpl = function (cwd, opts) {
    var tpl = simo_utils_1.fs.readFileSync(opts.templatePath, 'utf-8');
    var content = mustache_1.default.render(tpl, opts.context);
    console.log(simo_utils_1.chalk.green('Write:') + " " + path_1.default.relative(cwd, opts.target));
    simo_utils_1.fs.writeFileSync(opts.target, content, 'utf-8');
};
exports.copyTpl = copyTpl;
var copyDirectory = function (opts) {
    var files = glob_1.default.sync('**/*', {
        cwd: opts.path,
        dot: true,
        ignore: ['**/node_modules/**'],
    });
    files.forEach(function (file) {
        var absFile = path_1.default.join(opts.path, file);
        var absTarget = path_1.default.join(opts.target, file);
        if (simo_utils_1.fs.statSync(absFile).isDirectory()) {
            if (!simo_utils_1.fs.existsSync(absTarget)) {
                return simo_utils_1.fs.mkdirSync(absTarget);
            }
            return;
        }
        else {
            if (file.endsWith('.tpl')) {
                exports.copyTpl(opts.target, {
                    templatePath: absFile,
                    target: path_1.default.join(opts.target, file.replace(/\.tpl$/, '')),
                    context: opts.context,
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
//# sourceMappingURL=generator.js.map
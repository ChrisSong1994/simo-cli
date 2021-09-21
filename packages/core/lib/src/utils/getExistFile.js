"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var path_1 = require("path");
var getExistFile = function (_a) {
    var cwd = _a.cwd, files = _a.files, returnRelative = _a.returnRelative;
    for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
        var file = files_1[_i];
        var absFilePath = (0, path_1.join)(cwd, file);
        if ((0, fs_1.existsSync)(absFilePath)) {
            return returnRelative ? file : absFilePath;
        }
    }
};
exports.default = getExistFile;

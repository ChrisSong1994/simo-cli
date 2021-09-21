"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var simo_utils_1 = require("@chrissong/simo-utils");
var HOME_PATH = (0, simo_utils_1.getUserHome)();
var getTempStorePath = function () {
    var templateStorePath = path_1.default.join(HOME_PATH, './.simo_template_store.json');
    if (!simo_utils_1.fs.existsSync(templateStorePath)) {
        simo_utils_1.fs.copyFileSync(path_1.default.join(__dirname, '../../.simo_template_store.json'), templateStorePath);
    }
    return templateStorePath;
};
exports.default = getTempStorePath;

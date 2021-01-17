"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var update_notifier_1 = __importDefault(require("update-notifier"));
exports.default = (function (pkg) {
    // 检查安装包更新情况
    update_notifier_1.default({
        pkg: pkg,
        updateCheckInterval: 1000 * 60 * 60 * 24 * 7,
    }).notify();
});
//# sourceMappingURL=updateNotifier.js.map
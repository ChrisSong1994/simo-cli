"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getUserHome() {
    return process.env[process.platform == 'win32' ? 'USERPROFILE' : 'HOME'];
}
exports.default = getUserHome;

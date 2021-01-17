"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverComd = exports.server = exports.build = void 0;
var build_1 = __importDefault(require("./src/build"));
exports.build = build_1.default;
var server_1 = __importDefault(require("./src/server"));
exports.server = server_1.default;
var command_1 = __importDefault(require("./src/server/command"));
exports.serverComd = command_1.default;
//# sourceMappingURL=index.js.map
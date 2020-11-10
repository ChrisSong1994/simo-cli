"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverComd = exports.server = exports.build = exports.init = void 0;
const init_1 = __importDefault(require("./src/init"));
exports.init = init_1.default;
const build_1 = __importDefault(require("./src/build"));
exports.build = build_1.default;
const server_1 = __importDefault(require("./src/server"));
exports.server = server_1.default;
const command_1 = __importDefault(require("./src/server/command"));
exports.serverComd = command_1.default;
//# sourceMappingURL=index.js.map
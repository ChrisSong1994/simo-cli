"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.inspect = exports.serveCmd = exports.serve = exports.build = void 0;
var build_1 = __importDefault(require("./src/build"));
exports.build = build_1.default;
var serve_1 = __importDefault(require("./src/serve"));
exports.serve = serve_1.default;
var command_1 = __importDefault(require("./src/serve/command"));
exports.serveCmd = command_1.default;
var inspect_1 = __importDefault(require("./src/inspect"));
exports.inspect = inspect_1.default;
//# sourceMappingURL=index.js.map
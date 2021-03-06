"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var simo_utils_1 = require("@chrissong/simo-utils");
var utils_1 = require("../utils");
var exec_1 = __importDefault(require("./exec"));
var inspect = function (cli, argv) {
    simo_utils_1.loadEnv(process.cwd());
    var env = Object.assign(process.env, {
        CMD: 'build',
        NODE_ENV: 'production',
        BABEL_ENV: 'production',
    });
    exec_1.default({
        env: env,
        argv: argv,
        cwd: cli.cwd,
        simoConfig: utils_1.getSimoConfig(cli.cwd, env),
    }).catch(function (err) {
        simo_utils_1.logger.log(err);
        process.exit(1);
    });
};
exports.default = inspect;
//# sourceMappingURL=index.js.map
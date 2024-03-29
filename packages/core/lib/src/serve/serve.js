"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var yargs_1 = __importDefault(require("yargs"));
var process_1 = __importDefault(require("process"));
var simo_utils_1 = require("@chrissong/simo-utils");
var command_1 = __importDefault(require("./command"));
var exec_1 = __importDefault(require("./exec"));
var getSimoConfig_1 = __importDefault(require("../utils/getSimoConfig"));
var cmd = command_1.default.cmd, desc = command_1.default.desc, builder = command_1.default.builder;
yargs_1.default
    .command(cmd, desc, builder, function (argv) {
    var cwd = process_1.default.cwd();
    (0, simo_utils_1.loadEnv)(cwd);
    var env = Object.assign(process_1.default.env, {
        NODE_ENV: 'development',
    });
    (0, exec_1.default)({
        env: env,
        argv: argv,
        cwd: cwd,
        simoConfig: (0, getSimoConfig_1.default)(cwd, env),
    }).catch(function (err) {
        simo_utils_1.logger.log(err);
        if (process_1.default.send) {
            process_1.default.send('EXIT_WITH_ERROR');
        }
    });
})
    .parse(process_1.default.argv.slice(2));

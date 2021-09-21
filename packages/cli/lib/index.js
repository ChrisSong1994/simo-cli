"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var yargs_1 = __importDefault(require("yargs"));
var cli_1 = __importDefault(require("./cli"));
var simo_utils_1 = require("@chrissong/simo-utils");
yargs_1.default
    .strict(true)
    .scriptName('simo')
    .usage('$0 <命令> [选项]')
    .alias('help', 'h')
    .alias('version', 'v')
    .wrap(null)
    .fail(function (msg, err, yargs) {
    debugger;
    yargs.showHelp();
    console.log(err);
    simo_utils_1.logger.error(msg);
    if (err)
        process.exit(1);
});
var cli = new cli_1.default(process.cwd());
cli.parse(process.argv.slice(2));

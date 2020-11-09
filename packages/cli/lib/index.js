"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = __importDefault(require("yargs"));
const cli_1 = __importDefault(require("./cli"));
const lib_1 = require("/Users/songjun/WorkSpace/\u5B66\u4E60/git/modules/simo-cli/packages/utils/lib");
yargs_1.default
    .strict(true)
    .scriptName('simo')
    .usage('$0 <命令> [选项]')
    .alias('help', 'h')
    .alias('version', 'v')
    .wrap(null)
    .fail((msg, err, yargs) => {
    if (err)
        throw err;
    lib_1.logger.error(msg);
    yargs.help();
    process.exit(1);
});
debugger;
//   初始化命令行工具
const cli = new cli_1.default(process.cwd());
//# sourceMappingURL=index.js.map
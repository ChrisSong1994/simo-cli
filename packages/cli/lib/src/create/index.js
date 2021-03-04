"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var create_simo_app_1 = __importDefault(require("@chrissong/create-simo-app"));
exports.default = (function (cli) {
    cli.register('create <name>', '初始化项目名称', function (yargs) {
        yargs.positional('name', {
            type: 'string',
            describe: '项目名称',
        });
    }, function (argv) {
        create_simo_app_1.default(cli, argv);
    });
});
//# sourceMappingURL=index.js.map
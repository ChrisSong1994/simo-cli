"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var create_simo_app_1 = require("@chrissong/create-simo-app");
exports.default = (function (cli) {
    cli.register('create <name>', '初始化项目名称', function (yargs) {
        yargs.positional('name', {
            type: 'string',
            describe: '项目名称',
        });
    }, function (argv) {
        create_simo_app_1.create.default(cli, argv);
    });
});

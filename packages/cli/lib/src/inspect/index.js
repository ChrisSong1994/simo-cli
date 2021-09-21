"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var simo_core_1 = require("@chrissong/simo-core");
exports.default = (function (cli) {
    cli.register('inspect', '配置项检出', function (yargs) {
        yargs.option('filename', {
            alias: 'f',
            type: 'string',
            describe: '生成配置文件，可指定文件名',
        });
    }, function (argv) {
        (0, simo_core_1.inspect)(cli, argv);
    });
});

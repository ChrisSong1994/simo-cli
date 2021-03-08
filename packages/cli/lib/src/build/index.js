"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var simo_core_1 = require("@chrissong/simo-core");
exports.default = (function (cli) {
    cli.register('build', '打包项目文件', function (yargs) {
        yargs
            .option('report', {
            alias: 'r',
            type: 'boolean',
            default: false,
            describe: '生成打包报告文件，可指定文件名',
        })
            .option('sourcemap', {
            alias: 's',
            type: 'boolean',
            default: false,
            describe: '是否生成source map',
        });
    }, function (argv) {
        simo_core_1.build(cli, argv);
    });
});
//# sourceMappingURL=index.js.map
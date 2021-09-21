"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    cmd: 'serve',
    desc: '启动项目开发服务',
    builder: function (yargs) {
        yargs
            .option('open', {
            alias: 'o',
            type: 'boolean',
            default: false,
            describe: '是否自动打开浏览器',
        });
    },
};

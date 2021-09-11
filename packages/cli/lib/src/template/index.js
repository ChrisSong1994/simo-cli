"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * simo template ls  查看模版列表
 * simo template add  --name  --repository  --description 注册模版仓库
 * simo template delete  --name  删除仓库
 *
 */
var create_simo_app_1 = require("@chrissong/create-simo-app");
var simo_utils_1 = require("@chrissong/simo-utils");
exports.default = (function (cli) {
    cli.register('template <action>', '模版仓库', function (yargs) {
        yargs
            .option('name', {
            alias: 'n',
            type: 'string',
            default: '',
            describe: '模版名称',
        })
            .option('repository', {
            alias: 'r',
            type: 'string',
            default: '',
            describe: '模版仓库地址',
        })
            .option('description', {
            alias: 'd',
            type: 'string',
            default: '',
            describe: '模版介绍',
        });
    }, function (argv) {
        if (!['ls', 'add', 'remove'].includes(argv.action)) {
            simo_utils_1.logger.error('The command parameter <action> must be oneof ls、add、remove !');
        }
        else {
            create_simo_app_1.template.default(cli, argv);
        }
    });
});
//# sourceMappingURL=index.js.map
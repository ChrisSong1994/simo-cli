<<<<<<< HEAD
'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const simo_core_1 = require('@chrissong/simo-core');
exports.default = (cli) => {
  cli.register(
    'init <name>',
    '初始化项目',
    (yargs) => {
      yargs.option('name', {
        type: 'string',
        describe: '项目名称',
      });
    },
    (argv) => {
      simo_core_1.init(cli, argv);
    },
  );
=======
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const simo_core_1 = require("@chrissong/simo-core");
exports.default = (cli) => {
    cli.register('init <name>', '初始化项目', (yargs) => {
        yargs.option('name', {
            type: 'string',
            describe: '项目名称',
        });
    }, (argv) => {
        simo_core_1.init(cli, argv);
    });
>>>>>>> bb47201f42e3a2c211b98b37780175c73d9a1d35
};
//# sourceMappingURL=index.js.map

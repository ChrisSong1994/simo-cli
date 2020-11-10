<<<<<<< HEAD
'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const simo_core_1 = require('@chrissong/simo-core');
exports.default = (cli) => {
  cli.register(
    'build',
    '打包项目文件',
    (yargs) => {
      yargs
        .option('report', {
          alias: 'r',
          describe: '生成打包报告文件，可指定文件名',
        })
        .option('sourcemap', {
          alias: 's',
          type: 'boolean',
          default: false,
          describe: '是否生成source map',
        });
    },
    (argv) => {
      console.log(cli, argv);
      simo_core_1.build(cli, argv);
    },
  );
};
//# sourceMappingURL=index.js.map
=======
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const simo_core_1 = require("@chrissong/simo-core");
exports.default = (cli) => {
    cli.register('build', '打包项目文件', (yargs) => {
        yargs
            .option('report', {
            alias: 'r',
            describe: '生成打包报告文件，可指定文件名',
        })
            .option('sourcemap', {
            alias: 's',
            type: 'boolean',
            default: false,
            describe: '是否生成source map',
        });
    }, (argv) => {
        console.log(cli, argv);
        simo_core_1.build(cli, argv);
    });
};
//# sourceMappingURL=index.js.map
>>>>>>> bb47201f42e3a2c211b98b37780175c73d9a1d35

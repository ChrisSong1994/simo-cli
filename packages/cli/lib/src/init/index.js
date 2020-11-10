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
};
//# sourceMappingURL=index.js.map

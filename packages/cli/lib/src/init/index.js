"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (cli) => {
    cli.register('init <project-name>', '初始化项目', (yargs) => {
        yargs.positional('name', {
            type: 'string',
            describe: '项目名称'
        });
    }, (argv) => {
        // init(cli,argv)
        console.log(cli, argv);
    });
};
//# sourceMappingURL=index.js.map
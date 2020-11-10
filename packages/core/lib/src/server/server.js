'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const yargs_1 = __importDefault(require('yargs'));
const command_1 = __importDefault(require('./command'));
const simo_utils_1 = require('@chrissong/simo-utils');
const getSimoConfig_1 = __importDefault(require('../utils/getSimoConfig'));
const { cmd, desc, builder } = command_1.default;
yargs_1.default
  .command(cmd, desc, builder, (argv) => {
    const cwd = process.cwd();
    //   加载环境变量
    simo_utils_1.loadEnv(cwd);
    const env = Object.assign(process.env, {
      CMD: 'server',
      NODE_ENV: 'development',
      BABEL_ENV: 'development',
    });
    server({
      env,
      argv,
      cwd,
      simoConfig: getSimoConfig_1.default(cwd),
    });
  })
  .parse(process.argv.slice(2));
// 服务启动
const server = ({ env, argv, cwd, simoConfig }) => {};
//# sourceMappingURL=server.js.map

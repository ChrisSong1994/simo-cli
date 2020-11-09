import yargs from 'yargs';
import Cli from './cli';
import { logger } from '/Users/songjun/WorkSpace/学习/git/modules/simo-cli/packages/utils/lib';

yargs
  .strict(true)
  .scriptName('simo')
  .usage('$0 <命令> [选项]')
  .alias('help', 'h')
  .alias('version', 'v')
  .wrap(null)
  .fail((msg, err, yargs) => {
    if (err) throw err;
    logger.error(msg);
    yargs.help();
    process.exit(1);
  });

debugger;
//   初始化命令行工具
const cli = new Cli(process.cwd());

import yargs from 'yargs';
import Cli from './cli';
import { logger } from '@chrissong/simo-utils';

yargs
  .strict(true)
  .scriptName('simo')
  .usage('$0 <命令> [选项]')
  .alias('help', 'h')
  .alias('version', 'v')
  .wrap(null)
  .fail((msg, err, yargs) => {
    yargs.showHelp();
    console.log(err)
    logger.error(msg);
    if (err) process.exit(1);
  });

//   初始化命令行工具
const cli = new Cli(process.cwd());

cli.parse(process.argv.slice(2));

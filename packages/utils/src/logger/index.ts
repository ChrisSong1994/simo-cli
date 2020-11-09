import chalk from 'chalk';

const format = (label: string, msg: string): string => {
  return msg
    .split('\n')
    .map((line, i) => (i === 0 ? `${label} ${line}` : line.padStart(chalk.reset(label).length)))
    .join('\n');
};

const log = (msg = '') => console.log(msg);
const done = (msg = '') => console.log(format(chalk.bgGreen.black(' DONE '), msg));
const warn = (msg = '') => console.warn(format(chalk.bgYellow.black(' WARN '), chalk.yellow(msg)));
const error = (msg = '') => console.error(format(chalk.bgRed(' ERROR '), chalk.red(msg)));

export default {
  log,
  done,
  error,
  warn,
};

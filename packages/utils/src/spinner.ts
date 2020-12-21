import ora from 'ora';
import chalk from 'chalk';

type Message = {
  [key: string]: string;
};

const spinner = ora();
let lastMsg: null | Message = null;

export const start = (symbol: string, msg: string) => {
  if (!msg) {
    msg = symbol;
    symbol = chalk.green('🍺');
  }
  if (lastMsg) {
    spinner.stopAndPersist({
      symbol: lastMsg.symbol,
      text: lastMsg.text,
    });
  }
  spinner.text = ' ' + msg;
  lastMsg = {
    symbol: symbol + ' ',
    text: msg,
  };
  spinner.start();
};

export const stop = (persist: boolean) => {
  if (lastMsg && persist !== false) {
    spinner.stopAndPersist({
      symbol: lastMsg.symbol,
      text: lastMsg.text,
    });
  } else {
    spinner.stop();
  }
  lastMsg = null;
};

export const resume = () => {
  spinner.start();
};

export const pause = () => {
  spinner.stop();
};

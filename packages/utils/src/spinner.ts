import ora from 'ora';

const spinner = ora();

export const start = (msg: string) => {
  spinner.text = msg;
  spinner.start();
};

export const stop = () => {
  spinner.stop();
};

export const resume = () => {
  spinner.start();
};

export const pause = () => {
  spinner.stop();
};

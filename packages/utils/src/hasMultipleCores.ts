import os from 'os';

export default () => {
  try {
    return os.cpus().length > 1;
  } catch (e) {
    return false;
  }
};

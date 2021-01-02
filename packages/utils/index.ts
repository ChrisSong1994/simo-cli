import fs from 'fs-extra';
import open from 'open';
import deepmerge from 'deepmerge';

import logger from './src/logger';
import updateNotifier from './src/updateNotifier';
import loadEnv from './src/loadEnv';
import * as spinner from './src/spinner';
import parallelToSerial from './src/parallelToSerial';

export {
  fs,
  open,
  deepmerge,
  
  logger,
  updateNotifier,
  loadEnv,
  spinner,
  parallelToSerial,
};

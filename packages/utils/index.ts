import fs from 'fs-extra';
import open from 'open';
import deepmerge from 'deepmerge';
import chalk from 'chalk';
import execa from 'execa';

import logger from './src/logger';
import updateNotifier from './src/updateNotifier';
import loadEnv from './src/loadEnv';
import * as spinner from './src/spinner';
import parallelToSerial from './src/parallelToSerial';
import mergeConfig from './src/mergeConfig';

export {
  fs,
  open,
  deepmerge,
  chalk,
  execa,
  logger,
  updateNotifier,
  loadEnv,
  spinner,
  parallelToSerial,
  mergeConfig,
};

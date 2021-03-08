import fs from 'fs-extra';
import open from 'open';
import deepmerge from 'deepmerge';
import chalk from 'chalk';
import execa from 'execa';
import rimraf from 'rimraf';
import cliui from 'cliui';
import inquirer from 'inquirer';
import address from 'address';
import clipboardy from 'clipboardy';
import which from 'which';
import findProcess from 'find-process';

import logger from './src/logger';
import updateNotifier from './src/updateNotifier';
import loadEnv from './src/loadEnv';
import * as spinner from './src/spinner';
import parallelToSerial from './src/parallelToSerial';
import mergeConfig from './src/mergeConfig';
import hasYarn from './src/hasYarn';
import hasMultipleCores from './src/hasMultipleCores';

export {
  fs,
  open,
  deepmerge,
  chalk,
  execa,
  rimraf,
  cliui,
  inquirer,
  address,
  clipboardy,
  which,
  findProcess,
  logger,
  updateNotifier,
  loadEnv,
  spinner,
  parallelToSerial,
  mergeConfig,
  hasYarn,
  hasMultipleCores,
};

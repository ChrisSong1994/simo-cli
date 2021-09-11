const path = require('path');
const fs = require('fs');
const rimraf = require('rimraf');
const { copyFiles } = require('@chrissong/simo-utils');

const staticPath = path.resolve(__dirname, '../src/statics');
const targetPath = path.resolve(__dirname, '../lib/src/statics');

if (!fs.existsSync(staticPath)) return console.error(`ERROR:Directory ${staticPath} is not exist!`);

if (fs.existsSync(targetPath)) {
  rimraf.sync(targetPath);
}

copyFiles(staticPath, targetPath);

import { logger, chalk, execa } from '@chrissong/simo-utils';
import readline from 'readline';

import { IPkgManagerParams } from '../type';

const PACKAGE_MANAGER_CONFIG = {
  npm: ['install', '--loglevel', 'error'],
  xnpm: ['install', '--loglevel', 'error'],
  yarn: ['install'],
};

/**
 * 安装依赖
 * @param{string} pkgManager yarn|npm
 * @param{string} targetDir  项目路径
 */
export default async (
  targetDir: string,
  pkgManager: IPkgManagerParams['pkgManager'],
): Promise<void> => {
  // @ts-ignore
  const args = PACKAGE_MANAGER_CONFIG[pkgManager];
  const cmd = `${pkgManager} ${args.join(' ')}`;
  logger.log(`🚀  安装项目依赖 ${chalk.cyan(cmd)}，请稍等...`);

  return new Promise((resolve, reject) => {
    const child = execa(pkgManager, args, {
      cwd: targetDir,
      stdio: ['inherit', 'inherit', 'pipe'],
    });

    if (pkgManager === 'yarn') {
      child.stderr &&
        child.stderr.on('data', (buf: any) => {
          const str = buf.toString();

          if (/warning/.test(str)) return;

          const progressBarMatch = str.match(/\[.*\] (\d+)\/(\d+)/);
          if (progressBarMatch) {
            // since yarn is in a child process, it's unable to get the width of
            // the terminal. reimplement the progress bar ourselves!
            renderProgressBar(progressBarMatch[1], progressBarMatch[2]);
            return;
          }

          process.stderr.write(buf);
        });
    }

    child.on('close', (code: number) => {
      if (code !== 0) {
        reject(`pkgManager failed: ${pkgManager} ${args.join(' ')}`);
        return;
      }
      resolve();
    });
  });
};

// https://github.com/vuejs/vue-cli/blob/dev/packages/%40vue/cli/lib/util/executeCommand.js
// from vue-cli
function renderProgressBar(curr: number, total: number) {
  const ratio = Math.min(Math.max(curr / total, 0), 1);
  const bar = ` ${curr}/${total}`;
  const availableSpace = Math.max(0, process.stderr.columns - bar.length - 3);
  const width = Math.min(total, availableSpace);
  const completeLength = Math.round(width * ratio);
  const complete = '#'.repeat(completeLength);
  const incomplete = '-'.repeat(width - completeLength);
  toStartOfLine(process.stderr);
  process.stderr.write(`[${complete}${incomplete}]${bar}`);
}

function toStartOfLine(stream: NodeJS.WriteStream) {
  if (!chalk.supportsColor) {
    stream.write('\r');
    return;
  }
  readline.cursorTo(stream, 0);
}

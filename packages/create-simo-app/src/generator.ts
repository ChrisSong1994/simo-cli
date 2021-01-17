import path from 'path';
import glob from 'glob';
import Mustache from 'mustache';
import { fs, chalk } from '@chrissong/simo-utils';

export const copyTpl = (
  cwd: string,
  opts: { templatePath: string; target: string; context: object },
) => {
  const tpl = fs.readFileSync(opts.templatePath, 'utf-8');
  const content = Mustache.render(tpl, opts.context);
  console.log(`${chalk.green('Write:')} ${path.relative(cwd, opts.target)}`);
  fs.writeFileSync(opts.target, content, 'utf-8');
};

export const copyDirectory = (opts: { path: string; context: object; target: string }) => {
  const files = glob.sync('**/*', {
    cwd: opts.path,
    dot: true,
    ignore: ['**/node_modules/**'],
  });

  files.forEach((file) => {
    const absFile = path.join(opts.path, file);
    const absTarget = path.join(opts.target, file);
    if (fs.statSync(absFile).isDirectory()) {
      if (!fs.existsSync(absTarget)) {
        return fs.mkdirSync(absTarget);
      }
      return;
    } else {
      if (file.endsWith('.tpl')) {
        copyTpl(opts.target, {
          templatePath: absFile,
          target: path.join(opts.target, file.replace(/\.tpl$/, '')),
          context: opts.context,
        });
      } else {
        console.log(`${chalk.green('Copy: ')} ${file}`);
        fs.copyFileSync(absFile, absTarget);
      }
    }
  });
};

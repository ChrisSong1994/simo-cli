import path from 'path';
import os from 'os';
import glob from 'glob';
import Mustache from 'mustache';
import gitclone from 'git-clone';
import { fs, chalk, spinner, logger, errorCapture } from '@chrissong/simo-utils';

export const copyTpl = (
  cwd: string,
  params: { templatePath: string; target: string; context: object },
) => {
  const tpl = fs.readFileSync(params.templatePath, 'utf-8');
  const content = Mustache.render(tpl, params.context);
  console.log(`${chalk.green('Write:')} ${path.relative(cwd, params.target)}`);
  fs.writeFileSync(params.target, content, 'utf-8');
};

export const copyDirectory = (params: { path: string; context: object; target: string }) => {
  const files = glob.sync('**/*', {
    cwd: params.path,
    dot: true,
    ignore: ['**/node_modules/**'],
  });

  files.forEach((file) => {
    const absFile = path.join(params.path, file);
    const absTarget = path.join(params.target, file);
    if (fs.statSync(absFile).isDirectory()) {
      if (!fs.existsSync(absTarget)) {
        return fs.mkdirSync(absTarget);
      }
      return;
    } else {
      if (file.endsWith('.tpl')) {
        copyTpl(params.target, {
          templatePath: absFile,
          target: path.join(params.target, file.replace(/\.tpl$/, '')),
          context: params.context,
        });
      } else {
        console.log(`${chalk.green('Copy: ')} ${file}`);
        fs.copyFileSync(absFile, absTarget);
      }
    }
  });
};

// 拉取git代码
export const pullProject = async (params: {
  repository: string;
  context: object;
  target: string;
}) => {
  const { repository, context, target } = params;
  // 创建临时目录
  const tmpdir = path.join(os.tmpdir(), 'simo');
  await fs.remove(tmpdir);

  spinner.start(`⌛ 克隆项目`);
  const [err, res] = await errorCapture(
    new Promise((resolve, reject) => {
      gitclone(repository, tmpdir, (err: any) => {
        spinner.stop();
        if (!err) {
          logger.done(`克隆模板 ${chalk.yellow(`${repository})`)} 成功`);
          return resolve(tmpdir);
        } else {
          logger.error(`克隆模板 ${chalk.yellow(`${repository})`)} 失败`);
          return reject(err);
        }
      });
    }),
  );
  if (err) process.exit(1);

  //  复制代码
  spinner.start(`⌛ 克隆代码`);
  const pkgPath = path.resolve(tmpdir, './package.json');
  let pkgJson = await fs.readJson(pkgPath);
  pkgJson = { ...pkgJson, ...context };
  await fs.writeJson(pkgPath, pkgJson, { spaces: 2 });

  await Promise.all(
    fs.readdirSync(tmpdir).map((file) => {
      return fs.move(path.join(tmpdir, file), path.join(target, file), {
        overwrite: true,
      });
    }),
  );
  spinner.stop();
};

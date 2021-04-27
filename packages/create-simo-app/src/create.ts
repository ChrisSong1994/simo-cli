import path from 'path';
import { fs, chalk, logger, inquirer, hasYarn } from '@chrissong/simo-utils';
import ValidateNpmPackageName from 'validate-npm-package-name';

import createSimoApp from './createSimoApp';
import getTplParams from './getTplParams';
import getPkgParams from './getPkgParams';
import getPkgManager from './getPkgManager';

/**
 * 项目初始化
 * @param{object} cli   cli实例对象
 * @param{object} argv  命令行参数
 */
const create = async (cli: any, argv: any): Promise<void> => {
  const targetDir = path.resolve(cli.cwd, argv.name);

  // 项目名称校验
  const result = ValidateNpmPackageName(argv.name);

  if (!result.validForNewPackages) {
    console.error(chalk.red(`Invalid project name: "${argv.name}"`));
    result.errors &&
      result.errors.forEach((err) => {
        console.error(chalk.red.dim('Error: ' + err));
      });

    result.warnings &&
      result.warnings.forEach((warn) => {
        console.error(chalk.yellowBright.dim('Warning: ' + warn));
      });
    cli.exit(1);
  }

  // 项目名称重复校验
  if (fs.existsSync(targetDir)) {
    const { isOverWrite } = await inquirer.prompt([
      {
        name: 'isOverWrite',
        message: `当前文件夹已存在${chalk.cyan(argv.name)},是否覆盖?`,
        type: 'confirm',
        default: true,
      },
    ]);

    if (isOverWrite) {
      logger.log(`\n删除目录 ${chalk.cyan(targetDir)}...`);
      await fs.remove(targetDir);
    }
  }
  // 创建项目目录
  await fs.mkdir(targetDir);

  // 选择模版
  const templateParams = await getTplParams();

  //  输入package.json 基本信息
  const pkgParams = await getPkgParams();

  // 选择包管理器
  let pkgManagerParams = { pkgManager: 'npm' };

  if (hasYarn()) {
    pkgManagerParams = await getPkgManager();
  }

  await createSimoApp(targetDir, templateParams, pkgParams, pkgManagerParams);

  logger.log(`🎉  Successfully created project ${chalk.yellow(argv.name)}.`);

  logger.log(
    `👉  Get started with the following commands:\n\n` +
      chalk.cyan(` ${chalk.gray('$')} cd ${argv.name}\n`) +
      chalk.cyan(
        ` ${chalk.gray('$')} ${
          pkgManagerParams.pkgManager === 'yarn' ? 'yarn serve' : 'npm run serve'
        }`,
      ),
  );
};

export default create;

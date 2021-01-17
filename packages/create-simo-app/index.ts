import path from 'path';
import inquirer from 'inquirer';
import { fs, chalk, logger } from '@chrissong/simo-utils';

import createSimoApp from './src/createSimoApp';
import getTplParams from './src/getTplParams';
import getPkgParams from './src/getPkgParams';

/**
 * 项目初始化
 * @param{object} cli   cli实例对象
 * @param{object} argv  命令行参数
 */
const create = async (cli: any, argv: any): Promise<void> => {
  const targetDir = path.resolve(cli.cwd, argv.name);

  debugger;
  // 项目名称校验

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

  await createSimoApp(targetDir, templateParams, pkgParams);
};

export default create;

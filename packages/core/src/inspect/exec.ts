import path from 'path';
import { fs, chalk, logger, inquirer, spinner } from '@chrissong/simo-utils';
import { OptionType, IObj } from '../../type';
import Api from '../api';

export default async (options: OptionType) => {
  spinner.start('📄  配置打印中...');

  const api = new Api('production', options);

  const config: IObj = await api.resolveWebpackConfig();

  const result = JSON.stringify(config, undefined, 2);

  if (options.argv.filename) {
    const targetFile = api.resolve(`${options.argv.filename}.json`);
    if (fs.existsSync(targetFile)) {
      spinner.pause();
      const { isOverWrite } = await inquirer.prompt([
        {
          name: 'isOverWrite',
          message: `当前文件夹已存在${chalk.cyan(`${options.argv.filename}.json`)},是否覆盖?`,
          type: 'confirm',
          default: true,
        },
      ]);
      spinner.resume();
      if (isOverWrite) {
        await fs.remove(targetFile);
        await fs.writeFile(targetFile, result);
      }
      return spinner.stop();
    } else {
      await fs.writeFile(targetFile, result);
      return spinner.stop();
    }
  } else {
    logger.log(result);
    return spinner.stop();
  }
};

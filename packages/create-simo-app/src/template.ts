import { chalk, fs, logger, getUserHome } from '@chrissong/simo-utils';
import _ from 'lodash';
import Table from 'cli-table3';

import getTempStorePath from './getTempStorePath';

const HOME_PATH = getUserHome();
export interface ITemplate {
  name: string;
  repository: string;
  description: string;
  isBuiltIn: string;
}

/**
 * 项目初始化
 * @param{object} cli   cli实例对象
 * @param{object} argv  命令行参数
 */
const template = async (cli: any, argv: any): Promise<void> => {
  const templateStorePath = getTempStorePath();

  const { action, name, repository, description } = argv;
  const templatesData = JSON.parse(fs.readFileSync(templateStorePath, { encoding: 'utf8' }));

  const displayTemplates = () => {
    if (_.isEmpty(templatesData)) {
      logger.warn(`Currently,you have not add any tempaltes!`);
    } else {
      const table = new Table({
        head: ['name', 'repository', 'description', 'isBuiltIn'],
        style: {
          'padding-left': 1,
          'padding-right': 1,
          head: [],
          border: [],
        },
      });

      templatesData.forEach((data: ITemplate) => {
        table.push([
          chalk.yellow(data['name']),
          chalk.green(data['repository']),
          data['description'],
          data['isBuiltIn']
            ? chalk.greenBright(data['isBuiltIn'])
            : chalk.yellowBright(data['isBuiltIn']),
        ]);
      });

      console.log(chalk.greenBright('模版列表:'));
      console.log(table.toString());
    }
  };

  const addTemplate = () => {
    if (_.find(templatesData, { name })) {
      return logger.error(`The template named ${chalk.red(name)} is exist!`);
    } else {
      templatesData.push({
        name,
        repository,
        description,
        isBuiltIn: false,
      });

      fs.writeFileSync(templateStorePath, JSON.stringify(templatesData, null, 2), {
        encoding: 'utf8',
      });
      logger.done(`The template named ${chalk.green(name)} has been added!`);
    }
  };

  const removeTemplate = () => {
    // 只有新增的模版可以删除，内置模版不可以删除
    if (!_.find(templatesData, { name })) {
      return logger.error(`The template named ${chalk.red(name)} is not exist!`);
    }
    if (_.find(templatesData, { name }).isBuiltIn) {
      return logger.warn(
        `The template named ${chalk.yellow(name)} is built template,can\`t be remove!`,
      );
    } else {
      const newTemplatesData = templatesData.filter((v: ITemplate) => v.name !== name);
      fs.writeFileSync(templateStorePath, JSON.stringify(newTemplatesData, null, 2), {
        encoding: 'utf8',
      });
      logger.done(`The template named ${chalk.yellow(name)} has been removed!`);
    }
  };

  // 显示模版
  switch (action) {
    case 'ls':
      return displayTemplates();
    case 'add':
      return addTemplate();
    case 'remove':
      return removeTemplate();
  }
};

export default template;

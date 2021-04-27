import path from 'path';
import { chalk, fs, logger } from '@chrissong/simo-utils';
import _ from 'lodash';

// 模版仓库
const templateStorePath = path.join(__dirname, '../../templateStore.json');
/**
 * 项目初始化
 * @param{object} cli   cli实例对象
 * @param{object} argv  命令行参数
 */
const template = async (cli: any, argv: any): Promise<void> => {
  const { action, name, repository, description } = argv;
  const templatesData = JSON.parse(fs.readFileSync(templateStorePath, { encoding: 'utf8' }));

  const displayTemplates = () => {
    if (_.isEmpty(templatesData)) {
      logger.warn(`Currently,you have not add any tempaltes!`);
    } else {
      console.table(templatesData);
    }
  };

  const addTemplate = () => {
    if (_.has(templatesData, name)) {
      return logger.error(`The template named ${chalk.red(name)} is exist!`);
    } else {
      templatesData[name] = {
        name,
        repository,
        description,
        isBuiltIn: false,
      };
      fs.writeFileSync(templateStorePath, JSON.stringify(templatesData, null, 2), {
        encoding: 'utf8',
      });
      logger.done(`The template named ${chalk.green(name)} has been added!`);
    }
  };

  const removeTemplate = () => {
    // 只有新增的模版可以删除，内置模版不可以删除
    if (!_.has(templatesData, name)) {
      return logger.error(`The template named ${chalk.red(name)} is not exist!`);
    }
    if (templatesData[name].isBuiltIn) {
      return logger.warn(
        `The template named ${chalk.yellow(name)} is built template,can\`t be remove!`,
      );
    } else {
      delete templatesData[name];
      fs.writeFileSync(templateStorePath, JSON.stringify(templatesData, null, 2), {
        encoding: 'utf8',
      });
      logger.done(`The template named ${chalk.green(name)} has been removed!`);
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

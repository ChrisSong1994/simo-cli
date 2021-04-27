import path from 'path';
import { fs, inquirer } from '@chrissong/simo-utils';
import _ from 'lodash';

import { ITplParams } from '../type';

// 模版仓库
const templateStorePath = path.join(__dirname, '../../templateStore.json');

// 获取输入参数
const getTemplateParams = async (): Promise<ITplParams> => {
  const templatesData = JSON.parse(fs.readFileSync(templateStorePath, { encoding: 'utf8' }));

  // 读取模版名称
  const templatesTypes = Object.keys(templatesData).map((key) => ({
    key: key,
    name: key,
    value: key,
  }));

  const template = await inquirer.prompt([
    {
      name: 'templateType',
      message: '请选择模版?',
      type: 'list',
      choices: templatesTypes,
    },
  ]);
  return templatesData[template.templateType];
};

export default getTemplateParams;

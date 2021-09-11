import { fs, inquirer } from '@chrissong/simo-utils';
import _ from 'lodash';
import getTempStorePath from './getTempStorePath';

import { ITplParams } from '../type';

// 获取输入参数
const getTemplateParams = async (): Promise<ITplParams> => {
  const templateStorePath = getTempStorePath();
  const templatesData = JSON.parse(fs.readFileSync(templateStorePath, { encoding: 'utf8' }));
 
  // 读取模版名称
  const templatesTypes = templatesData.map((item: ITplParams) => ({
    key: item.name,
    name: item.name,
    value: item.name,
  }));

  const template = await inquirer.prompt([
    {
      name: 'templateType',
      message: '请选择模版?',
      type: 'list',
      choices: templatesTypes,
    },
  ]);
  return _.find(templatesData, { name: template.templateType });
};

export default getTemplateParams;

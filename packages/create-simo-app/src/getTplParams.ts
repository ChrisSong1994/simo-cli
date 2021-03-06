import path from 'path';
import {inquirer} from '@chrissong/simo-utils';
import { fs } from '@chrissong/simo-utils';

import { ITplParams } from '../type';

// 读取模版名称
export const templateTypes = fs
  .readdirSync(path.resolve(__dirname, '../../templates'))
  .map((type: string) => ({
    key: type,
    name: type,
    value: type,
  }));

// 获取输入参数
const getTemplateParams = async (): Promise<ITplParams> => {
  return await inquirer.prompt([
    {
      name: 'templateType',
      message: '请选择模版?',
      type: 'list',
      choices: templateTypes,
    },
  ]);
};

export default getTemplateParams;

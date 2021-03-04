import inquirer from 'inquirer';

import { IPkgManagerParams } from '../type';


// 获取输入参数
const getPkgManager = async (): Promise<IPkgManagerParams> => {
  return await inquirer.prompt([
    {
      name: 'pkgManager',
      message: '请选择包管理器?',
      type: 'list',
      default: 'yarn',
      choices: [
        {
          key: 'yarn',
          name: 'yarn',
          value: 'yarn',
        },
        {
          key: 'npm',
          name: 'npm',
          value: 'npm',
        },
      ],
    },
  ]);
};

export default getPkgManager;

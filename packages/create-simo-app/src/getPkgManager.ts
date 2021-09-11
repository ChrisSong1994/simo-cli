import { inquirer, which } from '@chrissong/simo-utils';

import { IPkgManagerParams } from '../type';

// 获取输入参数
const getPkgManager = async (): Promise<IPkgManagerParams> => {
  const hasXnmp = which.sync('xnpm', { nothrow: true });
  const hasYarn = which.sync('yarn', { nothrow: true });

  return await inquirer.prompt([
    {
      name: 'pkgManager',
      message: '请选择包管理器?',
      type: 'list',
      default: 'npm',
      choices: [
        {
          key: 'npm',
          name: 'npm',
          value: 'npm',
        },
        hasXnmp
          ? {
              key: 'xnpm',
              name: 'xnpm',
              value: 'xnpm',
            }
          : null,
        hasYarn
          ? {
              key: 'yarn',
              name: 'yarn',
              value: 'yarn',
            }
          : null,
      ].filter(Boolean),
    },
  ]);
};

export default getPkgManager;

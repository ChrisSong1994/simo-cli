import path from 'path';

import { copyDirectory } from './generator';
import install from './install';
import { IPkgParams, ITplParams } from '../type';

const createSimoApp = async (targetDir: string, tplParams: ITplParams, pkgParams: IPkgParams) => {
  const { templateType } = tplParams;

  debugger;
  // 创建项目
  copyDirectory({
    path: path.resolve(__dirname, `../../templates/${templateType}`),
    context: { pkgParams },
    target: targetDir,
  });

  // 自动安装项目依赖
  await install(targetDir);
};

export default createSimoApp;

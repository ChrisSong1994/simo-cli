import path from 'path';

import { copyDirectory, pullProject } from './generator';
import install from './install';
import { IPkgParams, ITplParams, IPkgManagerParams } from '../type';

const createSimoApp = async (
  targetDir: string,
  tplParams: ITplParams,
  pkgParams: IPkgParams,
  pkgManagerParams: IPkgManagerParams,
) => {
  const { repository, isBuiltIn } = tplParams;
  const { pkgManager } = pkgManagerParams;

  if (isBuiltIn) {
    // 拷贝项目
    copyDirectory({
      path: path.resolve(__dirname, `../../${repository}`),
      context: { pkgParams },
      target: targetDir,
    });
  } else {
    // 拉取代码
    await pullProject({
      repository: repository,
      context: { pkgParams },
      target: targetDir,
    });
  }

  // 自动安装项目依赖
  await install(targetDir, pkgManager);
};

export default createSimoApp;

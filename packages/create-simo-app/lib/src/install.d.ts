import { IPkgManagerParams } from '../type';
declare const _default: (targetDir: string, pkgManager: IPkgManagerParams['pkgManager']) => Promise<void>;
/**
 * 安装依赖
 * @param{string} pkgManager yarn|npm
 * @param{string} targetDir  项目路径
 */
export default _default;

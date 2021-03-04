import { IPkgParams, ITplParams, IPkgManagerParams } from '../type';
declare const createSimoApp: (targetDir: string, tplParams: ITplParams, pkgParams: IPkgParams, pkgManagerParams: IPkgManagerParams) => Promise<void>;
export default createSimoApp;

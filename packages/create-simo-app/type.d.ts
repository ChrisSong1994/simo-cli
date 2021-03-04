import { type } from "os";

export interface ITplParams {
  isBuiltTemplate: boolean;
  gitAddress?: string;
  templateType?: string;
}

export interface IPkgParams {
  name: string;
  version: string;
  auther: string;
  description: string;
}

export interface IPkgManagerParams {
  pkgManager: 'yarn' | 'npm';
}

import { type } from 'os';

export interface ITplParams {
  name: string;
  repository: string;
  description: string;
  isBuiltIn: boolean;
}

export interface IPkgParams {
  name: string;
  version: string;
  auther: string;
  description: string;
}

export interface IPkgManagerParams {
  pkgManager: string
}

export interface SimoConfig {}

export type ObjType = { [key: string]: any } | null;

export type OptionType = {
  env: ObjType;
  argv: ObjType;
  cwd: string;
  simoConfig: ObjType;
};

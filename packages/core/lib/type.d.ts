export interface SimoConfig {
}
export declare type ObjType = {
    [key: string]: any;
} | null;
export declare type OptionType = {
    env: ObjType;
    argv: ObjType;
    cwd: string;
    simoConfig: ObjType;
};

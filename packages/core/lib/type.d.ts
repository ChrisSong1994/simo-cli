import WebpackChain from 'webpack-chain';
export interface SimoConfigIntf {
    baseURL: string;
    chainWebpack: (v: WebpackChain) => void;
    [key: string]: any;
}
export declare type ObjType = {
    [key: string]: any;
} | null;
export declare type OptionType = {
    env: ObjType;
    argv: ObjType;
    cwd: string;
    simoConfig: SimoConfigIntf;
};
export declare type StyleLoaderOption = {
    isProd: Boolean;
    sourceMap: Boolean;
    filename: string;
    chunkFilename: string;
    publicPath: string;
};

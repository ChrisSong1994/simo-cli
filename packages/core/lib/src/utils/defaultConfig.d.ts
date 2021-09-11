declare const _default: {
    target: string;
    output: {
        path: string;
    };
    publicPath: string;
    port: number;
    host: string;
    proxy: {};
    devtool: string;
    externals: {};
    pages: {
        index: {
            entry: string;
            template: string;
            htmlWebpackPluginOptions: {
                __param: string;
            };
        };
    };
    parallel: boolean;
    browsersList: string[];
    extraBabelOptions: {
        presets: never[];
        plugins: never[];
    };
    define: {};
    tsTypeCheck: boolean;
    fastRefresh: boolean;
    chainWebpack: () => void;
};
export default _default;

declare const _default: {
    target: string[];
    output: {
        path: string;
    };
    outputEnvironment: {
        arrowFunction: boolean;
        bigIntLiteral: boolean;
        const: boolean;
        destructuring: boolean;
        dynamicImport: boolean;
        forOf: boolean;
        module: boolean;
    };
    cssExtract: boolean;
    buildNotifier: boolean;
    publicPath: string;
    port: number;
    host: string;
    inlineLimit: number;
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
    watchFiles: string[];
    chainWebpack: () => void;
};
export default _default;
